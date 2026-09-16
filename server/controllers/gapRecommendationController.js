import { SkillGap, Recommendation } from '../models/LearningModels.js';
import LearnerProfile from '../models/LearnerProfile.js';
import User from '../models/User.js';
import { analyzeSkillGaps } from '../services/ai/skillGapService.js';
import { generateRecommendations } from '../services/ai/recommendationService.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const getMySkillGaps = asyncHandler(async (req, res) => {
  const gaps = await SkillGap.find({ user: req.user._id })
    .populate('skill', 'name description competency')
    .populate('competency', 'name')
    .sort({ priority: -1, gapScore: -1 });

  const stats = {
    total: gaps.length,
    critical: gaps.filter(g => g.priority === 'CRITICAL').length,
    high: gaps.filter(g => g.priority === 'HIGH').length,
    resolved: gaps.filter(g => g.isResolved).length,
    active: gaps.filter(g => !g.isResolved).length,
  };

  res.json({ success: true, data: { gaps, stats } });
});

export const analyzeGaps = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const profile = await LearnerProfile.findOne({ user: req.user._id })
    .populate('skills.skill')
    .populate('role');

  const learnerData = {
    name: user.name,
    role: profile?.role?.name || user.designation,
    department: user.department,
    experienceYears: user.experienceYears,
    currentSkills: profile?.skills?.map(s => ({
      skillName: s.skill?.name || 'Unknown',
      level: s.selfAssessedLevel,
    })) || [],
    roleRequirements: profile?.role?.requiredSkills?.map(rs => ({
      skillName: rs.skill?.name,
      requiredLevel: rs.requiredLevel,
    })) || [],
    assessmentScores: req.body.assessmentScores || [],
    interests: profile?.interests || [],
    learningGoals: profile?.learningGoals || [],
  };

  const result = await analyzeSkillGaps(req.user._id, learnerData);
  res.json({ success: true, data: result });
});

export const getMyRecommendations = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const query = { user: req.user._id };
  if (status) query.status = status;

  const recommendations = await Recommendation.find(query)
    .populate('course', 'title thumbnail difficulty durationHours shortDescription')
    .populate('skill', 'name')
    .populate('competency', 'name')
    .sort({ priority: -1, generatedAt: -1 })
    .limit(20);

  res.json({ success: true, data: recommendations });
});

export const generatePersonalizedRecommendations = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const profile = await LearnerProfile.findOne({ user: req.user._id }).populate('role skills.skill');
  const gaps = await SkillGap.find({ user: req.user._id, isResolved: false })
    .populate('skill', 'name')
    .sort({ priority: -1 })
    .limit(5);

  const learnerData = {
    role: profile?.role?.name || user.designation,
    department: user.department,
    interests: profile?.interests || [],
    learningGoals: profile?.learningGoals || [],
    skillGaps: gaps.map(g => ({
      skillName: g.skill?.name,
      severity: g.gapSeverity,
      priority: g.priority,
    })),
  };

  const result = await generateRecommendations(req.user._id, learnerData);
  res.json({ success: true, data: result });
});

export const updateRecommendationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const rec = await Recommendation.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { status },
    { new: true }
  );
  if (!rec) return res.status(404).json({ success: false, message: 'Recommendation not found.' });
  res.json({ success: true, data: rec });
});
