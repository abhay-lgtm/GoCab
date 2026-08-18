import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, MapPin, Navigation, Phone, AlertTriangle,
} from 'lucide-react';
import { mockRides, mockUsers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import MapPlaceholder from '../../components/map/MapPlaceholder';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  padding: 20,
};

export default function SOSScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const customer = mockUsers.find(u => u.id === user?.id) || mockUsers[0];
  const ride = mockRides.find(r => r.id === 'r5') || mockRides[0];

  return (
    <div className="w-full space-y-6">
      {/* Alert banner */}
      <div
        className="rounded-2xl p-5 text-center animate-fade-in"
        style={{
          background: 'rgba(239,68,68,0.08)',
          border: '2px solid rgba(239,68,68,0.35)',
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ background: '#ef4444', boxShadow: '0 0 40px rgba(239,68,68,0.4)' }}
        >
          <AlertTriangle size={28} className="text-white" />
        </div>
        <h1 className="text-xl font-bold mb-1" style={{ color: 'rgba(255,255,255,0.92)' }}>SOS Alert Sent</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Emergency assistance has been notified. Stay calm — help is on the way.
        </p>
      </div>

      {/* Notified parties */}
      <div style={glass}>
        <h2 className="text-sm font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.85)' }}>Notified</h2>
        <div className="space-y-3">
          {customer.emergencyContacts.map(c => (
            <div key={c.id} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <CheckCircle size={15} style={{ color: '#10b981' }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{c.name}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{c.phone}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <CheckCircle size={15} style={{ color: '#10b981' }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>RideSphere Admin</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Emergency monitoring team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current ride info */}
      <div style={glass}>
        <h2 className="text-sm font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.85)' }}>Current Ride</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin size={13} style={{ color: '#10b981' }} />
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{ride.pickup}</span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation size={13} style={{ color: '#5b8eff' }} />
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{ride.destination}</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(79,126,255,0.2)' }}
            >
              <span className="text-[10px] font-bold" style={{ color: '#5b8eff' }}>R</span>
            </div>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {ride.driverName} · {ride.vehicleNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Map */}
      <MapPlaceholder pickup={ride.pickup} destination={ride.destination} className="h-48" />

      {/* Current location */}
      <div
        className="flex items-center gap-2 rounded-xl px-4 py-3"
        style={{ background: 'rgba(79,126,255,0.08)', border: '1px solid rgba(79,126,255,0.15)' }}
      >
        <MapPin size={16} style={{ color: '#5b8eff' }} />
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
