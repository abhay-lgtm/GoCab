import { Link } from 'react-router-dom';
import { Car, ShieldCheck, MapPin, ChevronRight, Activity } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-[#f9fafb] selection:bg-[#2563eb] selection:text-white flex flex-col font-sans">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 h-16 border-b border-[#1f2937] bg-[#0a0d14] z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">GoCab</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-[#9ca3af] hover:text-[#f9fafb] transition-colors">
              Sign in
            </Link>
            <Link to="/register" className="px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium rounded transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Reliable rides, <br /> on your terms
          </h1>
          <p className="text-xl text-[#9ca3af] max-w-2xl mx-auto">
            Experience the next generation of ride-hailing. Built for safety, speed, and reliability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-base font-medium rounded flex items-center justify-center gap-2 transition-colors">
              Book a Ride
              <ChevronRight size={18} />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb]/10 text-base font-medium rounded flex items-center justify-center transition-colors">
              Sign In
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-5xl mx-auto mt-24 border-y border-[#1f2937] py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">50k+</div>
              <div className="text-sm text-[#9ca3af]">Active Riders</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">10k+</div>
              <div className="text-sm text-[#9ca3af]">Verified Drivers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">4.9/5</div>
              <div className="text-sm text-[#9ca3af]">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-5xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why choose GoCab?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Car, title: 'Quick Pickups', desc: 'Average wait time under 5 minutes in busy areas.' },
              { icon: ShieldCheck, title: 'Safe Rides', desc: 'SOS features, verified drivers, and live tracking.' },
              { icon: MapPin, title: 'Smart Routing', desc: 'Optimized routes to get you there faster.' },
              { icon: Activity, title: '24/7 Support', desc: 'Our team is always here to help you.' },
            ].map((f, i) => (
              <div key={i} className="p-6 bg-[#111827] border border-[#1f2937] rounded flex flex-col items-start gap-4">
                <div className="p-2 bg-[#2563eb]/10 text-[#2563eb] rounded">
                  <f.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-[#9ca3af] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1f2937] bg-[#0a0d14] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xl font-bold text-white">GoCab</div>
          <p className="text-sm text-[#6b7280]">© 2024 GoCab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
