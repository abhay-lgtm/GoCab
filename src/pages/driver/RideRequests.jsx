import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRideRequests } from '../../data/mockData';
import RideRequestCard from '../../components/driver/RideRequestCard';
import EmptyState from '../../components/common/EmptyState';
import { List } from 'lucide-react';

export default function RideRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(mockRideRequests);

  const handleAccept = (reqId) => navigate('/driver/ride/r5');
  const handleReject = (reqId) => setRequests(r => r.filter(req => req.id !== reqId));

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#0a0f1e]">Ride Requests</h1>
        <p className="text-sm text-[#9ca3af] mt-0.5">{requests.length} pending request{requests.length !== 1 ? 's' : ''}</p>
      </div>
      {requests.length === 0 ? (
        <EmptyState
          icon={List}
          title="No pending requests"
          message="New ride requests will appear here. Make sure you're online."
        />
      ) : (
        <div className="space-y-3">
          {requests.map(req => (
            <RideRequestCard key={req.id} request={req} onAccept={handleAccept} onReject={handleReject} />
          ))}
        </div>
      )}
    </div>
  );
}
