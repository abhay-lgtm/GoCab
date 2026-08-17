import { Link, useNavigate } from 'react-router-dom';
import {
  Car, ShieldCheck, Mic, MapPin, Star, ChevronRight,
  CheckCircle, Zap, Clock, Navigation,
} from 'lucide-react';
import Navbar, { RideSphereLogoMark } from '../../components/layout/Navbar';
import Button from '../../components/common/Button';

const features = [
  {
    icon: Zap,
    title: 'Instant Booking',
    desc: 'Book a reliable cab in under 30 seconds. No waiting, no hassle.',
    color: 'text-[#3b6ef8]',
    bg: 'bg-blue-50',
  },
  {
    icon: ShieldCheck,
    title: 'SafeRide Mode',
    desc: 'Travel with verified drivers, live trip sharing, and one-tap SOS.',
    color: 'text-[#10b981]',
    bg: 'bg-emerald-50',
  },
  {
    icon: Mic,
    title: 'Voice Booking',
    desc: 'Just speak your destination. Our AI handles the rest.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    icon: Clock,
    title: 'Real-Time Tracking',
    desc: 'Track your ride live and share your trip with loved ones.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

const stats = [
  { label: 'Happy Riders', value: '50K+' },
  { label: 'Verified Drivers', value: '1,200+' },
  { label: 'Cities Covered', value: '24' },
  { label: 'Avg. Rating', value: '4.8 ★' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 sm:px-6 bg-gradient-to-b from-[#f0f4ff] to-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3b6ef8]/10 text-[#3b6ef8] text-xs font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b6ef8]" />
                Smart rides. Safer journeys.
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0a0f1e] leading-tight tracking-tight mb-6">
                Your journey,
                <span className="text-[#3b6ef8]"> simplified.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#4b5563] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Book reliable rides in seconds, travel with confidence, and stay connected every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Book a Ride
                  <ChevronRight size={18} />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/customer/saferide')}
                >
                  <ShieldCheck size={18} className="text-[#10b981]" />
                  Explore SafeRide
                </Button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-2 mt-6 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {['A', 'P', 'R', 'S'].map((l, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: ['#3b6ef8', '#10b981', '#6366f1', '#f59e0b'][i] }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#4b5563]">
                  <span className="font-semibold text-[#0a0f1e]">50,000+</span> happy riders
                </p>
              </div>
            </div>

            {/* Visual card */}
            <div className="flex-1 w-full max-w-sm">
              <div className="relative bg-[#0a0f1e] rounded-3xl p-6 shadow-2xl shadow-[#0a0f1e]/20">
                {/* Map mock */}
                <div className="rounded-2xl bg-[#1e2a3a] h-44 mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 map-grid opacity-40" />
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 176" preserveAspectRatio="xMidYMid slice">
                    <path d="M40 150 Q100 120 140 90 Q180 60 240 30" stroke="#3b6ef8" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M40 150 Q100 120 140 90 Q180 60 240 30" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="6 10" strokeLinecap="round" opacity="0.5" />
                    <circle cx="120" cy="100" r="6" fill="#3b6ef8" />
                    <circle cx="120" cy="100" r="12" fill="#3b6ef8" opacity="0.25" />
                  </svg>
                  {/* Destination pin */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-xl px-2.5 py-1.5">
                    <Navigation size={11} className="text-[#3b6ef8]" />
                    <span className="text-white text-[10px] font-medium">Kottayam Stn.</span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-xl px-2.5 py-1.5">
                    <MapPin size={11} className="text-[#10b981]" />
                    <span className="text-white text-[10px] font-medium">IIIT Kottayam</span>
                  </div>
                </div>

                {/* Driver info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#3b6ef8] flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-white">R</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Rajesh Kumar</p>
                    <p className="text-xs text-white/50">Hyundai i20 · KL 07 AX 4521</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-semibold text-white">4.8</span>
                    </div>
                    <p className="text-[10px] text-white/40">5 min away</p>
                  </div>
                </div>

                {/* SafeRide badge */}
                <div className="flex items-center gap-2 bg-emerald-500/10 rounded-xl px-3 py-2">
                  <ShieldCheck size={14} className="text-[#10b981]" />
                  <span className="text-xs font-medium text-[#10b981]">SafeRide Active</span>
                  <CheckCircle size={12} className="text-[#10b981] ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-[#e4e8f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[#0a0f1e]">{value}</p>
                <p className="text-sm text-[#9ca3af] mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0a0f1e] mb-3">
              Everything you need, nothing you don't.
            </h2>
            <p className="text-[#4b5563] max-w-lg mx-auto">
              RideSphere is designed around what matters — your safety, comfort, and time.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="p-5 rounded-2xl border border-[#e4e8f0] hover:border-[#3b6ef8]/30 hover:shadow-sm bg-white transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="text-sm font-semibold text-[#0a0f1e] mb-1.5">{title}</h3>
                <p className="text-xs text-[#4b5563] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SafeRide Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-emerald-50 to-[#f0f4ff]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-[#10b981] text-xs font-semibold mb-4">
                <ShieldCheck size={13} />
                SafeRide
              </div>
              <h2 className="text-3xl font-bold text-[#0a0f1e] mb-4">
                Travel with an extra layer of protection.
              </h2>
              <p className="text-[#4b5563] mb-6 leading-relaxed">
                Enable SafeRide Mode and ride with confidence. Our intelligent safety system connects you with verified drivers, shares your trip in real time, and keeps emergency help one tap away.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Verified driver matching',
                  'Live trip sharing with emergency contacts',
                  'One-tap SOS with location broadcast',
                  'Instant admin and contact notification',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle size={16} className="text-[#10b981] shrink-0" />
                    <span className="text-sm text-[#0a0f1e]">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register">
                <Button variant="safety" size="lg">
                  Get Started with SafeRide
                </Button>
              </Link>
            </div>
            <div className="flex-1 w-full max-w-xs">
              <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-[#10b981] flex items-center justify-center">
                    <ShieldCheck size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a0f1e]">SafeRide Active</p>
                    <p className="text-xs text-[#10b981]">All protections enabled</p>
                  </div>
                </div>
                {['Rajesh Kumar — Verified ✓', 'Mom notified · +91 98765 43210', 'SOS ready · Admin monitoring'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-2.5 border-b border-[#f0f2f8] last:border-0">
                    <CheckCircle size={14} className="text-[#10b981] shrink-0" />
                    <span className="text-xs text-[#0a0f1e]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Booking Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold mb-4">
                <Mic size={13} />
                Voice Booking
              </div>
              <h2 className="text-3xl font-bold text-[#0a0f1e] mb-4">
                Book a ride with your voice.
              </h2>
              <p className="text-[#4b5563] mb-6 leading-relaxed">
                Just say where you're going. RideSphere understands your destination and books a ride — no typing, no tapping, just speak.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Say "Kottayam Railway Station" to book instantly',
                  'Automatic pickup detection',
                  'Edit or confirm with one tap',
                  'Works in English and regional accents',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle size={16} className="text-indigo-500 shrink-0" />
                    <span className="text-sm text-[#0a0f1e]">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/customer/voice-booking">
                <Button variant="outline" size="lg">
                  <Mic size={18} />
                  Try Voice Booking
                </Button>
              </Link>
            </div>
            <div className="flex-1 w-full max-w-xs">
              <div className="bg-[#0a0f1e] rounded-2xl p-6 text-center">
                <p className="text-sm text-white/50 mb-6">Where would you like to go?</p>
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
                  <div className="absolute inset-2 rounded-full bg-indigo-500/30" />
                  <div className="absolute inset-4 rounded-full bg-indigo-600 flex items-center justify-center">
                    <Mic size={20} className="text-white" />
                  </div>
                </div>
                <p className="text-xs text-white/30 mb-4">Tap to speak</p>
                <div className="bg-white/5 rounded-xl p-3 text-left space-y-2">
                  <div>
                    <p className="text-[10px] text-white/40">Pickup</p>
                    <p className="text-xs font-medium text-white">IIIT Kottayam</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40">Destination</p>
                    <p className="text-xs font-medium text-white">Kottayam Railway Station</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 bg-[#0a0f1e]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <RideSphereLogoMark size={48} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to ride smarter?
          </h2>
          <p className="text-white/50 mb-8 text-base">
            Join 50,000+ riders who trust RideSphere for every journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register">
              <Button variant="primary" size="lg">
                Create Your Account
                <ChevronRight size={18} />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#05091a] border-t border-white/5 py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <RideSphereLogoMark size={22} />
            <span className="text-sm font-bold text-white/70">
              Ride<span className="text-[#3b6ef8]">Sphere</span>
            </span>
          </div>
          <p className="text-xs text-white/30 text-center">
            © 2024 RideSphere. Smart rides. Safer journeys. · University Software Architecture Project
          </p>
          <div className="flex items-center gap-4">
            {['Safety', 'Privacy', 'Terms'].map((item) => (
              <button key={item} className="text-xs text-white/30 hover:text-white/60 transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
