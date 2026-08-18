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
    <div
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ background: '#05091a', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-[38%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: '#07091f', borderRight: '2px solid rgba(255,255,255,0.06)' }}
      >
        {/* Decorative glows */}
        <div style={{
          position: 'absolute', top: -100, right: -100, width: 450, height: 450,
          background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -80, width: 350, height: 350,
          background: 'radial-gradient(circle, rgba(79,126,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(79,126,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(79,126,255,0.025) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <RideSphereLogoMark size={30} />
            <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              Ride<span style={{ color: '#5b8eff' }}>Sphere</span>
            </span>
          </Link>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Join the smarter way to travel.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, lineHeight: 1.7 }}>
            Thousands of riders and drivers trust RideSphere every day. Create your free account and get started in minutes.
          </p>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: 12, position: 'relative', zIndex: 1 }}>
          &copy; 2024 RideSphere
        </p>
      </div>

      {/* Form panel */}
      <div
        className="flex-1 overflow-y-auto flex flex-col items-center"
        style={{ background: '#05091a' }}
      >
        <div className="w-full max-w-lg mx-auto px-6 py-10 lg:py-16">
          {/* Mobile logo */}
          <div className="flex justify-center mb-6 lg:hidden">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <RideSphereLogoMark size={24} />
              <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>
                Ride<span style={{ color: '#5b8eff' }}>Sphere</span>
              </span>
            </Link>
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 6, letterSpacing: '-0.02em' }}>
            Create your account
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>
            Quick and free. No credit card required.
          </p>

          {/* Role selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {[
              { id: 'customer', label: 'I need rides', icon: User },
              { id: 'driver', label: 'I drive', icon: Car },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setRole(id)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  fontSize: 14, fontWeight: 600, transition: 'all 0.15s',
                  background: role === id ? 'rgba(79,126,255,0.15)' : 'rgba(255,255,255,0.04)',
                  color: role === id ? '#5b8eff' : 'rgba(255,255,255,0.45)',
                  outline: role === id ? '1px solid rgba(79,126,255,0.4)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }} noValidate>
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
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginTop: -6 }}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={e => setShowPassword(e.target.checked)}
                style={{ accentColor: '#4f7eff', width: 14, height: 14 }}
              />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Show password</span>
            </label>

            {/* Driver-only fields */}
            {role === 'driver' && (
              <div
                style={{
                  display: 'flex', flexDirection: 'column', gap: 14,
                  paddingTop: 16, marginTop: 4,
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label
                    htmlFor="reg-vehicle-type"
                    style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.65)' }}
                  >
                    Vehicle Type
                  </label>
                  <select
                    id="reg-vehicle-type"
                    value={form.vehicleType}
                    onChange={set('vehicleType')}
                    style={{
                      height: 44, borderRadius: 12, fontSize: 14, padding: '0 14px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.85)',
                      outline: 'none',
                    }}
                  >
                    {vehicleTypes.map(v => <option key={v} style={{ background: '#0a0f1e' }}>{v}</option>)}
                  </select>
                </div>
              </div>
            )}

            <Button type="submit" variant="primary" fullWidth size="lg" loading={loading} style={{ marginTop: 8 }}>
              Create Account
              <ChevronRight size={18} />
            </Button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,0.35)', marginTop: 20 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#5b8eff', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
