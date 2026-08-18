import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin, Navigation, Mic, Car, Clock, ChevronRight,
  Star, ShieldCheck, Home, Briefcase, Plus,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getGreeting } from '../../utils/formatDate';
import { mockUsers, mockRides, mockActiveRide } from '../../data/mockData';
import Button from '../../components/common/Button';
import SafeRideCard from '../../components/safety/SafeRideCard';
import RideCard from '../../components/booking/RideCard';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
};

export default function CustomerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const customerData = mockUsers.find(u => u.id === user?.id) || mockUsers[0];
  const [safeRide, setSafeRide] = useState(customerData.safeRideEnabled);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const recentRides = mockRides
    .filter(r => r.customerId === customerData.id && r.status === 'completed')
    .slice(0, 3);

  const activeRide = mockActiveRide;

  const handleBook = () => {
    navigate(!pickup && !destination ? '/customer/book' : '/customer/book', {
      state: { pickup, destination },
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      {/* Greeting */}
      <div>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>{getGreeting()},</p>
        <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
          {customerData.name.split(' ')[0]} 👋
        </h1>
      </div>

      {/* Active ride banner */}
      {activeRide && (
        <Link to={`/customer/ride/${activeRide.id}`} style={{ textDecoration: 'none' }}>
          <div
            className="flex items-center gap-3 px-4 py-3 hover:opacity-90 transition-opacity"
            style={{
              background: 'linear-gradient(135deg, rgba(79,126,255,0.2) 0%, rgba(79,126,255,0.08) 100%)',
              border: '1px solid rgba(79,126,255,0.25)',
              borderRadius: 16,
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: '#4f7eff' }}
            >
              <Car size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Active Ride</p>
              <p className="text-sm font-medium truncate" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {activeRide.pickup} → {activeRide.destination}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium" style={{ color: '#5b8eff' }}>{activeRide.eta}</span>
              <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
          </div>
        </Link>
      )}

      {/* Booking card */}
      <div style={{ ...glass, padding: 20 }}>
        <h2 className="text-base font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Where are you going?
        </h2>
        <div className="space-y-3 mb-4">
          {/* Pickup */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-[#10b981]" />
            </div>
            <input
              type="text"
              placeholder="Pickup location"
              value={pickup}
              onChange={e => setPickup(e.target.value)}
              className="w-full h-11 pl-7 pr-4 rounded-xl text-sm transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(255,255,255,0.85)',
                outline: 'none',
              }}
            />
          </div>
          {/* Divider */}
          <div className="ml-3 border-l-2 border-dashed h-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          {/* Destination */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-[#4f7eff]" />
            </div>
            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="w-full h-11 pl-7 pr-4 rounded-xl text-sm transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(255,255,255,0.85)',
                outline: 'none',
              }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" fullWidth size="md" onClick={handleBook}>
            <Car size={16} />
            Book Ride
          </Button>
          <Link to="/customer/voice-booking" className="shrink-0">
            <Button variant="secondary" size="md">
              <Mic size={16} />
              Voice
            </Button>
          </Link>
        </div>
      </div>

      {/* Saved locations */}
      {customerData.savedLocations?.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {customerData.savedLocations.map(loc => (
            <button
              key={loc.id}
              onClick={() => setDestination(loc.address)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 shrink-0"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.65)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(79,126,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(79,126,255,0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              {loc.label === 'Home'
                ? <Home size={13} style={{ color: '#5b8eff' }} />
                : <Briefcase size={13} style={{ color: '#818cf8' }} />
              }
              {loc.label}
            </button>
          ))}
          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 shrink-0"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px dashed rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            <Plus size={12} />
            Add
          </button>
        </div>
      )}

      {/* SafeRide card */}
      <SafeRideCard enabled={safeRide} onToggle={() => setSafeRide(s => !s)} />

      {/* Recent rides */}
      {recentRides.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>Recent Rides</h2>
            <Link
              to="/customer/history"
              className="text-xs font-medium hover:underline"
              style={{ color: '#5b8eff', textDecoration: 'none' }}
            >
              View all
            </Link>
          </div>
          <div className="space-y-2.5">
            {recentRides.map(ride => (
              <RideCard key={ride.id} ride={ride} linkTo="/customer/history" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
