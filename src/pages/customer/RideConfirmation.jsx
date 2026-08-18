import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin, Navigation, Clock, Car, ShieldCheck, ChevronRight, Edit3,
} from 'lucide-react';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';

const driverOptions = [
  { id: 'any',      label: 'Any Available Driver',   desc: 'Fastest match' },
  { id: 'verified', label: 'Verified Drivers Only',  desc: 'SafeRide preference' },
  { id: 'rated',    label: 'Top Rated (4.5★+)',      desc: 'Highest-rated drivers' },
];

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  padding: 20,
};

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
    <div className="w-full max-w-xl mx-auto mt-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
          Confirm Your Ride
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Review details before booking.</p>
      </div>

      {/* Route summary */}
      <div style={glass}>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <MapPin size={14} style={{ color: '#10b981' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Pickup</p>
              <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>{state.pickup}</p>
            </div>
          </div>
          <div className="ml-4 border-l-2 border-dashed h-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'rgba(79,126,255,0.15)', border: '1px solid rgba(79,126,255,0.2)' }}
            >
              <Navigation size={14} style={{ color: '#5b8eff' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Destination</p>
              <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>{state.destination}</p>
            </div>
          </div>
        </div>

        <div
          className="flex gap-4 mt-4 pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          {[
            { icon: Clock, text: '~28 min' },
            { icon: Car, text: '12.4 km' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <Icon size={13} />
              {text}
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#10b981' }}>
            <ShieldCheck size={13} />
            SafeRide Active
          </div>
        </div>
      </div>

      {/* Fare breakdown */}
      <div style={glass}>
        <h2 className="text-sm font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.85)' }}>Fare Estimate</h2>
        <div className="space-y-2">
          {[
            { label: 'Base fare', value: fare.base },
            { label: 'Ride fare (12.4 km)', value: fare.ride },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{formatCurrency(value)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>Total</span>
            <span className="text-base font-bold" style={{ color: 'rgba(255,255,255,0.95)' }}>
              {formatCurrency(fare.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Driver preference */}
      <div style={glass}>
        <h2 className="text-sm font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.85)' }}>Driver Preference</h2>
        <div className="space-y-2">
          {driverOptions.map(({ id, label, desc }) => {
            const active = driverPref === id;
            return (
              <button
                key={id}
                onClick={() => setDriverPref(id)}
                className="flex items-center justify-between w-full px-3.5 py-3 rounded-xl text-left transition-all duration-150"
                style={{
                  background: active ? 'rgba(79,126,255,0.1)' : 'transparent',
                  border: active ? '1px solid rgba(79,126,255,0.3)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{label}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{desc}</p>
                </div>
                <div
                  className="w-4 h-4 rounded-full border-2 transition-all duration-150 flex items-center justify-center"
                  style={{
                    borderColor: active ? '#4f7eff' : 'rgba(255,255,255,0.2)',
                    background: active ? '#4f7eff' : 'transparent',
                  }}
                >
                  {active && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ETA */}
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-xl"
        style={{ background: 'rgba(79,126,255,0.08)', border: '1px solid rgba(79,126,255,0.15)' }}
      >
        <Clock size={16} style={{ color: '#5b8eff' }} />
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Driver will arrive in approximately <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>5 minutes</span>
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
