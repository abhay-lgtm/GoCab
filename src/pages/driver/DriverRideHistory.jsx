import { mockRides } from '../../data/mockData';
import RideCard from '../../components/booking/RideCard';
import EmptyState from '../../components/common/EmptyState';
import { History } from 'lucide-react';

export default function DriverRideHistory() {
  const rides = mockRides.filter(r => r.driverId === 'd1').slice(0, 10);
  return (
    <div className="flex flex-col max-w-2xl mx-auto px-4 sm:px-6 py-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
          Ride History
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
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
