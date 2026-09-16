import Question from '../models/Question.js';
import { AuditLog } from '../models/SystemModels.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const getQuestions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status, difficulty, skill, competency, source, search } = req.query;

  const query = {};
  if (status) query.status = status;
  if (difficulty) query.difficulty = difficulty;
  if (skill) query.skill = skill;
  if (competency) query.competency = competency;
  if (source) query.source = source;
  if (search) query.questionText = { $regex: search, $options: 'i' };

  const total = await Question.countDocuments(query);
  const questions = await Question.find(query)
    .populate('skill', 'name')
    .populate('competency', 'name')
    .populate('sourceDocument', 'title')
    .populate('createdBy', 'name')
    .populate('reviewedBy', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: questions,
    pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) },
  });
});

export const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)
    .populate('skill', 'name')
    .populate('competency', 'name')
    .populate('topic', 'name')
    .populate('sourceDocument', 'title originalName');
  if (!question) return res.status(404).json({ success: false, message: 'Question not found.' });
  res.json({ success: true, data: question });
});

export const createQuestion = asyncHandler(async (req, res) => {
  const question = await Question.create({ ...req.body, createdBy: req.user._id, status: 'DRAFT' });
  res.status(201).json({ success: true, data: question });
});

export const updateQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!question) return res.status(404).json({ success: false, message: 'Question not found.' });
  res.json({ success: true, data: question });
});

export const updateQuestionStatus = asyncHandler(async (req, res) => {
  const { status, rejectionReason } = req.body;
  const validTransitions = {
    'AI_GENERATED': ['DRAFT', 'UNDER_REVIEW', 'REJECTED'],
    'DRAFT': ['UNDER_REVIEW', 'ARCHIVED'],
    'UNDER_REVIEW': ['APPROVED', 'REJECTED', 'DRAFT'],
    'APPROVED': ['PUBLISHED', 'ARCHIVED'],
    'PUBLISHED': ['ARCHIVED'],
    'REJECTED': ['DRAFT', 'ARCHIVED'],
  };

  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ success: false, message: 'Question not found.' });

  const allowed = validTransitions[question.status] || [];
  if (!allowed.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Cannot transition from ${question.status} to ${status}. Allowed transitions: ${allowed.join(', ')}`,
    });
  }

  const updateData = { status };
  if (status === 'APPROVED') {
    updateData.approvedBy = req.user._id;
    updateData.approvedAt = new Date();
  }
  if (status === 'REJECTED') {
    updateData.rejectedAt = new Date();
    updateData.rejectionReason = rejectionReason;
    updateData.reviewedBy = req.user._id;
  }
  if (status === 'UNDER_REVIEW') {
    updateData.reviewedBy = req.user._id;
  }

  const updated = await Question.findByIdAndUpdate(req.params.id, updateData, { new: true });

  await AuditLog.create({
    user: req.user._id,
    action: `QUESTION_${status}`,
    resource: 'Question',
    resourceId: question._id.toString(),
    details: { prevStatus: question.status, newStatus: status, rejectionReason },
    status: 'SUCCESS',
  });

  res.json({ success: true, message: `Question status updated to ${status}.`, data: updated });
});

export const bulkUpdateStatus = asyncHandler(async (req, res) => {
  const { questionIds, status } = req.body;
  if (!Array.isArray(questionIds) || questionIds.length === 0) {
    return res.status(400).json({ success: false, message: 'questionIds array is required.' });
  }

  const updateData = { status };
  if (status === 'APPROVED') {
    updateData.approvedBy = req.user._id;
    updateData.approvedAt = new Date();
  }

  const result = await Question.updateMany({ _id: { $in: questionIds } }, updateData);

  await AuditLog.create({
    user: req.user._id,
    action: `QUESTION_BULK_${status}`,
    resource: 'Question',
    details: { questionIds, count: result.modifiedCount },
    status: 'SUCCESS',
  });

  res.json({ success: true, message: `${result.modifiedCount} questions updated to ${status}.` });
});

export const getQuestionStats = asyncHandler(async (req, res) => {
  const stats = await Question.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  const statMap = {};
  stats.forEach(s => { statMap[s._id] = s.count; });
  res.json({ success: true, data: statMap });
});
