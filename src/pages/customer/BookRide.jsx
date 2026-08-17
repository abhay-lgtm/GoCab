import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Navigation, Car, Zap, Users, ChevronRight } from 'lucide-react';
import Button from '../../components/common/Button';

const rideTypes = [
  { id: 'standard', label: 'Standard', icon: Car, desc: 'Sedan or Hatchback', eta: '5 min', fare: '₹15–20/km' },
  { id: 'premium', label: 'Premium', icon: Zap, desc: 'SUV or Premium Sedan', eta: '8 min', fare: '₹22–28/km' },
  { id: 'pool', label: 'Pool', icon: Users, desc: 'Share & save', eta: '12 min', fare: '₹10–13/km' },
];

export default function BookRide() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};

  const [pickup, setPickup] = useState(initialState.pickup || '');
  const [destination, setDestination] = useState(initialState.destination || '');
  const [rideType, setRideType] = useState('standard');

  const handleProceed = () => {
    if (!pickup.trim() || !destination.trim()) return;
    navigate('/customer/confirm', {
      state: { pickup, destination, rideType },
    });
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0a0f1e]">Book a Ride</h1>
        <p className="text-sm text-[#9ca3af] mt-0.5">Enter your route to get started.</p>
      </div>

      {/* Route inputs */}
      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5 space-y-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] border-2 border-white shadow" />
          </div>
          <input
            type="text"
            placeholder="Pickup location"
            value={pickup}
            onChange={e => setPickup(e.target.value)}
            className="w-full h-12 pl-8 pr-4 rounded-xl border border-[#e4e8f0] text-sm focus:outline-none focus:border-[#3b6ef8] focus:ring-2 focus:ring-[#3b6ef8]/10 transition-all"
          />
        </div>
        <div className="ml-3.5 h-4 border-l-2 border-dashed border-[#e4e8f0]" />
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Navigation size={13} className="text-[#3b6ef8]" />
          </div>
          <input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            className="w-full h-12 pl-8 pr-4 rounded-xl border border-[#e4e8f0] text-sm focus:outline-none focus:border-[#3b6ef8] focus:ring-2 focus:ring-[#3b6ef8]/10 transition-all"
          />
        </div>
      </div>

      {/* Quick suggestions */}
      <div>
        <p className="text-xs font-medium text-[#9ca3af] uppercase tracking-wide mb-2">Suggestions</p>
        <div className="space-y-1.5">
          {[
            { label: 'IIIT Kottayam', sub: 'Pala Road, Kottayam' },
            { label: 'Kottayam Railway Station', sub: 'Baker Junction, Kottayam' },
            { label: 'Kottayam Medical College', sub: 'Gandhinagar, Kottayam' },
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setDestination(s.label)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white border border-[#e4e8f0] text-left hover:border-[#3b6ef8]/30 hover:bg-[#f8f9fc] transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-[#f0f2f8] flex items-center justify-center shrink-0">
                <MapPin size={14} className="text-[#9ca3af]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0a0f1e]">{s.label}</p>
                <p className="text-xs text-[#9ca3af]">{s.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ride type selector */}
      {pickup && destination && (
        <div className="animate-slide-up">
          <p className="text-xs font-medium text-[#9ca3af] uppercase tracking-wide mb-2">Ride Type</p>
          <div className="space-y-2">
            {rideTypes.map(({ id, label, icon: Icon, desc, eta, fare }) => (
              <button
                key={id}
                onClick={() => setRideType(id)}
                className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl border text-left transition-all duration-150
                  ${rideType === id ? 'border-[#3b6ef8] bg-[#3b6ef8]/5' : 'border-[#e4e8f0] bg-white hover:border-[#3b6ef8]/30'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${rideType === id ? 'bg-[#3b6ef8]' : 'bg-[#f0f2f8]'}`}>
                  <Icon size={18} className={rideType === id ? 'text-white' : 'text-[#9ca3af]'} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#0a0f1e]">{label}</p>
                  <p className="text-xs text-[#9ca3af]">{desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-[#0a0f1e]">{fare}</p>
                  <p className="text-xs text-[#9ca3af]">{eta}</p>
                </div>
              </button>
            ))}
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
