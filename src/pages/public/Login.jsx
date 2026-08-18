import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronRight, Car, User, Settings, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RideSphereLogoMark } from '../../components/layout/Navbar';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const roles = [
  { id: 'customer', label: 'Customer', icon: User, desc: 'Book rides & travel safely' },
  { id: 'driver', label: 'Driver', icon: Car, desc: 'Accept rides & earn' },
  { id: 'admin', label: 'Admin', icon: Settings, desc: 'Manage the platform' },
];

// Demo hints
const hints = {
  customer: { email: 'abhay@example.com', password: 'password123' },
  driver:   { email: 'rajesh@example.com', password: 'password123' },
  admin:    { email: 'admin@ridesphere.in', password: 'admin123' },
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFill = () => {
    const h = hints[role];
    setEmail(h.email);
    setPassword(h.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login({ email, password, role });
    setLoading(false);
    if (!result.success) { setError(result.error); return; }
    navigate(result.dashboard, { replace: true });
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ background: '#05091a', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-[46%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: '#07091f', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Decorative glows */}
        <div style={{
          position: 'absolute', top: -150, left: -150, width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(79,126,255,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, right: -100, width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(79,126,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,126,255,0.03) 1px, transparent 1px)',
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
          <blockquote style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 16, letterSpacing: '-0.02em' }}>
            "Every great journey starts with a single tap."
          </blockquote>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14 }}>
            Smart rides. Safer journeys. Trusted by 50,000+ riders across Kerala.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
          {['A', 'P', 'R', 'S'].map((l, i) => (
            <div
              key={i}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#fff',
                background: ['rgba(79,126,255,0.7)', 'rgba(16,185,129,0.7)', 'rgba(99,102,241,0.7)', 'rgba(245,158,11,0.7)'][i],
              }}
            >
              {l}
            </div>
          ))}
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>50K+ riders trust RideSphere</p>
        </div>
      </div>

      {/* Right panel */}
      <div
        className="flex-1 flex items-center justify-center p-6 sm:p-10"
        style={{ background: '#05091a' }}
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <RideSphereLogoMark size={26} />
              <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>
                Ride<span style={{ color: '#5b8eff' }}>Sphere</span>
              </span>
            </Link>
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 6, letterSpacing: '-0.02em' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>
            Sign in to your account to continue.
          </p>

          {/* Role selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
            {roles.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setRole(id); setError(''); }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  padding: '12px 8px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 600, transition: 'all 0.15s',
                  background: role === id ? 'rgba(79,126,255,0.15)' : 'rgba(255,255,255,0.04)',
                  color: role === id ? '#5b8eff' : 'rgba(255,255,255,0.45)',
                  outline: role === id ? '1px solid rgba(79,126,255,0.4)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          {/* Demo hint */}
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'rgba(79,126,255,0.08)', border: '1px solid rgba(79,126,255,0.2)',
              borderRadius: 12, padding: '10px 14px', marginBottom: 20,
            }}
          >
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              Demo: <span style={{ fontFamily: 'monospace', color: '#5b8eff' }}>{hints[role].email}</span>
            </p>
            <button
              onClick={handleFill}
              style={{
                fontSize: 12, fontWeight: 600, color: '#5b8eff',
                background: 'none', border: 'none', cursor: 'pointer',
                textDecoration: 'underline', textUnderlineOffset: 2,
              }}
            >
              Fill
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input
              label="Email or Phone"
              id="login-email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              label="Password"
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password"
              icon={Lock}
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              iconRight={showPassword ? EyeOff : Eye}
            />

            {error && (
              <p
                style={{
                  fontSize: 13, color: '#f87171',
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: 10, padding: '8px 12px',
                }}
              >
                {error}
              </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                style={{ fontSize: 12, color: '#5b8eff', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => alert('Password reset not implemented in demo.')}
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
              Sign In
              <ChevronRight size={18} />
            </Button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,0.35)', marginTop: 20 }}>
            Don&apos;t have an account?{' '}
            <Link to="/register" style={{ color: '#5b8eff', fontWeight: 600, textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
