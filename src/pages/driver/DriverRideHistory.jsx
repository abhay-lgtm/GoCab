import React from 'react';
import RideCard from '../../components/booking/RideCard';
import EmptyState from '../../components/common/EmptyState';
import { History } from 'lucide-react';
import { useApi } from '../../hooks/useApi';

export default function DriverRideHistory() {
  const { data: bookings, loading } = useApi('/api/bookings');

  if (loading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const rides = (bookings || []).filter(r => r.status === 'completed');

  return (
    <div className="flex flex-col max-w-2xl mx-auto px-4 sm:px-6 py-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
          Ride History
        </h1>
        <p className="text-sm mt-0.5" style={{ color: '#9ca3af' }}>
          {rides.length} completed rides
        </p>
      </div>
      {rides.length === 0 ? (
        <EmptyState icon={History} title="No rides yet" message="Completed rides will appear here." />
      ) : (
        <div className="flex flex-col gap-3">
          {rides.map(r => <RideCard key={r.id} ride={r} />)}
        </div>
      )}
    </div>
  );
}
