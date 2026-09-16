import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['KNOWLEDGE', 'SKILL', 'TOPIC', 'ROLE', 'COMPETENCY'], default: 'KNOWLEDGE' },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  competencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competency' }],
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  timeLimit: { type: Number },
  passingScore: { type: Number, default: 60 },
  attemptsAllowed: { type: Number, default: 3 },
  difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD', 'MIXED'], default: 'MIXED' },
  instructions: { type: String },
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' },
  isOnboarding: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const assessmentAttemptSchema = new mongoose.Schema({
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedOptions: [{ type: String }],
    isCorrect: { type: Boolean },
    timeTaken: { type: Number },
  }],
  score: { type: Number },
  percentage: { type: Number },
  passed: { type: Boolean },
  startedAt: { type: Date, default: Date.now },
  submittedAt: { type: Date },
  timeTaken: { type: Number },
  skillResults: [{
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    score: { type: Number },
    level: { type: String },
  }],
  competencyResults: [{
    competency: { type: mongoose.Schema.Types.ObjectId, ref: 'Competency' },
    score: { type: Number },
    level: { type: String },
  }],
  status: { type: String, enum: ['IN_PROGRESS', 'COMPLETED', 'ABANDONED'], default: 'IN_PROGRESS' },
}, { timestamps: true });

assessmentAttemptSchema.index({ user: 1, assessment: 1 });
assessmentAttemptSchema.index({ user: 1, submittedAt: -1 });

export const Assessment = mongoose.model('Assessment', assessmentSchema);
export const AssessmentAttempt = mongoose.model('AssessmentAttempt', assessmentAttemptSchema);
