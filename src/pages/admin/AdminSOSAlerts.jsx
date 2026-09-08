import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import SOSAlertCard from '../../components/admin/SOSAlertCard';
import { useApi, apiPost } from '../../hooks/useApi';

export default function AdminSOSAlerts() {
  const navigate = useNavigate();
  const { data: alerts, loading, refetch } = useApi('/api/sos');

  const handleResolve = async (id) => {
    try {
      await apiPost(`/api/sos/${id}/resolve`, {});
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const allAlerts = alerts || [];
  const active = allAlerts.filter(a => a.status === 'active');
  const resolved = allAlerts.filter(a => a.status === 'resolved');

  return (
    <div className="flex flex-col max-w-3xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#f9fafb] tracking-tight">SOS Alerts</h1>
        <p className="text-sm text-[#9ca3af]">{active.length} active · {resolved.length} resolved</p>
      </div>

      {active.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-red-700 flex items-center gap-2">
            <AlertTriangle size={14} />
            Active Emergencies
          </h2>
          {active.map(alert => (
            <SOSAlertCard
              key={alert.id}
              alert={alert}
              onResolve={() => handleResolve(alert.id)}
              onViewRide={() => navigate(`/admin/rides`)}
            />
          ))}
        </div>
      )}

      {resolved.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-[#9ca3af]">Resolved</h2>
          {resolved.map(alert => (
            <SOSAlertCard
              key={alert.id}
              alert={alert}
              onResolve={() => handleResolve(alert.id)}
              onViewRide={() => navigate(`/admin/rides`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
