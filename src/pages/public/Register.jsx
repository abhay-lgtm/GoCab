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
    const result = await register({ ...form, role });
    setLoading(false);
    if (result.success) {
      navigate(result.dashboard, { replace: true });
    } else {
      setErrors({ form: result.error });
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0d14] font-sans">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[46%] flex-col justify-between p-12 bg-[#111827] border-r border-[#1f2937]">
        <div>
          <Link to="/" className="flex items-center gap-2 text-white no-underline">
            <span className="text-xl font-bold tracking-tight">GoCab</span>
          </Link>
        </div>

        <div>
          <blockquote className="text-3xl font-bold text-white leading-tight mb-4 tracking-tight">
            "Join the fastest growing mobility network."
          </blockquote>
          <p className="text-[#9ca3af] text-sm">
            Thousands of riders and drivers trust GoCab every day. Create your free account and get started in minutes.
          </p>
        </div>

        <p className="text-[#6b7280] text-xs">
          &copy; 2024 GoCab
        </p>
      </div>

      {/* Form panel */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center bg-[#0a0d14]">
        <div className="w-full max-w-lg mx-auto px-6 py-10 lg:py-16">
          {/* Mobile logo */}
          <div className="flex justify-center mb-6 lg:hidden">
            <Link to="/" className="flex items-center gap-2 text-white no-underline">
              <span className="text-xl font-bold tracking-tight">GoCab</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-[#9ca3af] mb-8">
            Quick and free. No credit card required.
          </p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {[
              { id: 'customer', label: 'I need rides', icon: User },
              { id: 'driver', label: 'I drive', icon: Car },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setRole(id)}
                className={`flex items-center justify-center gap-2 p-3 rounded border transition-all duration-150 ${
                  role === id
                    ? 'bg-[#2563eb] text-white border-[#2563eb]'
                    : 'bg-[#111827] text-[#9ca3af] border-[#1f2937] hover:text-white'
                }`}
              >
                <Icon size={17} />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {errors.form && (
              <p className="text-xs text-[#dc2626] bg-[#dc2626]/10 border border-[#dc2626]/20 rounded p-2">
                {errors.form}
              </p>
            )}
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
            <label className="flex items-center gap-2 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={e => setShowPassword(e.target.checked)}
                className="w-4 h-4 rounded border-[#1f2937] bg-[#111827] text-[#2563eb] focus:ring-[#2563eb]"
              />
              <span className="text-xs text-[#9ca3af]">Show password</span>
            </label>

            {/* Driver-only fields */}
            {role === 'driver' && (
              <div className="flex flex-col gap-4 pt-4 mt-2 border-t border-[#1f2937]">
                <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
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
                  <label htmlFor="reg-vehicle-type" className="text-sm font-medium text-[#9ca3af]">
                    Vehicle Type
                  </label>
                  <select
                    id="reg-vehicle-type"
                    value={form.vehicleType}
                    onChange={set('vehicleType')}
                    className="w-full h-11 px-3 rounded text-sm bg-[#111827] text-[#f9fafb] border border-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all duration-150"
                  >
                    {vehicleTypes.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            )}

            <div className="mt-4">
              <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
                Create Account
                <ChevronRight size={18} />
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-[#9ca3af] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2563eb] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
