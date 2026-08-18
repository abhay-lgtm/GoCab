import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Navigation, Car, Zap, Users, ChevronRight } from 'lucide-react';
import Button from '../../components/common/Button';

const rideTypes = [
  { id: 'standard', label: 'Standard', icon: Car, desc: 'Sedan or Hatchback', eta: '5 min', fare: '₹115 – ₹20/km' },
  { id: 'premium',  label: 'Premium',  icon: Zap, desc: 'SUV or Premium Sedan', eta: '8 min', fare: '₹122 – ₹28/km' },
  { id: 'pool',     label: 'Pool',     icon: Users, desc: 'Share & save', eta: '12 min', fare: '₹110 – ₹13/km' },
];

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
};

export default function BookRide() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};

  const [pickup, setPickup] = useState(initialState.pickup || '');
  const [destination, setDestination] = useState(initialState.destination || '');
  const [rideType, setRideType] = useState('standard');

  const handleProceed = () => {
    if (!pickup.trim() || !destination.trim()) return;
    navigate('/customer/confirm', { state: { pickup, destination, rideType } });
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.09)',
    color: 'rgba(255,255,255,0.85)',
    outline: 'none',
    width: '100%',
    height: 48,
    borderRadius: 12,
    fontSize: 14,
    paddingLeft: 32,
    paddingRight: 16,
    transition: 'border-color 0.15s',
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
          Book a Ride
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Enter your route to get started.</p>
      </div>

      {/* Route inputs */}
      <div style={{ ...glass, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] border-2 border-white/10 shadow" />
          </div>
          <input
            type="text"
            placeholder="Pickup location"
            value={pickup}
            onChange={e => setPickup(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div className="ml-3.5 h-4 border-l-2 border-dashed" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Navigation size={13} style={{ color: '#5b8eff' }} />
          </div>
          <input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Quick suggestions */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Suggestions
        </p>
        <div className="space-y-1.5">
          {[
            { label: 'IIIT Kottayam', sub: 'Pala Road, Kottayam' },
            { label: 'Kottayam Railway Station', sub: 'Baker Junction, Kottayam' },
            { label: 'Kottayam Medical College', sub: 'Gandhinagar, Kottayam' },
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setDestination(s.label)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.borderColor = 'rgba(79,126,255,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <MapPin size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{s.label}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ride type selector */}
      {pickup && destination && (
        <div className="animate-slide-up">
          <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Ride Type
          </p>
          <div className="space-y-2">
            {rideTypes.map(({ id, label, icon: Icon, desc, eta, fare }) => {
              const active = rideType === id;
              return (
                <button
                  key={id}
                  onClick={() => setRideType(id)}
                  className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-left transition-all duration-150"
                  style={{
                    background: active ? 'rgba(79,126,255,0.12)' : 'rgba(255,255,255,0.04)',
                    border: active ? '1px solid rgba(79,126,255,0.35)' : '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: active ? '#4f7eff' : 'rgba(255,255,255,0.07)' }}
                  >
                    <Icon size={18} style={{ color: active ? '#fff' : 'rgba(255,255,255,0.3)' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>{label}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{fare}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{eta}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <Button
        variant="primary"
        fullWidth
        size="lg"
        onClick={handleProceed}
        disabled={!pickup.trim() || !destination.trim()}
      >
        Confirm Route
        <ChevronRight size={18} />
      </Button>
    </div>
  );
}
