import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronRight, Car, User, Settings } from 'lucide-react';
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
  driver: { email: 'rajesh@example.com', password: 'password123' },
  admin: { email: 'admin@ridesphere.in', password: 'admin123' },
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
    await new Promise(r => setTimeout(r, 600)); // simulate async
    const result = login({ email, password, role });
    setLoading(false);
    if (!result.success) { setError(result.error); return; }
    navigate(result.dashboard, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[46%] bg-[#0a0f1e] flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2.5">
          <RideSphereLogoMark size={30} />
          <span className="text-lg font-bold text-white">
            Ride<span className="text-[#3b6ef8]">Sphere</span>
          </span>
        </Link>

        <div>
          <blockquote className="text-2xl font-semibold text-white leading-snug mb-4">
            "Every great journey starts with a single tap."
          </blockquote>
          <p className="text-white/40 text-sm">
            Smart rides. Safer journeys. Trusted by 50,000+ riders across Kerala.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {['A', 'P', 'R', 'S'].map((l, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: ['#3b6ef8', '#10b981', '#6366f1', '#f59e0b'][i] }}
            >
              {l}
            </div>
          ))}
          <p className="text-white/40 text-xs">50K+ riders trust RideSphere</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-[#f8f9fc]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <RideSphereLogoMark size={26} />
              <span className="text-base font-bold text-[#0a0f1e]">
                Ride<span className="text-[#3b6ef8]">Sphere</span>
              </span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-[#0a0f1e] mb-1.5">Welcome back</h1>
          <p className="text-sm text-[#4b5563] mb-7">Sign in to your account to continue.</p>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setRole(id); setError(''); }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b6ef8]
                  ${role === id
                    ? 'border-[#3b6ef8] bg-[#3b6ef8]/5 text-[#3b6ef8]'
                    : 'border-[#e4e8f0] bg-white text-[#4b5563] hover:border-[#3b6ef8]/40'
                  }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          {/* Demo hint */}
          <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5 mb-5">
            <p className="text-xs text-[#3b6ef8]">
              Demo: <span className="font-mono">{hints[role].email}</span>
            </p>
            <button
              onClick={handleFill}
              className="text-xs font-semibold text-[#3b6ef8] underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Fill
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-[#3b6ef8] hover:underline"
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

          <p className="text-center text-sm text-[#4b5563] mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#3b6ef8] font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
