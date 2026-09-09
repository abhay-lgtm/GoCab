import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RideRequestCard from '../../components/driver/RideRequestCard';
import EmptyState from '../../components/common/EmptyState';
import { List } from 'lucide-react';
import { useApi, apiPost } from '../../hooks/useApi';

export default function RideRequests() {
  const navigate = useNavigate();
  const { data: bookings, loading, refetch } = useApi('/api/bookings', { pollInterval: 3000 });
  
  const [localRejected, setLocalRejected] = useState([]);
  
  const requests = (bookings || []).filter(req => req.status === 'pending' && !localRejected.includes(req.id));

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

  if (loading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div className="flex flex-col max-w-xl mx-auto px-4 sm:px-6 py-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
          Ride Requests
        </h1>
        <p className="text-sm mt-0.5" style={{ color: '#9ca3af' }}>
          {requests.length} pending request{requests.length !== 1 ? 's' : ''}
        </p>
      </div>
      {requests.length === 0 ? (
        <EmptyState
          icon={List}
          title="No pending requests"
          message="New ride requests will appear here. Make sure you're online."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map(req => (
            <RideRequestCard key={req.id} request={req} onAccept={() => handleAccept(req.id)} onReject={() => handleReject(req.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
