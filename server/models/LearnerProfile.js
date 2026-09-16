import mongoose from 'mongoose';

const COMPETENCY_LEVELS = ['FOUNDATION', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

const learnerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  skills: [{
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    selfAssessedLevel: { type: String, enum: COMPETENCY_LEVELS },
    verifiedLevel: { type: String, enum: COMPETENCY_LEVELS },
  }],
  interests: [{ type: String }],
  learningGoals: [{ type: String }],
  preferredLearningDuration: { type: String, enum: ['15min', '30min', '1hr', '2hr+'], default: '1hr' },
  preferredLearningTime: { type: String, enum: ['morning', 'afternoon', 'evening', 'weekend'] },
  languagePreference: { type: String, default: 'English' },
  overallCompetencyScore: { type: Number, min: 0, max: 100, default: 0 },
  bio: { type: String, maxlength: 500 },
  linkedIn: { type: String },
  onboardingStep: { type: Number, default: 0 },
  completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
}, { timestamps: true });

learnerProfileSchema.index({ user: 1 });

export default mongoose.model('LearnerProfile', learnerProfileSchema);
