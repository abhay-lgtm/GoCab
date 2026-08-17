import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, Lock, Eye, EyeOff, Car, ChevronRight,
  FileText, Hash,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RideSphereLogoMark } from '../../components/layout/Navbar';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const vehicleTypes = ['Sedan', 'Hatchback', 'SUV', 'MPV', 'Auto'];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: '',
    license: '', vehicleNumber: '', vehicleType: 'Sedan',
  });

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    if (role === 'driver') {
      if (!form.license.trim()) e.license = 'License number is required';
      if (!form.vehicleNumber.trim()) e.vehicleNumber = 'Vehicle number is required';
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const result = register({ ...form, role });
    setLoading(false);
    if (result.success) navigate(result.dashboard, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[38%] bg-[#0a0f1e] flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2.5">
          <RideSphereLogoMark size={30} />
          <span className="text-lg font-bold text-white">
            Ride<span className="text-[#3b6ef8]">Sphere</span>
          </span>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Join the smarter way to travel.
          </h2>
          <p className="text-white/40 text-sm leading-relaxed">
            Thousands of riders and drivers trust RideSphere every day. Create your free account and get started in minutes.
          </p>
        </div>
        <p className="text-white/20 text-xs">© 2024 RideSphere</p>
      </div>

      {/* Form panel */}
      <div className="flex-1 overflow-y-auto bg-[#f8f9fc]">
        <div className="max-w-lg mx-auto px-6 py-10">
          {/* Mobile logo */}
          <div className="flex justify-center mb-6 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <RideSphereLogoMark size={24} />
              <span className="text-sm font-bold text-[#0a0f1e]">
                Ride<span className="text-[#3b6ef8]">Sphere</span>
              </span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-[#0a0f1e] mb-1.5">Create your account</h1>
          <p className="text-sm text-[#4b5563] mb-6">Quick and free. No credit card required.</p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {[
              { id: 'customer', label: 'I need rides', icon: User },
              { id: 'driver', label: 'I drive', icon: Car },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setRole(id)}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-sm font-medium transition-all duration-150
                  ${role === id
                    ? 'border-[#3b6ef8] bg-[#3b6ef8]/5 text-[#3b6ef8]'
                    : 'border-[#e4e8f0] bg-white text-[#4b5563] hover:border-[#3b6ef8]/40'
                  }`}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Common fields */}
            <Input
              label="Full Name"
              id="reg-name"
              type="text"
              placeholder="Abhay Prasad"
              icon={User}
              value={form.name}
              onChange={set('name')}
              error={errors.name}
            />
            <Input
              label="Email Address"
              id="reg-email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={form.email}
              onChange={set('email')}
              error={errors.email}
            />
            <Input
              label="Phone Number"
              id="reg-phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              icon={Phone}
              value={form.phone}
              onChange={set('phone')}
              error={errors.phone}
            />
            <Input
              label="Password"
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 6 characters"
              icon={Lock}
              value={form.password}
              onChange={set('password')}
              error={errors.password}
            />
            <Input
              label="Confirm Password"
              id="reg-confirm"
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat your password"
              icon={Lock}
              value={form.confirm}
              onChange={set('confirm')}
              error={errors.confirm}
            />

            {/* Show password toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={e => setShowPassword(e.target.checked)}
                className="rounded border-[#e4e8f0] text-[#3b6ef8] focus:ring-[#3b6ef8]"
              />
              <span className="text-xs text-[#4b5563]">Show password</span>
            </label>

            {/* Driver-only fields */}
            {role === 'driver' && (
              <div className="space-y-4 pt-2 border-t border-[#e4e8f0]">
                <p className="text-xs font-semibold text-[#0a0f1e] uppercase tracking-wide pt-1">
                  Driver Details
                </p>
                <Input
                  label="Driving License Number"
                  id="reg-license"
                  type="text"
                  placeholder="KL-XXXX-XXXX"
                  icon={FileText}
                  value={form.license}
                  onChange={set('license')}
                  error={errors.license}
                />
                <Input
                  label="Vehicle Registration Number"
                  id="reg-vehicle-number"
                  type="text"
                  placeholder="KL XX AX XXXX"
                  icon={Hash}
                  value={form.vehicleNumber}
                  onChange={set('vehicleNumber')}
                  error={errors.vehicleNumber}
                />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-vehicle-type" className="text-sm font-medium text-[#0a0f1e]">
                    Vehicle Type
                  </label>
                  <select
                    id="reg-vehicle-type"
                    value={form.vehicleType}
                    onChange={set('vehicleType')}
                    className="h-11 rounded-xl border border-[#e4e8f0] bg-white text-sm text-[#0a0f1e] px-3.5 focus:outline-none focus:border-[#3b6ef8] focus:ring-2 focus:ring-[#3b6ef8]/10 transition-all"
                  >
                    {vehicleTypes.map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            )}

            <Button type="submit" variant="primary" fullWidth size="lg" loading={loading} className="mt-2">
              Create Account
              <ChevronRight size={18} />
            </Button>
          </form>

          <p className="text-center text-sm text-[#4b5563] mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-[#3b6ef8] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
