import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import SOSAlertCard from '../../components/admin/SOSAlertCard';
import EmptyState from '../../components/common/EmptyState';
import { ShieldAlert } from 'lucide-react';

const filters = ['All', 'Active', 'Resolved'];

export default function SOSAlerts() {
  const [filter, setFilter] = useState('All');
  const { data: apiAlerts, loading } = useApi('/api/sos');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (apiAlerts) setAlerts(apiAlerts);
  }, [apiAlerts]);

  const handleResolve = (id) => {
    setAlerts(a => a.map(al => al.id === id ? { ...al, status: 'resolved' } : al));
  };

  const filtered = filter === 'All'
    ? alerts
    : alerts.filter(a => a.status === filter.toLowerCase());

  const activeCount = alerts.filter(a => a.status === 'active').length;

  if (loading && !apiAlerts) return <div style={{color:'#9ca3af',padding:'40px',textAlign:'center'}}>Loading...</div>;

  return (
    <div className="flex flex-col max-w-2xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded flex items-center justify-center"
          style={{ background: '#111827', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <ShieldAlert size={20} style={{ color: '#ef4444' }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
            SOS Alerts
          </h1>
          {activeCount > 0 && (
            <p className="text-xs" style={{ color: '#ef4444' }}>
              {activeCount} active — requires immediate attention
            </p>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {filters.map(f => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded text-xs font-medium transition-all duration-150 shrink-0"
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

      {filtered.length === 0 ? (
        <EmptyState
          icon={ShieldAlert}
          title="No alerts"
          message="No SOS alerts match this filter."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(alert => (
            <SOSAlertCard key={alert.id} alert={alert} onResolve={handleResolve} />
          ))}
        </div>
      )}
    </div>
  );
}
