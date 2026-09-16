import User from '../models/User.js';
import LearnerProfile from '../models/LearnerProfile.js';
import { SkillGap, Recommendation, LearningProgress } from '../models/LearningModels.js';
import { AssessmentAttempt } from '../models/Assessment.js';
import { QuizAttempt } from '../models/Quiz.js';
import { AuditLog } from '../models/SystemModels.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search, role, status, department } = req.query;

  const query = {};
  if (search) query.$or = [
    { name: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } },
  ];
  if (role) query.role = role;
  if (status) query.status = status;
  if (department) query.department = { $regex: department, $options: 'i' };

  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .select('-password -resetPasswordToken -resetPasswordExpires')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: users,
    pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) },
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

  const profile = await LearnerProfile.findOne({ user: user._id })
    .populate('role')
    .populate('skills.skill');
  const gapsCount = await SkillGap.countDocuments({ user: user._id, isResolved: false });
  const attemptsCount = await AssessmentAttempt.countDocuments({ user: user._id, status: 'COMPLETED' });
  const progressCount = await LearningProgress.countDocuments({ user: user._id });

  res.json({ success: true, data: { user, profile, stats: { gapsCount, attemptsCount, progressCount } } });
});

export const updateUser = asyncHandler(async (req, res) => {
  // Admin cannot change their own role via this endpoint; super_admin can change others
  const { name, mobile, organization, department, designation, experienceYears, status } = req.body;
  
  const updateData = { name, mobile, organization, department, designation, experienceYears };
  
  // Only SUPER_ADMIN can change status
  if (req.user.role === 'SUPER_ADMIN' && status) {
    updateData.status = status;
  }

  const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })
    .select('-password');
  
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

  await AuditLog.create({
    user: req.user._id,
    action: 'USER_UPDATE',
    resource: 'User',
    resourceId: user._id.toString(),
    details: { updatedFields: Object.keys(updateData) },
    status: 'SUCCESS',
  });

  res.json({ success: true, message: 'User updated.', data: user });
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['ACTIVE', 'INACTIVE', 'SUSPENDED'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status.' });
  }

  const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true }).select('-password');
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

  await AuditLog.create({
    user: req.user._id,
    action: 'USER_STATUS_CHANGE',
    resource: 'User',
    resourceId: user._id.toString(),
    details: { newStatus: status },
    status: 'SUCCESS',
  });

  res.json({ success: true, message: `User status updated to ${status}.`, data: user });
});

export const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await LearnerProfile.findOne({ user: req.user._id })
    .populate('role')
    .populate('skills.skill');
  
  const user = await User.findById(req.user._id).select('-password');
  const gaps = await SkillGap.find({ user: req.user._id, isResolved: false })
    .populate('skill')
    .sort({ priority: -1 })
    .limit(5);
  
  const recentAttempts = await AssessmentAttempt.find({ user: req.user._id, status: 'COMPLETED' })
    .sort({ submittedAt: -1 })
    .limit(3)
    .populate('assessment', 'title type');

  const progress = await LearningProgress.find({ user: req.user._id })
    .populate('course', 'title thumbnail difficulty')
    .sort({ lastAccessedAt: -1 })
    .limit(5);

  res.json({
    success: true,
    data: { user, profile, topGaps: gaps, recentAttempts, courseProgress: progress }
  });
});

export const updateMyProfile = asyncHandler(async (req, res) => {
  const { name, mobile, bio, interests, learningGoals, preferredLearningDuration, languagePreference } = req.body;

  await User.findByIdAndUpdate(req.user._id, { name, mobile });
  
  const profile = await LearnerProfile.findOneAndUpdate(
    { user: req.user._id },
    { bio, interests, learningGoals, preferredLearningDuration, languagePreference },
    { new: true }
  );

  res.json({ success: true, message: 'Profile updated successfully.', data: profile });
});

export const getDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [
    profile,
    topGaps,
    recommendations,
    courseProgress,
    recentAttempts,
    notifications,
  ] = await Promise.all([
    LearnerProfile.findOne({ user: userId }).populate('skills.skill'),
    SkillGap.find({ user: userId, isResolved: false }).populate('skill competency').sort({ priority: -1 }).limit(5),
    Recommendation.find({ user: userId, status: 'PENDING' }).populate('course').sort({ priority: -1 }).limit(4),
    LearningProgress.find({ user: userId }).populate('course', 'title thumbnail difficulty durationHours').sort({ lastAccessedAt: -1 }).limit(4),
    AssessmentAttempt.find({ user: userId, status: 'COMPLETED' }).populate('assessment', 'title type').sort({ submittedAt: -1 }).limit(3),
    require('../models/SystemModels.js').then(m => m.Notification.find({ user: userId, read: false }).sort({ createdAt: -1 }).limit(5)),
  ]);

  const completedCourses = courseProgress.filter(p => p.status === 'COMPLETED').length;
  const inProgressCourses = courseProgress.filter(p => p.status === 'IN_PROGRESS').length;
  const totalGaps = await SkillGap.countDocuments({ user: userId, isResolved: false });
  const criticalGaps = await SkillGap.countDocuments({ user: userId, isResolved: false, priority: { $in: ['HIGH', 'CRITICAL'] } });

  res.json({
    success: true,
    data: {
      profile,
      overallCompetencyScore: profile?.overallCompetencyScore || 0,
      completedCourses,
      inProgressCourses,
      totalGaps,
      criticalGaps,
      topGaps,
      recommendations,
      courseProgress,
      recentAttempts,
      notifications,
    }
  });
});
