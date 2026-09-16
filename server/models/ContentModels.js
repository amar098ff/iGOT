import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileSize: { type: Number },
  mimeType: { type: String },
  fileType: { type: String, enum: ['PDF', 'DOCX', 'DOC', 'TXT'] },
  category: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  module: { type: String },
  version: { type: String, default: '1.0' },
  extractedText: { type: String },
  extractedChunks: [{ type: String }],
  wordCount: { type: Number },
  topics: [{ type: String }],
  concepts: [{ type: String }],
  processingStatus: { type: String, enum: ['PENDING', 'PROCESSING', 'PROCESSED', 'FAILED'], default: 'PENDING' },
  processingError: { type: String },
  generatedQuestionsCount: { type: Number, default: 0 },
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const learningContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['VIDEO', 'PDF', 'ARTICLE', 'QUIZ', 'EXTERNAL', 'DOCUMENT'] },
  url: { type: String },
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  duration: { type: Number },
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const Document = mongoose.model('Document', documentSchema);
export const LearningContent = mongoose.model('LearningContent', learningContentSchema);
