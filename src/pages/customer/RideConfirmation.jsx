import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin, Navigation, Clock, Car, ShieldCheck, ChevronRight, Edit3, Loader2,
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

// Per-km rates and base fares
const rateConfigs = {
  standard: { perKm: 22, base: 40, eta: '5 min', label: 'Standard' },
  premium:  { perKm: 30, base: 60, eta: '8 min', label: 'Premium' },
  pool:     { perKm: 14, base: 30, eta: '12 min', label: 'Pool' },
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

  // Distance + coords from ORS
  const [distanceKm, setDistanceKm] = useState(null);
  const [durationMin, setDurationMin] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [distLoading, setDistLoading] = useState(false);
  const [distError, setDistError] = useState(null);

  useEffect(() => {
    if (state.safeRideEnabled !== undefined) {
      setDriverPref(state.safeRideEnabled ? 'verified' : 'any');
    } else if (profile && profile.safeRideEnabled !== undefined) {
      setDriverPref(profile.safeRideEnabled ? 'verified' : 'any');
    }
  }, [profile, state.safeRideEnabled]);

  // Fetch real distance from ORS via backend
  useEffect(() => {
    if (!state.pickup || !state.destination) return;
    setDistLoading(true);
    setDistError(null);
    const token = localStorage.getItem('token');
    fetch(
      `/api/location/distance?pickup=${encodeURIComponent(state.pickup)}&dropoff=${encodeURIComponent(state.destination)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.distanceKm) {
          setDistanceKm(data.distanceKm);
          setDurationMin(data.durationMin);
          setPickupCoords(data.pickupCoords);
          setDropoffCoords(data.dropoffCoords);
        } else {
          setDistError(data.message || 'Could not fetch distance');
        }
      })
      .catch(() => setDistError('Distance fetch failed'))
      .finally(() => setDistLoading(false));
  }, [state.pickup, state.destination]);

  const selectedType = state.rideType || 'standard';
  const rates = rateConfigs[selectedType] || rateConfigs.standard;
  const isSafeRide = driverPref === 'verified';

  // Dynamic fare calculation
  const rideFare = distanceKm != null ? Math.round(distanceKm * rates.perKm) : null;
  const totalFare = rideFare != null ? rideFare + rates.base : null;

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiPost('/api/bookings/request', {
        pickup: state.pickup,
        destination: state.destination,
        rideType: rates.label,
        baseFare: rates.base,
        rideFare: rideFare ?? 0,
        total: totalFare ?? 0,
        distance: distanceKm != null ? `${distanceKm} km` : 'N/A',
        eta: rates.eta,
        safeRideEnabled: isSafeRide ? 1 : 0,
        // Pass coords so backend can store them
        pickupLat: pickupCoords?.lat,
        pickupLng: pickupCoords?.lng,
        dropoffLat: dropoffCoords?.lat,
        dropoffLng: dropoffCoords?.lng,
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

        <div className="flex gap-4 mt-4 pt-4" style={{ borderTop: '1px solid #1f2937' }}>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: '#9ca3af' }}>
            <Clock size={13} />
            {distLoading ? '…' : durationMin != null ? `~${durationMin} min` : '~28 min'}
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: '#9ca3af' }}>
            <Car size={13} />
            {distLoading ? (
              <span className="flex items-center gap-1"><Loader2 size={11} className="animate-spin" /> Calculating…</span>
            ) : distanceKm != null ? `${distanceKm} km` : '—'}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: isSafeRide ? '#16a34a' : '#9ca3af' }}>
            <ShieldCheck size={13} />
            {isSafeRide ? 'SafeRide Active' : 'SafeRide Off'}
          </div>
        </div>

        {distError && (
          <p className="text-xs mt-2 text-amber-400">⚠ {distError} — using estimated fare</p>
        )}
      </div>

      {/* Fare breakdown */}
      <div style={glass}>
        <h2 className="text-sm font-semibold mb-3" style={{ color: '#f9fafb' }}>Fare Estimate</h2>
        {distLoading ? (
          <div className="flex items-center gap-2 text-sm" style={{ color: '#9ca3af' }}>
            <Loader2 size={15} className="animate-spin" />
            Calculating fare via OpenRouteService…
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: '#9ca3af' }}>Base fare</span>
              <span className="text-sm" style={{ color: '#e5e7eb' }}>{formatCurrency(rates.base)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: '#9ca3af' }}>
                Ride fare ({distanceKm != null ? `${distanceKm} km × ₹${rates.perKm}/km` : `₹${rates.perKm}/km`})
              </span>
              <span className="text-sm" style={{ color: '#e5e7eb' }}>
                {rideFare != null ? formatCurrency(rideFare) : '—'}
              </span>
            </div>
            <div className="flex justify-between pt-2" style={{ borderTop: '1px solid #1f2937' }}>
              <span className="text-sm font-semibold" style={{ color: '#f9fafb' }}>Total</span>
              <span className="text-base font-bold" style={{ color: '#f9fafb' }}>
                {totalFare != null ? formatCurrency(totalFare) : '—'}
              </span>
            </div>
          </div>
        )}
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
          Driver will arrive in approximately{' '}
          <span style={{ fontWeight: 600, color: '#f9fafb' }}>{rates.eta}</span>
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
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={handleConfirm}
          loading={loading}
          disabled={distLoading || loading}
        >
          Confirm Booking
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
}
