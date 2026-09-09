import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin, Navigation, Clock, Car, ShieldCheck, ChevronRight, Edit3,
} from 'lucide-react';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { useApi, apiPost } from '../../hooks/useApi';

const driverOptions = [
  { id: 'any',      label: 'Any Available Driver',   desc: 'Fastest match' },
  { id: 'verified', label: 'Verified Drivers Only',  desc: 'SafeRide preference' },
  { id: 'rated',    label: 'Top Rated (4.5★+)',      desc: 'Highest-rated drivers' },
];

const glass = {
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 4,
  padding: 20,
};

const fareConfigs = {
  standard: { base: 40, ride: 280, total: 320, eta: '5 min', label: 'Standard' },
  premium: { base: 60, ride: 390, total: 450, eta: '8 min', label: 'Premium' },
  pool: { base: 30, ride: 190, total: 220, eta: '12 min', label: 'Pool' },
};

export default function RideConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {
    pickup: 'IIIT Kottayam',
    destination: 'Kottayam Railway Station',
    rideType: 'standard',
  };

  const { data: profile } = useApi('/api/users/me');
  const [driverPref, setDriverPref] = useState(
    state.safeRideEnabled === 0 ? 'any' : 'verified'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (state.safeRideEnabled !== undefined) {
      setDriverPref(state.safeRideEnabled ? 'verified' : 'any');
    } else if (profile && profile.safeRideEnabled !== undefined) {
      setDriverPref(profile.safeRideEnabled ? 'verified' : 'any');
    }
  }, [profile, state.safeRideEnabled]);

  const selectedType = state.rideType || 'standard';
  const fare = fareConfigs[selectedType] || fareConfigs.standard;
  const isSafeRide = driverPref === 'verified';

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiPost('/api/bookings/request', {
        pickup: state.pickup,
        destination: state.destination,
        rideType: fare.label,
        baseFare: fare.base,
        rideFare: fare.ride,
        total: fare.total,
        distance: '12.4 km',
        eta: fare.eta,
        safeRideEnabled: isSafeRide ? 1 : 0,
      });

      if (res?.booking?.id) {
        navigate(`/customer/ride/${res.booking.id}`);
      } else {
        navigate('/customer/dashboard');
      }
    } catch (err) {
      console.error('Failed to request ride:', err);
      setError(err.message || 'Failed to request ride. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto mt-6 gap-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
          Confirm Your Ride
        </h1>
        <p className="text-sm mt-0.5" style={{ color: '#9ca3af' }}>Review details before booking.</p>
      </div>

      {/* Route summary */}
      <div style={glass}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: '#111827', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <MapPin size={14} style={{ color: '#16a34a' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: '#9ca3af' }}>Pickup</p>
              <p className="text-sm font-semibold" style={{ color: '#f9fafb' }}>{state.pickup}</p>
            </div>
          </div>
          <div className="ml-4 border-l-2 border-dashed h-4" style={{ borderColor: '#1f2937' }} />
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: '#111827', border: '1px solid rgba(79,126,255,0.2)' }}
            >
              <Navigation size={14} style={{ color: '#2563eb' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: '#9ca3af' }}>Destination</p>
              <p className="text-sm font-semibold" style={{ color: '#f9fafb' }}>{state.destination}</p>
            </div>
          </div>
        </div>

        <div
          className="flex gap-4 mt-4 pt-4"
          style={{ borderTop: '1px solid #1f2937' }}
        >
          {[
            { icon: Clock, text: '~28 min' },
            { icon: Car, text: '12.4 km' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs" style={{ color: '#9ca3af' }}>
              <Icon size={13} />
              {text}
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: isSafeRide ? '#16a34a' : '#9ca3af' }}>
            <ShieldCheck size={13} />
            {isSafeRide ? 'SafeRide Active' : 'SafeRide Off'}
          </div>
        </div>
      </div>

      {/* Fare breakdown */}
      <div style={glass}>
        <h2 className="text-sm font-semibold mb-3" style={{ color: '#f9fafb' }}>Fare Estimate</h2>
        <div className="flex flex-col gap-2">
          {[
            { label: 'Base fare', value: fare.base },
            { label: 'Ride fare (12.4 km)', value: fare.ride },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span className="text-sm" style={{ color: '#9ca3af' }}>{label}</span>
              <span className="text-sm" style={{ color: '#e5e7eb' }}>{formatCurrency(value)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-2" style={{ borderTop: '1px solid #1f2937' }}>
            <span className="text-sm font-semibold" style={{ color: '#f9fafb' }}>Total</span>
            <span className="text-base font-bold" style={{ color: '#f9fafb' }}>
              {formatCurrency(fare.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Driver preference */}
      <div style={glass}>
        <h2 className="text-sm font-semibold mb-3" style={{ color: '#f9fafb' }}>Driver Preference</h2>
        <div className="flex flex-col gap-2">
          {driverOptions.map(({ id, label, desc }) => {
            const active = driverPref === id;
            return (
              <button
                key={id}
                onClick={() => setDriverPref(id)}
                className="flex items-center justify-between w-full px-3.5 py-3 rounded text-left transition-all duration-150"
                style={{
                  background: active ? 'rgba(79,126,255,0.1)' : 'transparent',
                  border: active ? '1px solid rgba(79,126,255,0.3)' : '1px solid #1f2937',
                }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: '#f9fafb' }}>{label}</p>
                  <p className="text-xs" style={{ color: '#9ca3af' }}>{desc}</p>
                </div>
                <div
                  className="w-4 h-4 rounded-full border-2 transition-all duration-150 flex items-center justify-center"
                  style={{
                    borderColor: active ? '#2563eb' : '#4b5563',
                    background: active ? '#2563eb' : 'transparent',
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
        className="flex items-center gap-2 px-4 py-3 rounded"
        style={{ background: '#111827', border: '1px solid rgba(79,126,255,0.15)' }}
      >
        <Clock size={16} style={{ color: '#2563eb' }} />
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Driver will arrive in approximately <span style={{ fontWeight: 600, color: '#f9fafb' }}>5 minutes</span>
        </p>
      </div>

      {/* Error display */}
      {error && (
        <div className="p-3 rounded text-sm bg-red-950/50 border border-red-800 text-red-300">
          {error}
        </div>
      )}

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
