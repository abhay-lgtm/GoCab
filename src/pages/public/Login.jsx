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
    const result = await login({ email, password, role });
    setLoading(false);
    if (!result.success) { setError(result.error); return; }
    navigate(result.dashboard, { replace: true });
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
            "Every great journey starts with a single tap."
          </blockquote>
          <p className="text-[#9ca3af] text-sm">
            Smart rides. Safer journeys. Trusted by 50,000+ riders across Kerala.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {['A', 'P', 'R', 'S'].map((l, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-[#111827] bg-[#1f2937]"
              >
                {l}
              </div>
            ))}
          </div>
          <p className="text-[#6b7280] text-xs">50K+ riders trust GoCab</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center bg-[#0a0d14]">
        <div className="w-full max-w-lg mx-auto px-6 py-10 lg:py-16">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link to="/" className="flex items-center gap-2 text-white no-underline">
              <span className="text-xl font-bold tracking-tight">GoCab</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-[#9ca3af] mb-8">
            Sign in to your account to continue.
          </p>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setRole(id); setError(''); }}
                className={`flex flex-col items-center gap-2 p-3 rounded border transition-all duration-150 ${
                  role === id
                    ? 'bg-[#2563eb] text-white border-[#2563eb]'
                    : 'bg-[#111827] text-[#9ca3af] border-[#1f2937] hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="text-xs font-semibold">{label}</span>
              </button>
            ))}
          </div>

          {/* Demo hint */}
          <div className="flex items-center justify-between bg-[#111827] border border-[#1f2937] rounded p-3 mb-6">
            <p className="text-xs text-[#9ca3af]">
              Demo: <span className="font-mono text-[#2563eb]">{hints[role].email}</span>
            </p>
            <button
              onClick={handleFill}
              className="text-xs font-semibold text-[#2563eb] hover:underline"
            >
              Fill
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <div className="relative">
              <Input
                label="Password"
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Your password"
                icon={Lock}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-[#9ca3af] hover:text-white focus:outline-none"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-[#dc2626] bg-[#dc2626]/10 border border-[#dc2626]/20 rounded p-2">
                {error}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-[#2563eb] hover:underline"
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

          <p className="text-center text-sm text-[#9ca3af] mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-[#2563eb] font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
