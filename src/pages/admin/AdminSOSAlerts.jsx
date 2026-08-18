import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { mockSOSAlerts } from '../../data/mockData';
import SOSAlertCard from '../../components/admin/SOSAlertCard';

export default function AdminSOSAlerts() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(mockSOSAlerts);

  const handleResolve = (id) => {
    setAlerts(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'resolved', resolvedAt: new Date().toLocaleTimeString() } : a)
    );
  };

  const active = alerts.filter(a => a.status === 'active');
  const resolved = alerts.filter(a => a.status === 'resolved');

  return (
    <div className="flex flex-col max-w-3xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0a0f1e]">SOS Alerts</h1>
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
              onResolve={handleResolve}
              onViewRide={(rideId) => navigate(`/admin/rides`)}
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
              onResolve={handleResolve}
              onViewRide={(rideId) => navigate(`/admin/rides`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
