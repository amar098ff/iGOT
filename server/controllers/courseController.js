import { Course } from '../models/Course.js';
import { LearningProgress } from '../models/LearningModels.js';
import { Notification } from '../models/SystemModels.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const getCourses = asyncHandler(async (req, res) => {
  const { page = 1, limit = 12, status = 'PUBLISHED', skill, difficulty, search, source } = req.query;
  const query = { status };
  if (skill) query.skills = skill;
  if (difficulty) query.difficulty = difficulty;
  if (source) query.source = source;
  if (search) query.$text = { $search: search };

  const total = await Course.countDocuments(query);
  const courses = await Course.find(query)
    .populate('skills', 'name')
    .populate('competencies', 'name')
    .sort({ enrollmentCount: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  // Get user's progress for these courses if authenticated
  let progressMap = {};
  if (req.user) {
    const progress = await LearningProgress.find({
      user: req.user._id,
      course: { $in: courses.map(c => c._id) }
    });
    progress.forEach(p => { progressMap[p.course.toString()] = p; });
  }

  const coursesWithProgress = courses.map(c => ({
    ...c.toObject(),
    progress: progressMap[c._id.toString()] || null,
  }));

  res.json({
    success: true,
    data: coursesWithProgress,
    pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) },
  });
});

export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('skills', 'name description')
    .populate('competencies', 'name')
    .populate('createdBy', 'name');
  if (!course) return res.status(404).json({ success: false, message: 'Course not found.' });

  let userProgress = null;
  if (req.user) {
    userProgress = await LearningProgress.findOne({ user: req.user._id, course: course._id });
  }

  res.json({ success: true, data: { course, progress: userProgress } });
});

export const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, data: course });
});

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedBy: req.user._id },
    { new: true }
  );
  if (!course) return res.status(404).json({ success: false, message: 'Course not found.' });
  res.json({ success: true, data: course });
});

export const enrollInCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course || course.status !== 'PUBLISHED') {
    return res.status(404).json({ success: false, message: 'Course not found.' });
  }

  const existing = await LearningProgress.findOne({ user: req.user._id, course: course._id });
  if (existing) {
    return res.json({ success: true, message: 'Already enrolled.', data: existing });
  }

  const progress = await LearningProgress.create({
    user: req.user._id,
    course: course._id,
    status: 'IN_PROGRESS',
    startedAt: new Date(),
    lastAccessedAt: new Date(),
  });

  await Course.findByIdAndUpdate(course._id, { $inc: { enrollmentCount: 1 } });

  await Notification.create({
    user: req.user._id,
    title: 'Course Enrolled',
    message: `You have successfully enrolled in "${course.title}". Happy learning!`,
    type: 'COURSE',
    link: `/learning/${course._id}`,
  });

  res.status(201).json({ success: true, message: 'Enrolled successfully!', data: progress });
});

export const updateCourseProgress = asyncHandler(async (req, res) => {
  const { moduleId, completionPercentage, timeSpentMinutes } = req.body;

  const progress = await LearningProgress.findOne({ user: req.user._id, course: req.params.id });
  if (!progress) return res.status(404).json({ success: false, message: 'Enrollment not found.' });

  progress.lastAccessedAt = new Date();
  if (completionPercentage !== undefined) progress.completionPercentage = completionPercentage;
  if (timeSpentMinutes) progress.timeSpentMinutes += timeSpentMinutes;

  if (moduleId) {
    const moduleProgress = progress.moduleProgress.find(m => m.moduleId === moduleId);
    if (moduleProgress) {
      moduleProgress.completed = true;
      moduleProgress.completedAt = new Date();
    } else {
      progress.moduleProgress.push({ moduleId, completed: true, completedAt: new Date() });
    }
  }

  // Check if completed
  if (completionPercentage >= 100) {
    progress.status = 'COMPLETED';
    progress.completedAt = new Date();
    await Course.findByIdAndUpdate(req.params.id, { $inc: { completionCount: 1 } });

    const course = await Course.findById(req.params.id);
    await Notification.create({
      user: req.user._id,
      title: 'Course Completed! 🎉',
      message: `Congratulations! You have completed "${course?.title}".`,
      type: 'COMPLETION',
      priority: 'HIGH',
    });
  }

  await progress.save();
  res.json({ success: true, data: progress });
});

export const getMyProgress = asyncHandler(async (req, res) => {
  const progress = await LearningProgress.find({ user: req.user._id })
    .populate('course', 'title thumbnail difficulty durationHours skills')
    .sort({ lastAccessedAt: -1 });

  const stats = {
    total: progress.length,
    inProgress: progress.filter(p => p.status === 'IN_PROGRESS').length,
    completed: progress.filter(p => p.status === 'COMPLETED').length,
    totalTimeSpent: progress.reduce((sum, p) => sum + (p.timeSpentMinutes || 0), 0),
  };

  res.json({ success: true, data: { progress, stats } });
});
