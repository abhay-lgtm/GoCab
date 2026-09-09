import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApi, apiPost } from '../../hooks/useApi';
import { Car, Home, Briefcase, Plus, ChevronRight, Navigation } from 'lucide-react';
import Button from '../../components/common/Button';
import SafeRideCard from '../../components/safety/SafeRideCard';
import RideCard from '../../components/booking/RideCard';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: bookings, loading } = useApi('/api/bookings', { pollInterval: 4000 });
  const { data: profile } = useApi('/api/users/me');
  
  const [safeRide, setSafeRide] = useState(true);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    if (profile && profile.safeRideEnabled !== undefined) {
      setSafeRide(Boolean(profile.safeRideEnabled));
    }
  }, [profile]);

  const handleToggleSafeRide = async () => {
    const nextVal = !safeRide;
    setSafeRide(nextVal);
    try {
      await apiPost('/api/users/me', { safeRideEnabled: nextVal ? 1 : 0 });
    } catch (e) {
      console.error(e);
    }
  };

  const recentRides = (bookings || [])
    .filter(b => b.status === 'completed')
    .slice(0, 3);

  const activeRide = (bookings || []).find(b => b.status === 'in_progress' || b.status === 'accepted' || b.status === 'pending') || null;

  const handleBook = () => {
    navigate('/customer/book', {
      state: { pickup, destination, safeRideEnabled: safeRide ? 1 : 0 },
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading && !bookings) return <div style={{color:'#9ca3af',padding:'40px',textAlign:'center'}}>Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-8 pb-8">
      {/* Greeting */}
      <div>
        <p className="text-sm mb-1 text-[#9ca3af]">{getGreeting()},</p>
        <h1 className="text-3xl font-bold text-[#f9fafb] tracking-tight">
          {(user?.name || 'There').split(' ')[0]}
        </h1>
      </div>

      {/* Active ride banner */}
      {activeRide && (
        <Link to={`/customer/ride/${activeRide.id}`} className="block w-full">
          <div className="flex items-center gap-4 px-5 py-4 bg-[#1e3a5f] border border-[#2563eb]/50 rounded hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded flex items-center justify-center shrink-0 bg-[#2563eb]">
              <Car size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs mb-0.5 text-[#93c5fd]">
                {activeRide.status === 'pending' ? 'Ride Requested · Finding Driver' : 'Active Ride'}
              </p>
              <p className="text-sm font-medium truncate text-[#f9fafb]">
                {activeRide.pickup} → {activeRide.destination}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                {activeRide.status === 'pending' ? 'Searching' : activeRide.eta}
              </span>
              <ChevronRight size={18} className="text-white/70" />
            </div>
          </div>
        </Link>
      )}

      {/* Booking card */}
      <div className="p-6 bg-[#111827] border border-[#1f2937] rounded">
        <h2 className="text-lg font-semibold mb-5 text-[#f9fafb]">
          Where are you going?
        </h2>
        <div className="relative flex flex-col gap-3 mb-6">
          {/* Connection Line */}
          <div className="absolute left-[19px] top-[24px] bottom-[24px] border-l-2 border-dashed border-[#374151] z-0" />
          
          {/* Pickup */}
          <div className="relative z-10">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 flex justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
            </div>
            <input
              type="text"
              placeholder="Pickup location"
              value={pickup}
              onChange={e => setPickup(e.target.value)}
              className="w-full h-12 pl-[44px] pr-4 rounded text-sm bg-[#0a0d14] text-[#f9fafb] border border-[#1f2937] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
            />
          </div>
          {/* Destination */}
          <div className="relative z-10">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 flex justify-center">
              <Navigation size={14} className="text-[#2563eb]" />
            </div>
            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="w-full h-12 pl-[44px] pr-4 rounded text-sm bg-[#0a0d14] text-[#f9fafb] border border-[#1f2937] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" fullWidth size="lg" onClick={handleBook}>
            <Car size={18} />
            Book Ride
          </Button>
        </div>
      </div>

      {/* Saved locations */}
      {(user?.savedLocations || []).length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2">
          {(user?.savedLocations || []).map(loc => (
            <button
              key={loc.id}
              onClick={() => setDestination(loc.address)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded text-sm font-medium whitespace-nowrap bg-[#111827] border border-[#1f2937] text-[#9ca3af] hover:bg-[#1f2937] hover:text-white transition-all shrink-0"
            >
              {loc.label === 'Home'
                ? <Home size={15} className="text-[#2563eb]" />
                : <Briefcase size={15} className="text-[#2563eb]" />
              }
              {loc.label}
            </button>
          ))}
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium whitespace-nowrap bg-[#0a0d14] border border-dashed border-[#374151] text-[#6b7280] hover:text-[#9ca3af] hover:border-[#9ca3af] transition-all shrink-0"
          >
            <Plus size={15} />
            Add
          </button>
        </div>
      )}

      {/* SafeRide card */}
      <SafeRideCard enabled={safeRide} onToggle={handleToggleSafeRide} />

      {/* Recent rides */}
      {recentRides.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#f9fafb]">Recent Rides</h2>
            <Link
              to="/customer/history"
              className="text-xs font-medium text-[#2563eb] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            {recentRides.map(ride => (
              <RideCard key={ride.id} ride={ride} linkTo="/customer/history" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
