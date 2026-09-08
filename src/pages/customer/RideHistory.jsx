import React, { useState } from 'react';
import { History } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import RideCard from '../../components/booking/RideCard';
import EmptyState from '../../components/common/EmptyState';
import { useApi } from '../../hooks/useApi';

const filters = ['All', 'Completed', 'Cancelled', 'In Progress'];

export default function RideHistory() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const { data: bookings, loading } = useApi('/api/bookings');

  if (loading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const allRides = bookings || [];
  const filtered = filter === 'All'
    ? allRides
    : allRides.filter(r => r.status === filter.toLowerCase().replace(' ', '_'));

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto mt-6 gap-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
          Ride History
        </h1>
        <p className="text-sm mt-0.5" style={{ color: '#9ca3af' }}>{allRides.length} total rides</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(f => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3.5 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all duration-150 shrink-0"
              style={{
                background: active ? '#f9fafb' : '#1f2937',
                color: active ? '#0a0d14' : '#9ca3af',
                border: active ? 'none' : '1px solid #1f2937',
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
        <div className="flex flex-col gap-3">
          {filtered.map(ride => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
}
