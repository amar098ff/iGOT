import mongoose from 'mongoose';

const LEVELS = ['FOUNDATION', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

const domainSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String },
  icon: { type: String },
  color: { type: String },
  status: { type: String, enum: ['ACTIVE', 'ARCHIVED'], default: 'ACTIVE' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const competencySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  domain: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain', required: true },
  code: { type: String, unique: true, sparse: true },
  status: { type: String, enum: ['ACTIVE', 'ARCHIVED'], default: 'ACTIVE' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  competency: { type: mongoose.Schema.Types.ObjectId, ref: 'Competency', required: true },
  domain: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain' },
  levelDescriptions: {
    FOUNDATION:    { type: String },
    BEGINNER:      { type: String },
    INTERMEDIATE:  { type: String },
    ADVANCED:      { type: String },
    EXPERT:        { type: String },
  },
  status: { type: String, enum: ['ACTIVE', 'ARCHIVED'], default: 'ACTIVE' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['ACTIVE', 'ARCHIVED'], default: 'ACTIVE' },
}, { timestamps: true });

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String },
  department: { type: String },
  requiredCompetencies: [{
    competency: { type: mongoose.Schema.Types.ObjectId, ref: 'Competency' },
    requiredLevel: { type: String, enum: LEVELS },
  }],
  requiredSkills: [{
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    requiredLevel: { type: String, enum: LEVELS },
  }],
  status: { type: String, enum: ['ACTIVE', 'ARCHIVED'], default: 'ACTIVE' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const Domain = mongoose.model('Domain', domainSchema);
export const Competency = mongoose.model('Competency', competencySchema);
export const Skill = mongoose.model('Skill', skillSchema);
export const Topic = mongoose.model('Topic', topicSchema);
export const Role = mongoose.model('Role', roleSchema);
