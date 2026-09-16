import mongoose from 'mongoose';

const LEVELS = ['FOUNDATION', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];
const GAP_SEVERITY = ['NONE', 'LOW', 'MODERATE', 'HIGH', 'CRITICAL'];
const PRIORITY = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

const skillGapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  competency: { type: mongoose.Schema.Types.ObjectId, ref: 'Competency' },
  currentLevel: { type: String, enum: LEVELS },
  requiredLevel: { type: String, enum: LEVELS },
  gapSeverity: { type: String, enum: GAP_SEVERITY, default: 'NONE' },
  gapScore: { type: Number, min: 0, max: 4 },
  priority: { type: String, enum: PRIORITY, default: 'LOW' },
  evidence: { type: String },
  recommendedAction: { type: String },
  aiExplanation: { type: String },
  lastAssessedAt: { type: Date },
  resolvedAt: { type: Date },
  isResolved: { type: Boolean, default: false },
}, { timestamps: true });

skillGapSchema.index({ user: 1, isResolved: 1 });
skillGapSchema.index({ user: 1, skill: 1 }, { unique: true });

const recommendationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
  competency: { type: mongoose.Schema.Types.ObjectId, ref: 'Competency' },
  skillGap: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillGap' },
  type: { type: String, enum: ['SKILL_GAP', 'ROLE_REQUIREMENT', 'INTEREST', 'PERFORMANCE', 'CONTINUATION'], default: 'SKILL_GAP' },
  reason: { type: String },
  priority: { type: String, enum: PRIORITY, default: 'MEDIUM' },
  difficulty: { type: String },
  estimatedEffortHours: { type: Number },
  source: { type: String, enum: ['INTERNAL', 'IGOT', 'AI'], default: 'AI' },
  status: { type: String, enum: ['PENDING', 'VIEWED', 'STARTED', 'COMPLETED', 'DISMISSED'], default: 'PENDING' },
  externalCourseData: { type: mongoose.Schema.Types.Mixed },
  generatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

recommendationSchema.index({ user: 1, status: 1 });
recommendationSchema.index({ user: 1, priority: -1 });

const learningProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  status: { type: String, enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'], default: 'NOT_STARTED' },
  completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
  lastAccessedAt: { type: Date },
  startedAt: { type: Date },
  completedAt: { type: Date },
  timeSpentMinutes: { type: Number, default: 0 },
  moduleProgress: [{
    moduleId: { type: String },
    moduleTitle: { type: String },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
  }],
  competencyScoreHistory: [{
    score: { type: Number },
    recordedAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

learningProgressSchema.index({ user: 1, course: 1 }, { unique: true });

export const SkillGap = mongoose.model('SkillGap', skillGapSchema);
export const Recommendation = mongoose.model('Recommendation', recommendationSchema);
export const LearningProgress = mongoose.model('LearningProgress', learningProgressSchema);
