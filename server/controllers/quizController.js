import { Quiz, QuizAttempt } from '../models/Quiz.js';
import Question from '../models/Question.js';
import { Notification } from '../models/SystemModels.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const getQuizzes = asyncHandler(async (req, res) => {
  const { status = 'PUBLISHED', course } = req.query;
  const query = { status };
  if (course) query.course = course;
  const quizzes = await Quiz.find(query)
    .populate('skills', 'name')
    .populate('competencies', 'name')
    .populate('course', 'title')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: quizzes });
});

export const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id)
    .populate('skills', 'name')
    .populate('competencies', 'name')
    .populate('course', 'title');
  if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found.' });

  let questions = await Question.find({ _id: { $in: quiz.questions }, status: { $in: ['APPROVED', 'PUBLISHED'] } })
    .select('questionText questionType options difficulty topicName');

  // Mask correct answers for learners
  if (req.user.role === 'LEARNER') {
    questions = questions.map(q => ({
      ...q.toObject(),
      options: q.options.map(o => ({ id: o.id, text: o.text })),
    }));
  }

  // Shuffle if enabled
  if (quiz.shuffleQuestions) {
    questions = questions.sort(() => Math.random() - 0.5);
  }

  const attemptCount = await QuizAttempt.countDocuments({
    user: req.user._id,
    quiz: quiz._id,
    status: 'COMPLETED',
  });

  res.json({
    success: true,
    data: { quiz, questions, canAttempt: attemptCount < (quiz.attemptsAllowed || 3), attemptCount }
  });
});

export const createQuiz = asyncHandler(async (req, res) => {
  const { questionIds, ...quizData } = req.body;

  // Validate all questions are APPROVED or PUBLISHED
  if (questionIds?.length) {
    const questions = await Question.find({ _id: { $in: questionIds } });
    const invalid = questions.filter(q => !['APPROVED', 'PUBLISHED'].includes(q.status));
    if (invalid.length > 0) {
      return res.status(400).json({
        success: false,
        message: `${invalid.length} question(s) are not in APPROVED or PUBLISHED status. Only approved questions can be added to quizzes.`,
      });
    }
  }

  const quiz = await Quiz.create({
    ...quizData,
    questions: questionIds,
    questionCount: questionIds?.length || 0,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, data: quiz });
});

export const updateQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found.' });
  res.json({ success: true, data: quiz });
});

export const submitQuizAttempt = asyncHandler(async (req, res) => {
  const { attemptId, answers } = req.body;
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found.' });

  const attempt = await QuizAttempt.findById(attemptId);
  if (!attempt || attempt.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ success: false, message: 'Attempt not found.' });
  }
  if (attempt.status === 'COMPLETED') {
    return res.status(400).json({ success: false, message: 'Attempt already submitted.' });
  }

  const questions = await Question.find({ _id: { $in: quiz.questions } });
  let correct = 0;
  const skillMap = {};
  const topicMap = {};

  const scoredAnswers = answers.map(answer => {
    const question = questions.find(q => q._id.toString() === answer.questionId);
    if (!question) return { ...answer, isCorrect: false };

    const correctOptionIds = question.options.filter(o => o.isCorrect).map(o => o.id);
    const isCorrect = answer.selectedOptions?.length > 0 &&
      answer.selectedOptions.every(opt => correctOptionIds.includes(opt)) &&
      correctOptionIds.every(opt => answer.selectedOptions.includes(opt));

    if (isCorrect) correct++;

    // Track per-skill and per-topic performance
    const skillId = question.skill?.toString();
    if (skillId) {
      if (!skillMap[skillId]) skillMap[skillId] = { correct: 0, total: 0, skillId };
      skillMap[skillId].total++;
      if (isCorrect) skillMap[skillId].correct++;
    }
    const topic = question.topicName;
    if (topic) {
      if (!topicMap[topic]) topicMap[topic] = { correct: 0, total: 0 };
      topicMap[topic].total++;
      if (isCorrect) topicMap[topic].correct++;
    }

    return {
      question: question._id,
      selectedOptions: answer.selectedOptions || [],
      isCorrect,
      markedForReview: answer.markedForReview || false,
    };
  });

  const score = questions.length > 0 ? (correct / questions.length) * 100 : 0;
  const passed = score >= quiz.passingScore;
  const submittedAt = new Date();

  attempt.answers = scoredAnswers;
  attempt.score = Math.round(score);
  attempt.percentage = Math.round(score);
  attempt.passed = passed;
  attempt.submittedAt = submittedAt;
  attempt.timeTaken = Math.floor((submittedAt - attempt.startedAt) / 1000);
  attempt.status = 'COMPLETED';
  attempt.skillPerformance = Object.values(skillMap).map(s => ({
    skill: s.skillId,
    correct: s.correct,
    total: s.total,
    percentage: Math.round((s.correct / s.total) * 100),
  }));
  attempt.topicPerformance = Object.entries(topicMap).map(([topic, t]) => ({
    topicName: topic,
    correct: t.correct,
    total: t.total,
    percentage: Math.round((t.correct / t.total) * 100),
  }));
  await attempt.save();

  // Get full questions with explanations for results
  const fullQuestions = await Question.find({ _id: { $in: quiz.questions } });

  await Notification.create({
    user: req.user._id,
    title: `Quiz ${passed ? 'Passed!' : 'Completed'}`,
    message: `You scored ${Math.round(score)}% on "${quiz.title}". ${passed ? 'Great work!' : 'Review the explanations and try again.'}`,
    type: 'RESULT',
    link: `/results/${attempt._id}`,
  });

  res.json({
    success: true,
    message: 'Quiz submitted.',
    data: {
      attempt,
      score: Math.round(score),
      passed,
      correct,
      total: questions.length,
      questions: fullQuestions,
    }
  });
});

export const startQuizAttempt = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz || quiz.status !== 'PUBLISHED') {
    return res.status(404).json({ success: false, message: 'Quiz not found or not available.' });
  }

  const existingAttempts = await QuizAttempt.countDocuments({
    user: req.user._id,
    quiz: quiz._id,
    status: 'COMPLETED',
  });
  if (existingAttempts >= quiz.attemptsAllowed) {
    return res.status(403).json({ success: false, message: `Maximum ${quiz.attemptsAllowed} attempts allowed.` });
  }

  const attempt = await QuizAttempt.create({
    quiz: quiz._id,
    user: req.user._id,
    status: 'IN_PROGRESS',
    startedAt: new Date(),
  });

  res.status(201).json({ success: true, data: attempt });
});
