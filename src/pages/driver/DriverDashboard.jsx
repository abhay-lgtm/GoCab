import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, TrendingUp, Car } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockDrivers, mockRideRequests } from '../../data/mockData';
import { getGreeting } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';
import RideRequestCard from '../../components/driver/RideRequestCard';
import Button from '../../components/common/Button';

export default function DriverDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const driver = mockDrivers.find(d => d.id === user?.id) || mockDrivers[0];
  const [available, setAvailable] = useState(driver.available);
  const [requests, setRequests] = useState(mockRideRequests);

  const handleAccept = (reqId) => {
    navigate('/driver/ride/r5');
  };

  const handleReject = (reqId) => {
    setRequests(r => r.filter(req => req.id !== reqId));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      {/* Greeting + availability */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#9ca3af]">{getGreeting()},</p>
          <h1 className="text-2xl font-bold text-[#0a0f1e]">{driver.name.split(' ')[0]}</h1>
          <p className="text-xs text-[#9ca3af] mt-0.5">{driver.vehicleModel} · {driver.vehicleNumber}</p>
        </div>
        <button
          onClick={() => setAvailable(a => !a)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium text-sm transition-all duration-200 shrink-0
            ${available ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-[#f0f2f8] border-[#e4e8f0] text-[#9ca3af]'}`}
        >
          <span className={`w-2 h-2 rounded-full ${available ? 'bg-[#10b981] animate-pulse' : 'bg-[#9ca3af]'}`} />
          {available ? 'Available' : 'Offline'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-[#e4e8f0] p-4 text-center">
          <p className="text-2xl font-bold text-[#0a0f1e]">{driver.todayRides}</p>
          <p className="text-xs text-[#9ca3af] mt-1">Today's Rides</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#e4e8f0] p-4 text-center">
          <p className="text-2xl font-bold text-[#0a0f1e]">{formatCurrency(driver.todayEarnings)}</p>
          <p className="text-xs text-[#9ca3af] mt-1">Today's Earnings</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#e4e8f0] p-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <Star size={14} className="text-amber-400" fill="currentColor" />
            <p className="text-2xl font-bold text-[#0a0f1e]">{driver.rating}</p>
          </div>
          <p className="text-xs text-[#9ca3af] mt-1">Rating</p>
        </div>
      </div>

      {/* Ride requests */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#0a0f1e]">Ride Requests</h2>
          <span className="text-xs text-[#9ca3af]">{requests.length} pending</span>
        </div>
        {!available ? (
          <div className="bg-[#f0f2f8] rounded-2xl p-8 text-center">
            <Car size={32} className="text-[#9ca3af] mx-auto mb-3" />
            <p className="text-sm font-medium text-[#0a0f1e]">You're offline</p>
            <p className="text-xs text-[#9ca3af] mt-1">Go online to receive ride requests.</p>
            <Button variant="primary" size="md" className="mt-4" onClick={() => setAvailable(true)}>
              Go Online
            </Button>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e4e8f0] p-8 text-center">
            <p className="text-sm text-[#9ca3af]">No pending requests right now.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map(req => (
              <RideRequestCard
                key={req.id}
                request={req}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lifetime stats */}
      <div className="bg-[#0a0f1e] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-[#3b6ef8]" />
          <p className="text-sm font-semibold text-white">Career Stats</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Total Rides', value: driver.totalRides.toLocaleString() },
            { label: 'Total Earnings', value: '₹4.8L+' },
            { label: 'Member Since', value: '2023' },
            { label: 'Verified', value: driver.verified ? '✓ Yes' : 'Pending' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-white/40">{label}</p>
              <p className="text-base font-semibold text-white mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
