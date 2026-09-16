import User from '../models/User.js';
import { LearningProgress, SkillGap, Recommendation } from '../models/LearningModels.js';
import { AssessmentAttempt } from '../models/Assessment.js';
import { QuizAttempt } from '../models/Quiz.js';
import { Course } from '../models/Course.js';
import { Skill } from '../models/CompetencyModels.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const getAdminOverview = asyncHandler(async (req, res) => {
  const [
    totalLearners,
    activeLearners,
    totalCourses,
    publishedCourses,
    totalAssessments,
    totalQuizzes,
    avgCompetencyResult,
    recentActivity,
  ] = await Promise.all([
    User.countDocuments({ role: 'LEARNER' }),
    User.countDocuments({ role: 'LEARNER', status: 'ACTIVE', lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 3600 * 1000) } }),
    Course.countDocuments(),
    Course.countDocuments({ status: 'PUBLISHED' }),
    AssessmentAttempt.countDocuments({ status: 'COMPLETED' }),
    QuizAttempt.countDocuments({ status: 'COMPLETED' }),
    AssessmentAttempt.aggregate([
      { $match: { status: 'COMPLETED' } },
      { $group: { _id: null, avg: { $avg: '$percentage' } } }
    ]),
    AssessmentAttempt.find({ status: 'COMPLETED' })
      .populate('user', 'name email department')
      .populate('assessment', 'title type')
      .sort({ submittedAt: -1 })
      .limit(5),
  ]);

  // Competency distribution (by score ranges)
  const attempts = await AssessmentAttempt.find({ status: 'COMPLETED' }).select('percentage');
  const distribution = { '0-40': 0, '41-60': 0, '61-80': 0, '81-100': 0 };
  attempts.forEach(a => {
    if (a.percentage <= 40) distribution['0-40']++;
    else if (a.percentage <= 60) distribution['41-60']++;
    else if (a.percentage <= 80) distribution['61-80']++;
    else distribution['81-100']++;
  });

  // Top skill gaps across all users
  const topGaps = await SkillGap.aggregate([
    { $match: { isResolved: false } },
    { $group: { _id: '$skill', count: { $sum: 1 }, avgGapScore: { $avg: '$gapScore' } } },
    { $sort: { count: -1 } },
    { $limit: 8 },
    { $lookup: { from: 'skills', localField: '_id', foreignField: '_id', as: 'skill' } },
    { $unwind: { path: '$skill', preserveNullAndEmptyArrays: true } },
  ]);

  // Department breakdown
  const deptBreakdown = await User.aggregate([
    { $match: { role: 'LEARNER' } },
    { $group: { _id: '$department', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 8 },
  ]);

  // Course completion rates
  const courseCompletionRates = await Course.aggregate([
    { $match: { status: 'PUBLISHED' } },
    {
      $project: {
        title: 1,
        enrollmentCount: 1,
        completionCount: 1,
        completionRate: {
          $cond: [
            { $gt: ['$enrollmentCount', 0] },
            { $multiply: [{ $divide: ['$completionCount', '$enrollmentCount'] }, 100] },
            0
          ]
        }
      }
    },
    { $sort: { enrollmentCount: -1 } },
    { $limit: 8 },
  ]);

  res.json({
    success: true,
    data: {
      metrics: {
        totalLearners,
        activeLearners,
        totalCourses,
        publishedCourses,
        totalAssessments,
        totalQuizzes,
        avgScore: Math.round(avgCompetencyResult[0]?.avg || 0),
      },
      competencyDistribution: distribution,
      topSkillGaps: topGaps,
      departmentBreakdown: deptBreakdown,
      courseCompletionRates,
      recentActivity,
    }
  });
});

export const getDepartmentAnalytics = asyncHandler(async (req, res) => {
  const data = await User.aggregate([
    { $match: { role: 'LEARNER' } },
    {
      $lookup: {
        from: 'learningprogresses',
        localField: '_id',
        foreignField: 'user',
        as: 'progress',
      }
    },
    {
      $group: {
        _id: '$department',
        learnerCount: { $sum: 1 },
        avgCompletionRate: {
          $avg: {
            $cond: [{ $gt: [{ $size: '$progress' }, 0] },
              { $avg: '$progress.completionPercentage' },
              0
            ]
          }
        }
      }
    },
    { $sort: { learnerCount: -1 } },
  ]);

  res.json({ success: true, data });
});

export const getSkillGapReport = asyncHandler(async (req, res) => {
  const gapReport = await SkillGap.aggregate([
    { $match: { isResolved: false } },
    { $group: { _id: { skill: '$skill', severity: '$gapSeverity' }, count: { $sum: 1 } } },
    { $lookup: { from: 'skills', localField: '_id.skill', foreignField: '_id', as: 'skillData' } },
    { $unwind: { path: '$skillData', preserveNullAndEmptyArrays: true } },
    { $sort: { count: -1 } },
    { $limit: 20 },
  ]);

  res.json({ success: true, data: gapReport });
});
