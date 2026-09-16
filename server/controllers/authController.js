import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import LearnerProfile from '../models/LearnerProfile.js';
import { AuditLog } from '../models/SystemModels.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

export const register = asyncHandler(async (req, res) => {
  const {
    name, email, password, mobile, organization, department,
    designation, experienceYears, role,
  } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
  }

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    mobile,
    organization,
    department,
    designation,
    experienceYears: experienceYears || 0,
    role: 'LEARNER', // Role assignment always from backend
  });

  // Create initial learner profile
  await LearnerProfile.create({ user: user._id });

  // Audit log
  await AuditLog.create({
    user: user._id,
    action: 'USER_REGISTER',
    resource: 'User',
    resourceId: user._id.toString(),
    details: { email, role: 'LEARNER' },
    ipAddress: req.ip,
    status: 'SUCCESS',
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: 'Account created successfully. Welcome to KarmaSiksha!',
    token,
    user: user.toSafeObject(),
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  if (user.status !== 'ACTIVE') {
    return res.status(403).json({ success: false, message: 'Your account has been deactivated. Please contact an administrator.' });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  await AuditLog.create({
    user: user._id,
    action: 'USER_LOGIN',
    resource: 'User',
    resourceId: user._id.toString(),
    ipAddress: req.ip,
    status: 'SUCCESS',
  });

  const token = generateToken(user._id);

  // Get profile onboarding status
  const profile = await LearnerProfile.findOne({ user: user._id });

  res.status(200).json({
    success: true,
    message: 'Login successful.',
    token,
    user: { ...user.toSafeObject(), onboardingCompleted: user.onboardingCompleted },
    onboardingCompleted: user.onboardingCompleted,
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const profile = await LearnerProfile.findOne({ user: req.user._id })
    .populate('role')
    .populate('skills.skill');

  res.json({
    success: true,
    user: user.toSafeObject(),
    profile,
  });
});

export const updateOnboarding = asyncHandler(async (req, res) => {
  const { step, data } = req.body;

  const profile = await LearnerProfile.findOne({ user: req.user._id });
  if (!profile) {
    return res.status(404).json({ success: false, message: 'Profile not found.' });
  }

  // Update specific fields based on step
  if (step === 1) {
    await User.findByIdAndUpdate(req.user._id, {
      organization: data.organization,
      department: data.department,
      designation: data.designation,
      experienceYears: data.experienceYears,
    });
  } else if (step === 3) {
    profile.skills = data.skills || [];
  } else if (step === 4) {
    profile.interests = data.interests || [];
  } else if (step === 5) {
    profile.learningGoals = data.learningGoals || [];
  } else if (step === 7) {
    profile.preferredLearningDuration = data.preferredLearningDuration;
    profile.preferredLearningTime = data.preferredLearningTime;
    profile.languagePreference = data.languagePreference;
  }

  profile.onboardingStep = Math.max(profile.onboardingStep, step);
  await profile.save();

  res.json({ success: true, message: 'Onboarding step saved.', step, profile });
});

export const completeOnboarding = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { onboardingCompleted: true });
  const profile = await LearnerProfile.findOneAndUpdate(
    { user: req.user._id },
    { onboardingStep: 8 },
    { new: true }
  );

  res.json({ success: true, message: 'Onboarding completed successfully!', profile });
});
