import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Select, Alert } from '../../components/ui';
import { GraduationCap, Eye, EyeOff, CheckCircle } from 'lucide-react';

const DEPARTMENTS = ['NSO', 'DIID', 'CSO', 'Prices Division', 'Social Statistics', 'Economic Statistics', 'Agricultural Statistics', 'Other'];
const EXPERIENCE_RANGES = ['0-1', '1-3', '3-5', '5-10', '10+'];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    mobile: '', organization: 'MoSPI', department: '', designation: '',
    experienceYears: '3',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const update = (field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(form.password)) errs.password = 'Must include an uppercase letter and number';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!form.organization) errs.organization = 'Organization is required';
    if (!form.department) errs.department = 'Department is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setApiError('');
    try {
      const { confirmPassword, ...registerData } = form;
      await register(registerData);
      navigate('/onboarding');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return { strength: 0, label: '', color: '' };
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', 'bg-danger-500', 'bg-warning-500', 'bg-sky-500', 'bg-success-500'];
    return { strength: s, label: labels[s], color: colors[s] };
  })();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-slate-500 mt-1">Join KarmaSiksha to start your competency journey</p>
        </div>

        <div className="card card-body shadow-md">
          {apiError && (
            <Alert type="error" onClose={() => setApiError('')} className="mb-4">
              {apiError}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Personal Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" id="name" placeholder="Priya Sharma" value={form.name}
                onChange={e => update('name', e.target.value)} error={errors.name} required />
              <Input label="Email Address" type="email" id="email" placeholder="you@organization.gov.in"
                value={form.email} onChange={e => update('email', e.target.value)} error={errors.email} required />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Password */}
              <div className="form-group">
                <label className="label label-required">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} id="password"
                    className={`input pr-10 ${errors.password ? 'input-error' : ''}`}
                    placeholder="••••••••" value={form.password}
                    onChange={e => update('password', e.target.value)}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-1.5">
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength.strength ? passwordStrength.color : 'bg-slate-200'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">{passwordStrength.label}</span>
                  </div>
                )}
                {errors.password && <p className="form-error">{errors.password}</p>}
              </div>

              <Input label="Confirm Password" type="password" id="confirmPassword"
                placeholder="••••••••" value={form.confirmPassword}
                onChange={e => update('confirmPassword', e.target.value)} error={errors.confirmPassword} required />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Mobile Number" id="mobile" placeholder="9876543210"
                value={form.mobile} onChange={e => update('mobile', e.target.value)} />
              <Input label="Organization" id="organization" placeholder="MoSPI"
                value={form.organization} onChange={e => update('organization', e.target.value)}
                error={errors.organization} required />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Select label="Department" id="department" value={form.department}
                onChange={e => update('department', e.target.value)} error={errors.department} required>
                <option value="">Select department</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </Select>
              <Input label="Designation" id="designation" placeholder="Statistical Officer"
                value={form.designation} onChange={e => update('designation', e.target.value)} />
            </div>

            <Select label="Years of Experience" id="experienceYears" value={form.experienceYears}
              onChange={e => update('experienceYears', e.target.value)}>
              <option value="0">Less than 1 year</option>
              <option value="2">1–3 years</option>
              <option value="4">3–5 years</option>
              <option value="7">5–10 years</option>
              <option value="12">More than 10 years</option>
            </Select>

            <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500 flex items-start gap-2">
              <CheckCircle size={14} className="text-success-500 mt-0.5 shrink-0" />
              After registration, you'll complete an 8-step onboarding to personalize your learning journey.
            </div>

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
