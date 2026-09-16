import mongoose from 'mongoose';

const courseModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 },
  duration: { type: Number },
  resources: [{
    title: { type: String },
    type: { type: String, enum: ['VIDEO', 'PDF', 'ARTICLE', 'QUIZ', 'EXTERNAL'] },
    url: { type: String },
    duration: { type: Number },
  }],
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  shortDescription: { type: String },
  provider: { type: String },
  category: { type: String },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  competencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competency' }],
  difficulty: { type: String, enum: ['FOUNDATION', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'] },
  durationHours: { type: Number },
  learningObjectives: [{ type: String }],
  prerequisites: [{ type: String }],
  modules: [courseModuleSchema],
  thumbnail: { type: String },
  language: { type: String, default: 'English' },
  tags: [{ type: String }],
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' },
  source: { type: String, enum: ['INTERNAL', 'IGOT', 'EXTERNAL'], default: 'INTERNAL' },
  externalUrl: { type: String },
  igotCourseId: { type: String },
  enrollmentCount: { type: Number, default: 0 },
  completionCount: { type: Number, default: 0 },
  averageRating: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

courseSchema.index({ status: 1, skills: 1 });
courseSchema.index({ title: 'text', description: 'text' });

export const Course = mongoose.model('Course', courseSchema);
export const CourseModule = mongoose.model('CourseModule', courseModuleSchema);
