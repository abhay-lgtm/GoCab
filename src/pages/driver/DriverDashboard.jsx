import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, TrendingUp, Car } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatCurrency';
import RideRequestCard from '../../components/driver/RideRequestCard';
import Button from '../../components/common/Button';
import { useApi, apiPost } from '../../hooks/useApi';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const glass = {
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 4,
};

export default function DriverDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: driverProfile, loading: profileLoading } = useApi('/api/drivers/me');
  const { data: pendingBookings, loading: requestsLoading, refetch } = useApi('/api/bookings', { pollInterval: 3000 });

  const [available, setAvailable] = useState(true);
  const [localRejected, setLocalRejected] = useState([]);

  const requests = (pendingBookings || []).filter(req => req.status === 'pending' && !localRejected.includes(req.id));
  const activeRide = (pendingBookings || []).find(b => b.driverId === user?.id && (b.status === 'accepted' || b.status === 'in_progress'));
  const completedRides = (pendingBookings || []).filter(b => b.driverId === user?.id && b.status === 'completed');

  const handleAccept = async (reqId) => {
    try {
      await apiPost(`/api/bookings/${reqId}/accept`, {});
      refetch();
      navigate(`/driver/ride/${reqId}`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReject = (reqId) => {
    setLocalRejected(prev => [...prev, reqId]);
  };

  if (profileLoading || requestsLoading) {
    return <div className="text-[#9ca3af] p-10 text-center">Loading...</div>;
  }

  const driver = driverProfile || {};
  const totalEarned = completedRides.reduce((sum, b) => sum + (Number(b.total) || 0), 0);
  const todayRides = completedRides.length;
  const todayEarnings = totalEarned > 0 ? formatCurrency(totalEarned) : '—';

  return (
    <div className="flex flex-col max-w-2xl mx-auto px-4 sm:px-6 py-6 gap-5">
      {/* Greeting + availability */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#9ca3af]">{getGreeting()},</p>
          <h1 className="text-2xl font-bold text-[#f9fafb] tracking-tight">
            {user?.name?.split(' ')[0] || 'Driver'}
          </h1>
          <p className="text-xs mt-0.5 text-[#9ca3af]">
            {driver.vehicleModel || 'Vehicle'} · {driver.vehicleNumber || 'No Plate'}
          </p>
        </div>
        <button
          onClick={() => setAvailable(a => !a)}
          className={`flex items-center gap-2 px-4 py-2 rounded font-medium text-sm transition-all duration-200 shrink-0 ${
            available 
              ? 'bg-[#16a34a]/10 border border-[#16a34a]/30 text-[#16a34a]' 
              : 'bg-[#1f2937] border border-[#374151] text-[#9ca3af]'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${available ? 'bg-[#16a34a] animate-pulse' : 'bg-[#111827]'}`} />
          {available ? 'Available' : 'Offline'}
        </button>
      </div>

      {/* Active ride banner */}
      {activeRide && (
        <div
          onClick={() => navigate(`/driver/ride/${activeRide.id}`)}
          className="flex items-center gap-4 px-5 py-4 bg-[#1e3a5f] border border-[#2563eb]/50 rounded cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-10 h-10 rounded flex items-center justify-center shrink-0 bg-[#2563eb]">
            <Car size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs mb-0.5 text-[#93c5fd] font-medium">Ride In Progress</p>
            <p className="text-sm font-medium truncate text-[#f9fafb]">
              {activeRide.pickup} → {activeRide.destination} ({activeRide.customerName})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm">
              View Ride
            </Button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Today's Rides", value: todayRides },
          { label: "Today's Earnings", value: todayEarnings },
          {
            label: 'Rating',
            value: (
              <div className="flex items-center justify-center gap-1">
                <Star size={14} fill="#fbbf24" className="text-[#fbbf24]" />
                <span>{driver.rating || 'N/A'}</span>
              </div>
            ),
          },
        ].map(({ label, value }) => (
          <div key={label} className="rounded p-4 text-center bg-[#111827] border border-[#1f2937]">
            <p className="text-2xl font-bold text-[#f9fafb]">{value}</p>
            <p className="text-xs mt-1 text-[#9ca3af]">{label}</p>
          </div>
        ))}
      </div>

      {/* Ride requests */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#f9fafb]">Ride Requests</h2>
          <span className="text-xs text-[#6b7280]">{requests.length} pending</span>
        </div>
        {!available ? (
          <div className="rounded p-8 text-center bg-[#111827] border border-[#1f2937]">
            <Car size={32} className="mx-auto mb-3 text-[#4b5563]" />
            <p className="text-sm font-medium text-[#e5e7eb]">You&apos;re offline</p>
            <p className="text-xs mt-1 text-[#9ca3af]">Go online to receive ride requests.</p>
            <Button variant="primary" size="md" className="mt-4" onClick={() => setAvailable(true)}>
              Go Online
            </Button>
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded p-8 text-center bg-[#111827] border border-[#1f2937]">
            <p className="text-sm text-[#9ca3af]">No pending requests right now.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map(req => (
              <RideRequestCard key={req.id} request={req} onAccept={() => handleAccept(req.id)} onReject={() => handleReject(req.id)} />
            ))}
          </div>
        )}
      </div>

      {/* Lifetime stats */}
      <div className="rounded p-5 bg-[#111827] border border-[#1f2937]">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-[#2563eb]" />
          <p className="text-sm font-semibold text-[#f9fafb]">Career Stats</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Total Rides', value: (driver.totalRides || 0).toLocaleString() },
            { label: 'Total Earnings', value: '—' },
            { label: 'Member Since', value: '2023' },
            { label: 'Verified', value: driver.verified ? '✓ Yes' : 'Pending' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-[#6b7280]">{label}</p>
              <p className="text-base font-semibold mt-0.5 text-[#f9fafb]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
