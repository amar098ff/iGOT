import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { getAdminOverview, getDepartmentAnalytics, getSkillGapReport } from '../controllers/analyticsController.js';
import { Notification } from '../models/SystemModels.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { Course } from '../models/Course.js';
import Question from '../models/Question.js';
import User from '../models/User.js';

const router = express.Router();

// Admin analytics
router.get('/overview', authenticate, requireAdmin, getAdminOverview);
router.get('/departments', authenticate, requireAdmin, getDepartmentAnalytics);
router.get('/skill-gaps', authenticate, requireAdmin, getSkillGapReport);

// Notifications
router.get('/notifications', authenticate, asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);
  const unreadCount = await Notification.countDocuments({ user: req.user._id, read: false });
  res.json({ success: true, data: { notifications, unreadCount } });
}));

router.patch('/notifications/:id/read', authenticate, asyncHandler(async (req, res) => {
  await Notification.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { read: true, readAt: new Date() });
  res.json({ success: true });
}));

router.patch('/notifications/read-all', authenticate, asyncHandler(async (req, res) => {
  await Notification.updateMany({ user: req.user._id, read: false }, { read: true, readAt: new Date() });
  res.json({ success: true });
}));

// Global search
router.get('/search', authenticate, asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json({ success: true, data: { courses: [], questions: [], users: [] } });

  const regex = new RegExp(q, 'i');
  const [courses, questions, users] = await Promise.all([
    Course.find({ title: regex, status: 'PUBLISHED' }).select('title difficulty durationHours').limit(5),
    req.user.role !== 'LEARNER'
      ? Question.find({ questionText: regex }).select('questionText difficulty status').limit(5)
      : Promise.resolve([]),
    req.user.role !== 'LEARNER'
      ? User.find({ $or: [{ name: regex }, { email: regex }] }).select('name email department').limit(5)
      : Promise.resolve([]),
  ]);

  res.json({ success: true, data: { courses, questions, users } });
}));

export default router;
