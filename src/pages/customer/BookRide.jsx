import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Navigation, Car, Zap, Users, ChevronRight } from 'lucide-react';
import Button from '../../components/common/Button';

const rideTypes = [
  { id: 'standard', label: 'Standard', icon: Car, desc: 'Sedan or Hatchback', eta: '5 min', fare: '₹115 – ₹20/km' },
  { id: 'premium', label: 'Premium', icon: Zap, desc: 'SUV or Premium Sedan', eta: '8 min', fare: '₹122 – ₹28/km' },
  { id: 'pool', label: 'Pool', icon: Users, desc: 'Share & save', eta: '12 min', fare: '₹110 – ₹13/km' },
];

export default function BookRide() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};

  const [pickup, setPickup] = useState(initialState.pickup || '');
  const [destination, setDestination] = useState(initialState.destination || '');
  const [rideType, setRideType] = useState('standard');
  const [activeField, setActiveField] = useState(null);

  const handleProceed = () => {
    if (!pickup.trim() || !destination.trim()) return;
    navigate('/customer/confirm', {
      state: {
        pickup,
        destination,
        rideType,
        safeRideEnabled: initialState.safeRideEnabled,
      },
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-20 flex flex-col gap-8 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-[#f9fafb] tracking-tight">
          Book a Ride
        </h1>
        <p className="text-sm mt-0.5 text-[#9ca3af]">Enter your route to get started.</p>
      </div>

      {/* Route inputs */}
      <div className="relative flex flex-col p-6 bg-[#111827] border border-[#1f2937] rounded">
        <div className="relative flex flex-col gap-3">
          {/* Pickup row */}
          <div className="relative h-12">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
            </div>
            {/* Connector line: from bottom of pickup dot to top of destination dot */}
            <div
              className="absolute border-l-2 border-dashed border-[#374151] z-0"
              style={{ left: '18.75px', top: '50%', height: 'calc(100% + 12px)' }}
            />
            <input
              type="text"
              placeholder="Pickup location"
              value={pickup}
              onChange={e => setPickup(e.target.value)}
              onFocus={() => setActiveField('pickup')}
              className="w-full h-12 pl-[44px] pr-4 rounded text-sm bg-[#0a0d14] text-[#f9fafb] border border-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] transition-all"
            />
          </div>
          {/* Destination row */}
          <div className="relative h-12">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <Navigation size={14} className="text-[#2563eb]" />
            </div>
            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              onFocus={() => setActiveField('destination')}
              className="w-full h-12 pl-[44px] pr-4 rounded text-sm bg-[#0a0d14] text-[#f9fafb] border border-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Quick suggestions */}
      {activeField && (
        <div>
          <p className="text-xs font-medium uppercase tracking-wide mb-3 text-[#9ca3af]">
            Suggestions
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'IIIT Kottayam', sub: 'Pala Road, Kottayam' },
              { label: 'Kottayam Railway Station', sub: 'Baker Junction, Kottayam' },
              { label: 'Kottayam Medical College', sub: 'Gandhinagar, Kottayam' },
            ].map(s => (
              <button
                key={s.label}
                onClick={() => {
                  if (activeField === 'pickup') setPickup(s.label);
                  else setDestination(s.label);
                  setActiveField(null);
                }}
                className="flex items-center gap-4 w-full px-4 py-3.5 rounded text-left bg-[#111827] border border-[#1f2937] hover:bg-[#1f2937] hover:border-[#374151] transition-all"
              >
                <div className="w-10 h-10 rounded flex items-center justify-center shrink-0 bg-[#0a0d14]">
                  <MapPin size={16} className="text-[#6b7280]" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5 text-[#f9fafb]">{s.label}</p>
                  <p className="text-xs text-[#9ca3af]">{s.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ride type selector */}
      {pickup && destination && (
        <div className="animate-slide-up">
          <p className="text-xs font-medium uppercase tracking-wide mb-2 text-[#9ca3af]">
            Ride Type
          </p>
          <div className="flex flex-col gap-2">
            {rideTypes.map(({ id, label, icon: Icon, desc, eta, fare }) => {
              const active = rideType === id;
              return (
                <button
                  key={id}
                  onClick={() => setRideType(id)}
                  className={`flex items-center gap-4 w-full px-4 py-3.5 rounded text-left transition-all duration-150 ${
                    active 
                      ? 'bg-[#2563eb]/10 border border-[#2563eb]' 
                      : 'bg-[#111827] border border-[#1f2937] hover:border-[#374151]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded flex items-center justify-center shrink-0 ${active ? 'bg-[#2563eb]' : 'bg-[#1f2937]'}`}>
                    <Icon size={18} className={active ? 'text-white' : 'text-[#9ca3af]'} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${active ? 'text-white' : 'text-[#f9fafb]'}`}>{label}</p>
                    <p className="text-xs text-[#9ca3af]">{desc}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-medium ${active ? 'text-white' : 'text-[#f9fafb]'}`}>{fare}</p>
                    <p className="text-xs text-[#9ca3af]">{eta}</p>
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
