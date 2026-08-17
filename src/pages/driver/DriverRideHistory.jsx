import { mockRides } from '../../data/mockData';
import RideCard from '../../components/booking/RideCard';
import EmptyState from '../../components/common/EmptyState';
import { History } from 'lucide-react';

export default function DriverRideHistory() {
  const rides = mockRides.filter(r => r.driverId === 'd1').slice(0, 10);
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      <h1 className="text-2xl font-bold text-[#0a0f1e]">Ride History</h1>
      {rides.length === 0 ? (
        <EmptyState icon={History} title="No rides yet" message="Completed rides will appear here." />
      ) : (
        <div className="space-y-3">
          {rides.map(r => <RideCard key={r.id} ride={r} />)}
        </div>
      )}
    </div>
  );
}
