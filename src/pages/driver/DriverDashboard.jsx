import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, TrendingUp, Car } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockDrivers, mockRideRequests } from '../../data/mockData';
import { getGreeting } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';
import RideRequestCard from '../../components/driver/RideRequestCard';
import Button from '../../components/common/Button';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
};

export default function DriverDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const driver = mockDrivers.find(d => d.id === user?.id) || mockDrivers[0];
  const [available, setAvailable] = useState(driver.available);
  const [requests, setRequests] = useState(mockRideRequests);

  const handleAccept = () => navigate('/driver/ride/r5');
  const handleReject = (reqId) => setRequests(r => r.filter(req => req.id !== reqId));

  return (
    <div className="flex flex-col max-w-2xl mx-auto px-4 sm:px-6 py-6 gap-5">
      {/* Greeting + availability */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>{getGreeting()},</p>
          <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
            {driver.name.split(' ')[0]}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {driver.vehicleModel} · {driver.vehicleNumber}
          </p>
        </div>
        <button
          onClick={() => setAvailable(a => !a)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 shrink-0"
          style={{
            background: available ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.05)',
            border: available ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.08)',
            color: available ? '#10b981' : 'rgba(255,255,255,0.35)',
          }}
        >
          <span className={`w-2 h-2 rounded-full ${available ? 'bg-[#10b981] animate-pulse' : ''}`}
            style={!available ? { background: 'rgba(255,255,255,0.2)' } : {}}
          />
          {available ? 'Available' : 'Offline'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Today's Rides", value: driver.todayRides },
          { label: "Today's Earnings", value: formatCurrency(driver.todayEarnings) },
          {
            label: 'Rating',
            value: (
              <div className="flex items-center justify-center gap-1">
                <Star size={14} fill="#fbbf24" style={{ color: '#fbbf24' }} />
                <span>{driver.rating}</span>
              </div>
            ),
          },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl p-4 text-center" style={glass}>
            <p className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)' }}>{value}</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Ride requests */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>Ride Requests</h2>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{requests.length} pending</span>
        </div>
        {!available ? (
          <div className="rounded-2xl p-8 text-center" style={glass}>
            <Car size={32} className="mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.2)' }} />
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>You&apos;re offline</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Go online to receive ride requests.</p>
            <Button variant="primary" size="md" className="mt-4" onClick={() => setAvailable(true)}>
              Go Online
            </Button>
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded-2xl p-8 text-center" style={glass}>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>No pending requests right now.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map(req => (
              <RideRequestCard key={req.id} request={req} onAccept={handleAccept} onReject={handleReject} />
            ))}
          </div>
        )}
      </div>

      {/* Lifetime stats */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} style={{ color: '#5b8eff' }} />
          <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>Career Stats</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Total Rides', value: driver.totalRides.toLocaleString() },
            { label: 'Total Earnings', value: '₹14.8L+' },
            { label: 'Member Since', value: '2023' },
            { label: 'Verified', value: driver.verified ? '✓ Yes' : 'Pending' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</p>
              <p className="text-base font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.85)' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
