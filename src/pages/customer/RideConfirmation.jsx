import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin, Navigation, Clock, Car, ShieldCheck, ChevronRight, Edit3,
} from 'lucide-react';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';

const driverOptions = [
  { id: 'any', label: 'Any Available Driver', desc: 'Fastest match' },
  { id: 'verified', label: 'Verified Drivers Only', desc: 'SafeRide preference' },
  { id: 'rated', label: 'Top Rated (4.5★+)', desc: 'Highest-rated drivers' },
];

export default function RideConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {
    pickup: 'IIIT Kottayam',
    destination: 'Kottayam Railway Station',
    rideType: 'standard',
  };

  const [driverPref, setDriverPref] = useState('verified');
  const [loading, setLoading] = useState(false);

  const fare = { base: 40, ride: 280, total: 320 };

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('/customer/ride/r5');
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#0a0f1e]">Confirm Your Ride</h1>
        <p className="text-sm text-[#9ca3af] mt-0.5">Review details before booking.</p>
      </div>

      {/* Route summary */}
      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <MapPin size={14} className="text-[#10b981]" />
            </div>
            <div>
              <p className="text-xs text-[#9ca3af]">Pickup</p>
              <p className="text-sm font-semibold text-[#0a0f1e]">{state.pickup}</p>
            </div>
          </div>
          <div className="ml-4 border-l-2 border-dashed border-[#e4e8f0] h-4" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
              <Navigation size={14} className="text-[#3b6ef8]" />
            </div>
            <div>
              <p className="text-xs text-[#9ca3af]">Destination</p>
              <p className="text-sm font-semibold text-[#0a0f1e]">{state.destination}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4 pt-4 border-t border-[#f0f2f8]">
          <div className="flex items-center gap-1.5 text-xs text-[#4b5563]">
            <Clock size={13} />
            ~28 min
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#4b5563]">
            <Car size={13} />
            12.4 km
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#0a0f1e]">
            <ShieldCheck size={13} className="text-[#10b981]" />
            SafeRide Active
          </div>
        </div>
      </div>

      {/* Fare breakdown */}
      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5">
        <h2 className="text-sm font-semibold text-[#0a0f1e] mb-3">Fare Estimate</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-[#4b5563]">Base fare</span>
            <span className="text-sm text-[#0a0f1e]">{formatCurrency(fare.base)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#4b5563]">Ride fare (12.4 km)</span>
            <span className="text-sm text-[#0a0f1e]">{formatCurrency(fare.ride)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#f0f2f8]">
            <span className="text-sm font-semibold text-[#0a0f1e]">Total</span>
            <span className="text-base font-bold text-[#0a0f1e]">{formatCurrency(fare.total)}</span>
          </div>
        </div>
      </div>

      {/* Driver preference */}
      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5">
        <h2 className="text-sm font-semibold text-[#0a0f1e] mb-3">Driver Preference</h2>
        <div className="space-y-2">
          {driverOptions.map(({ id, label, desc }) => (
            <button
              key={id}
              onClick={() => setDriverPref(id)}
              className={`flex items-center justify-between w-full px-3.5 py-3 rounded-xl border text-left transition-all duration-150
                ${driverPref === id ? 'border-[#3b6ef8] bg-[#3b6ef8]/5' : 'border-[#e4e8f0] hover:border-[#3b6ef8]/30'}`}
            >
              <div>
                <p className="text-sm font-medium text-[#0a0f1e]">{label}</p>
                <p className="text-xs text-[#9ca3af]">{desc}</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${driverPref === id ? 'border-[#3b6ef8] bg-[#3b6ef8]' : 'border-[#e4e8f0]'}`}>
                {driverPref === id && <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-0.5" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ETA */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#f0f2f8] rounded-xl">
        <Clock size={16} className="text-[#3b6ef8]" />
        <p className="text-sm text-[#0a0f1e]">
          Driver will arrive in approximately <span className="font-semibold">5 minutes</span>
        </p>
      </div>

      {/* CTAs */}
      <div className="flex gap-2">
        <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
          <Edit3 size={16} />
          Edit
        </Button>
        <Button variant="primary" fullWidth size="lg" onClick={handleConfirm} loading={loading}>
          Confirm Booking
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
}
