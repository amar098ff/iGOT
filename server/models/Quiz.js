import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  module: { type: String },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  competencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competency' }],
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD', 'MIXED'], default: 'MEDIUM' },
  timeLimit: { type: Number },
  questionCount: { type: Number },
  passingScore: { type: Number, default: 60 },
  attemptsAllowed: { type: Number, default: 3 },
  shuffleQuestions: { type: Boolean, default: false },
  showExplanations: { type: Boolean, default: true },
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const quizAttemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedOptions: [{ type: String }],
    isCorrect: { type: Boolean },
    markedForReview: { type: Boolean, default: false },
    timeTaken: { type: Number },
  }],
  score: { type: Number },
  percentage: { type: Number },
  passed: { type: Boolean },
  startedAt: { type: Date, default: Date.now },
  submittedAt: { type: Date },
  timeTaken: { type: Number },
  skillPerformance: [{
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    skillName: { type: String },
    correct: { type: Number },
    total: { type: Number },
    percentage: { type: Number },
  }],
  topicPerformance: [{
    topicName: { type: String },
    correct: { type: Number },
    total: { type: Number },
    percentage: { type: Number },
  }],
  status: { type: String, enum: ['IN_PROGRESS', 'COMPLETED', 'ABANDONED'], default: 'IN_PROGRESS' },
}, { timestamps: true });

quizAttemptSchema.index({ user: 1, quiz: 1 });

export const Quiz = mongoose.model('Quiz', quizSchema);
export const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);
