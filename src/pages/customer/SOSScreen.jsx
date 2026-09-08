import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, MapPin, Navigation, Phone, AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/common/Button';
import MapPlaceholder from '../../components/map/MapPlaceholder';

const glass = {
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 4,
  padding: 20,
};

export default function SOSScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: bookings } = useApi('/api/bookings');
  
  const customer = { emergencyContacts: [] };
  const ride = (bookings || []).find(b => b.status === 'in_progress' || b.status === 'accepted') || {};

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto mt-6 gap-8">
      {/* Alert banner */}
      <div
        className="rounded p-5 text-center animate-fade-in"
        style={{
          background: '#111827',
          border: '2px solid rgba(239,68,68,0.35)',
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ background: '#dc2626', boxShadow: '0 0 40px rgba(239,68,68,0.4)' }}
        >
          <AlertTriangle size={28} className="text-white" />
        </div>
        <h1 className="text-xl font-bold mb-1" style={{ color: '#f9fafb' }}>SOS Alert Sent</h1>
        <p className="text-sm" style={{ color: '#9ca3af' }}>
          Emergency assistance has been notified. Stay calm — help is on the way.
        </p>
      </div>

      {/* Notified parties */}
      <div style={glass}>
        <h2 className="text-sm font-semibold mb-3" style={{ color: '#f9fafb' }}>Notified</h2>
        <div className="flex flex-col gap-3">
          {customer.emergencyContacts.map(c => (
            <div key={c.id} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: '#111827', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <CheckCircle size={15} style={{ color: '#16a34a' }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: '#f9fafb' }}>{c.name}</p>
                <p className="text-xs" style={{ color: '#9ca3af' }}>{c.phone}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: '#111827', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <CheckCircle size={15} style={{ color: '#16a34a' }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#f9fafb' }}>RideSphere Admin</p>
              <p className="text-xs" style={{ color: '#9ca3af' }}>Emergency monitoring team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current ride info */}
      <div style={glass}>
        <h2 className="text-sm font-semibold mb-3" style={{ color: '#f9fafb' }}>Current Ride</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <MapPin size={13} style={{ color: '#16a34a' }} />
            <span className="text-sm" style={{ color: '#e5e7eb' }}>{ride.pickup}</span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation size={13} style={{ color: '#2563eb' }} />
            <span className="text-sm" style={{ color: '#e5e7eb' }}>{ride.destination}</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: '#111827' }}
            >
              <span className="text-[10px] font-bold" style={{ color: '#2563eb' }}>R</span>
            </div>
            <span className="text-sm" style={{ color: '#d1d5db' }}>
              {ride.driverName} · {ride.vehicleNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Map */}
      <MapPlaceholder pickup={ride.pickup} destination={ride.destination} className="h-48" />

      {/* Current location */}
      <div
        className="flex items-center gap-2 rounded px-4 py-3"
        style={{ background: '#111827', border: '1px solid rgba(79,126,255,0.15)' }}
      >
        <MapPin size={16} style={{ color: '#2563eb' }} />
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
          MC Road, Near Thiruvanchoor, Kottayam
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <a href="tel:112" className="flex-1">
          <Button variant="danger" fullWidth size="lg">
            <Phone size={18} />
            Call 112
          </Button>
        </a>
        <Button variant="secondary" fullWidth size="lg" onClick={() => navigate('/customer/ride/r5')}>
          Back to Ride
        </Button>
      </div>
    </div>
  );
}
