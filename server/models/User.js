import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8, select: false },
  mobile: { type: String, trim: true },
  organization: { type: String, trim: true },
  department: { type: String, trim: true },
  designation: { type: String, trim: true },
  experienceYears: { type: Number, min: 0, max: 60 },
  role: { type: String, enum: ['LEARNER', 'ADMIN', 'SUPER_ADMIN'], default: 'LEARNER' },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'], default: 'ACTIVE' },
  avatar: { type: String },
  onboardingCompleted: { type: Boolean, default: false },
  lastLogin: { type: Date },
  passwordChangedAt: { type: Date },
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpires: { type: Date, select: false },
}, { timestamps: true });

userSchema.index({ email: 1 });
userSchema.index({ role: 1, status: 1 });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpires;
  return obj;
};

export default mongoose.model('User', userSchema);
