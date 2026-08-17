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
    if (!pickup && !destination) {
      navigate('/customer/book');
      return;
    }
    navigate('/customer/book', { state: { pickup, destination } });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      {/* Greeting */}
      <div>
        <p className="text-sm text-[#9ca3af]">{getGreeting()},</p>
        <h1 className="text-2xl font-bold text-[#0a0f1e]">{customerData.name.split(' ')[0]} 👋</h1>
      </div>

      {/* Active ride banner */}
      {activeRide && (
        <Link to={`/customer/ride/${activeRide.id}`}>
          <div className="flex items-center gap-3 bg-[#0a0f1e] rounded-2xl px-4 py-3 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-[#3b6ef8] flex items-center justify-center shrink-0">
              <Car size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/50">Active Ride</p>
              <p className="text-sm font-medium text-white truncate">
                {activeRide.pickup} → {activeRide.destination}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#3b6ef8] font-medium">{activeRide.eta}</span>
              <ChevronRight size={16} className="text-white/40" />
            </div>
          </div>
        </Link>
      )}

      {/* Booking card */}
      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5 shadow-sm">
        <h2 className="text-base font-semibold text-[#0a0f1e] mb-4">Where are you going?</h2>
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
              className="w-full h-11 pl-7 pr-4 rounded-xl border border-[#e4e8f0] text-sm text-[#0a0f1e] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#3b6ef8] focus:ring-2 focus:ring-[#3b6ef8]/10 transition-all"
            />
          </div>
          {/* Divider */}
          <div className="ml-3 border-l-2 border-dashed border-[#e4e8f0] h-2" />
          {/* Destination */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-[#3b6ef8]" />
            </div>
            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="w-full h-11 pl-7 pr-4 rounded-xl border border-[#e4e8f0] text-sm text-[#0a0f1e] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#3b6ef8] focus:ring-2 focus:ring-[#3b6ef8]/10 transition-all"
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
      {customerData.savedLocations.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {customerData.savedLocations.map(loc => (
            <button
              key={loc.id}
              onClick={() => setDestination(loc.address)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#e4e8f0] bg-white text-xs font-medium text-[#0a0f1e] whitespace-nowrap hover:border-[#3b6ef8]/40 hover:bg-[#f0f4ff] transition-all duration-150 shrink-0"
            >
              {loc.label === 'Home' ? <Home size={13} className="text-[#3b6ef8]" /> : <Briefcase size={13} className="text-indigo-500" />}
              {loc.label}
            </button>
          ))}
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-[#e4e8f0] text-xs font-medium text-[#9ca3af] whitespace-nowrap hover:border-[#3b6ef8]/40 transition-all duration-150 shrink-0">
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
            <h2 className="text-sm font-semibold text-[#0a0f1e]">Recent Rides</h2>
            <Link to="/customer/history" className="text-xs text-[#3b6ef8] font-medium hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-2.5">
            {recentRides.map(ride => (
              <RideCard key={ride.id} ride={ride} linkTo={`/customer/history`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
