import { Assessment, AssessmentAttempt } from '../models/Assessment.js';
import Question from '../models/Question.js';
import LearnerProfile from '../models/LearnerProfile.js';
import { SkillGap } from '../models/LearningModels.js';
import { callAI } from '../services/ai/aiService.js';
import { PROMPTS } from '../services/ai/promptService.js';
import { validateCompetencyProfileResponse, parseAIJSON } from '../services/ai/aiValidator.js';
import { Notification } from '../models/SystemModels.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const getAssessments = asyncHandler(async (req, res) => {
  const { status = 'PUBLISHED', type } = req.query;
  const query = { status };
  if (type) query.type = type;
  const assessments = await Assessment.find(query)
    .populate('skills', 'name')
    .populate('competencies', 'name')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: assessments });
});

export const getAssessmentById = asyncHandler(async (req, res) => {
  const assessment = await Assessment.findById(req.params.id)
    .populate('skills')
    .populate('competencies');
  if (!assessment) return res.status(404).json({ success: false, message: 'Assessment not found.' });

  // For learners: include questions but without revealing answers
  let questions = [];
  if (assessment.questions?.length) {
    questions = await Question.find({
      _id: { $in: assessment.questions },
      status: { $in: ['APPROVED', 'PUBLISHED'] },
    }).select('questionText questionType options difficulty topicName');

    // Mask correct answers for the take-assessment experience
    if (req.user.role === 'LEARNER') {
      questions = questions.map(q => ({
        ...q.toObject(),
        options: q.options.map(o => ({ id: o.id, text: o.text })), // remove isCorrect
      }));
    }
  }

  // Check previous attempts
  const attemptCount = await AssessmentAttempt.countDocuments({
    user: req.user._id,
    assessment: assessment._id,
    status: 'COMPLETED',
  });

  res.json({
    success: true,
    data: {
      assessment,
      questions,
      canAttempt: attemptCount < (assessment.attemptsAllowed || 3),
      attemptCount,
    }
  });
});

export const createAssessment = asyncHandler(async (req, res) => {
  const assessment = await Assessment.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, data: assessment });
});

export const updateAssessment = asyncHandler(async (req, res) => {
  const assessment = await Assessment.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedBy: req.user._id },
    { new: true }
  );
  if (!assessment) return res.status(404).json({ success: false, message: 'Assessment not found.' });
  res.json({ success: true, data: assessment });
});

export const startAttempt = asyncHandler(async (req, res) => {
  const assessment = await Assessment.findById(req.params.id);
  if (!assessment || assessment.status !== 'PUBLISHED') {
    return res.status(404).json({ success: false, message: 'Assessment not found or not available.' });
  }

  const existingAttempts = await AssessmentAttempt.countDocuments({
    user: req.user._id,
    assessment: assessment._id,
    status: 'COMPLETED',
  });

  if (existingAttempts >= assessment.attemptsAllowed) {
    return res.status(403).json({ success: false, message: `Maximum ${assessment.attemptsAllowed} attempts allowed.` });
  }

  const attempt = await AssessmentAttempt.create({
    assessment: assessment._id,
    user: req.user._id,
    startedAt: new Date(),
    status: 'IN_PROGRESS',
  });

  res.status(201).json({ success: true, data: attempt });
});

export const submitAttempt = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const attempt = await AssessmentAttempt.findById(req.params.attemptId);

  if (!attempt || attempt.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ success: false, message: 'Attempt not found.' });
  }
  if (attempt.status === 'COMPLETED') {
    return res.status(400).json({ success: false, message: 'This attempt has already been submitted.' });
  }

  const assessment = await Assessment.findById(attempt.assessment);
  const questions = await Question.find({ _id: { $in: assessment.questions } });

  // Score the attempt
  let correct = 0;
  const scoredAnswers = answers.map(answer => {
    const question = questions.find(q => q._id.toString() === answer.questionId);
    if (!question) return { ...answer, isCorrect: false };

    const correctOptionIds = question.options.filter(o => o.isCorrect).map(o => o.id);
    const isCorrect = answer.selectedOptions?.length > 0 &&
      answer.selectedOptions.every(opt => correctOptionIds.includes(opt)) &&
      correctOptionIds.every(opt => answer.selectedOptions.includes(opt));

    if (isCorrect) correct++;
    return {
      question: question._id,
      selectedOptions: answer.selectedOptions || [],
      isCorrect,
    };
  });

  const score = (correct / questions.length) * 100;
  const passed = score >= assessment.passingScore;
  const submittedAt = new Date();

  attempt.answers = scoredAnswers;
  attempt.score = Math.round(score);
  attempt.percentage = Math.round(score);
  attempt.passed = passed;
  attempt.submittedAt = submittedAt;
  attempt.timeTaken = Math.floor((submittedAt - attempt.startedAt) / 1000);
  attempt.status = 'COMPLETED';
  await attempt.save();

  // AI competency analysis
  let competencyAnalysis = null;
  try {
    const prompt = PROMPTS.COMPETENCY_PROFILE([{ score, answers: scoredAnswers }]);
    const rawAI = await callAI(prompt);
    const { valid } = validateCompetencyProfileResponse(rawAI);
    if (valid) {
      competencyAnalysis = rawAI;
      // Update learner profile competency score
      await LearnerProfile.findOneAndUpdate(
        { user: req.user._id },
        { overallCompetencyScore: rawAI.overallScore }
      );
    }
  } catch (e) {
    console.warn('Competency analysis AI call failed:', e.message);
  }

  // Create notification
  await Notification.create({
    user: req.user._id,
    title: `Assessment ${passed ? 'Passed' : 'Completed'}`,
    message: `You scored ${Math.round(score)}% on "${assessment.title}". ${passed ? 'Congratulations!' : 'Keep practicing!'}`,
    type: 'RESULT',
    link: `/results/${attempt._id}`,
  });

  res.json({
    success: true,
    message: 'Assessment submitted successfully.',
    data: {
      attempt,
      score: Math.round(score),
      passed,
      correct,
      total: questions.length,
      competencyAnalysis,
    }
  });
});

export const getAttemptResult = asyncHandler(async (req, res) => {
  const attempt = await AssessmentAttempt.findById(req.params.id)
    .populate('assessment')
    .populate({ path: 'answers.question', select: 'questionText options correctAnswerExplanation difficulty topicName' });

  if (!attempt) return res.status(404).json({ success: false, message: 'Result not found.' });
  if (attempt.user.toString() !== req.user._id.toString() && req.user.role === 'LEARNER') {
    return res.status(403).json({ success: false, message: 'Access denied.' });
  }

  res.json({ success: true, data: attempt });
});
