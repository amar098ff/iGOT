import mongoose from 'mongoose';

const DIFFICULTY = ['EASY', 'MEDIUM', 'HARD'];
const Q_TYPES = ['MCQ_SINGLE', 'MCQ_MULTI', 'TRUE_FALSE', 'SCENARIO', 'KNOWLEDGE'];
const Q_STATUS = ['AI_GENERATED', 'DRAFT', 'UNDER_REVIEW', 'APPROVED', 'PUBLISHED', 'REJECTED', 'ARCHIVED'];

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  questionType: { type: String, enum: Q_TYPES, default: 'MCQ_SINGLE' },
  options: [{
    id: { type: String },
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
  }],
  correctAnswerExplanation: { type: String },
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
  competency: { type: mongoose.Schema.Types.ObjectId, ref: 'Competency' },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  topicName: { type: String },
  difficulty: { type: String, enum: DIFFICULTY, default: 'MEDIUM' },
  status: { type: String, enum: Q_STATUS, default: 'DRAFT' },
  source: { type: String, enum: ['MANUAL', 'AI_GENERATED', 'IMPORTED'], default: 'MANUAL' },
  sourceDocument: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  sourceLocation: { type: String },
  tags: [{ type: String }],
  language: { type: String, default: 'English' },
  usageCount: { type: Number, default: 0 },
  averageScore: { type: Number },
  reviewNotes: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedAt: { type: Date },
  rejectedAt: { type: Date },
  rejectionReason: { type: String },
}, { timestamps: true });

questionSchema.index({ skill: 1, difficulty: 1, status: 1 });
questionSchema.index({ competency: 1, status: 1 });
questionSchema.index({ status: 1 });

export default mongoose.model('Question', questionSchema);
