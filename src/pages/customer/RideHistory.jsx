import { useState } from 'react';
import { History } from 'lucide-react';
import { mockRides } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import RideCard from '../../components/booking/RideCard';
import EmptyState from '../../components/common/EmptyState';

const filters = ['All', 'Completed', 'Cancelled', 'In Progress'];

export default function RideHistory() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');

  const allRides = mockRides.filter(r => r.customerId === (user?.id || 'u1'));
  const filtered = filter === 'All'
    ? allRides
    : allRides.filter(r => r.status === filter.toLowerCase().replace(' ', '_'));

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
          Ride History
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{allRides.length} total rides</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(f => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 shrink-0"
              style={{
                background: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.05)',
                color: active ? '#05091a' : 'rgba(255,255,255,0.5)',
                border: active ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Ride list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={History}
          title="No rides found"
          message="You don't have any rides matching this filter yet."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map(ride => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
}
