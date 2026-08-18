import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MapPin, Navigation, Phone, ShieldCheck, CheckCircle, Play, Flag,
} from 'lucide-react';
import { mockRides } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';
import MapPlaceholder from '../../components/map/MapPlaceholder';
import Button from '../../components/common/Button';

export default function DriverCurrentRide() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const ride = mockRides.find(r => r.id === rideId) || mockRides.find(r => r.id === 'r5');
  const [status, setStatus] = useState('accepted');
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setStatus('started');
  };

  const handleComplete = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setStatus('completed');
  };

  if (status === 'completed') {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16 text-center animate-slide-up">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)', boxShadow: '0 0 40px rgba(16,185,129,0.2)' }}
        >
          <CheckCircle size={40} style={{ color: '#10b981' }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
          Ride Completed!
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)' }} className="mb-1">Fare earned</p>
        <p className="text-4xl font-bold mb-6" style={{ color: '#10b981' }}>
          {formatCurrency(ride?.total || 320)}
        </p>
        <div
          className="rounded-2xl p-4 text-left space-y-2 mb-6"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {[
            { label: 'Passenger', value: ride?.customerName || 'Abhay Prasad' },
            { label: 'Route', value: `${ride?.pickup} → ${ride?.destination}` },
            { label: 'Distance', value: ride?.distance },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
              <span className="font-medium text-right max-w-[55%]" style={{ color: 'rgba(255,255,255,0.85)' }}>{value}</span>
            </div>
          ))}
        </div>
        <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/driver/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <MapPlaceholder pickup={ride?.pickup} destination={ride?.destination} className="h-56 sm:h-72 rounded-none" />

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4" style={{ background: '#05091a' }}>
        {/* Status */}
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${status === 'started' ? 'animate-pulse' : ''}`}
            style={{ background: status === 'started' ? '#4f7eff' : '#10b981' }}
          />
          <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {status === 'accepted' ? 'Heading to pickup' : 'Ride in progress'}
          </p>
        </div>

        {/* Passenger card */}
        <div
          className="rounded-2xl p-4 space-y-3"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {ride?.safeRideEnabled && (
            <div className="flex items-center gap-2 text-xs font-medium mb-1" style={{ color: '#10b981' }}>
              <ShieldCheck size={14} />
              SafeRide Passenger
            </div>
          )}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'rgba(79,126,255,0.2)' }}
            >
              <span className="text-base font-bold" style={{ color: '#5b8eff' }}>
                {(ride?.customerName || 'Abhay').charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {ride?.customerName || 'Abhay Prasad'}
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Passenger</p>
            </div>
            <a href={`tel:${ride?.driverPhone || '+91 94470 12345'}`}>
              <Button variant="secondary" size="icon">
                <Phone size={16} />
              </Button>
            </a>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981]" />
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{ride?.pickup}</p>
            </div>
            <div className="ml-1 border-l-2 border-dashed h-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#4f7eff]" />
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{ride?.destination}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{ride?.distance}</span>
            <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {formatCurrency(ride?.total)}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        {status === 'accepted' && (
          <Button variant="primary" fullWidth size="lg" onClick={handleStart} loading={loading}>
            <Play size={18} />
            Start Ride
          </Button>
        )}
        {status === 'started' && (
          <Button variant="safety" fullWidth size="lg" onClick={handleComplete} loading={loading}>
            <Flag size={18} />
            Complete Ride
          </Button>
        )}
      </div>
    </div>
  );
}
