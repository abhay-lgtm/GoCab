import { useState } from 'react';
import { mockSOSAlerts } from '../../data/mockData';
import SOSAlertCard from '../../components/admin/SOSAlertCard';
import EmptyState from '../../components/common/EmptyState';
import { ShieldAlert } from 'lucide-react';

const filters = ['All', 'Active', 'Resolved'];

export default function SOSAlerts() {
  const [filter, setFilter] = useState('All');
  const [alerts, setAlerts] = useState(mockSOSAlerts);

  const handleResolve = (id) => {
    setAlerts(a => a.map(al => al.id === id ? { ...al, status: 'resolved' } : al));
  };

  const filtered = filter === 'All'
    ? alerts
    : alerts.filter(a => a.status === filter.toLowerCase());

  const activeCount = alerts.filter(a => a.status === 'active').length;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <ShieldAlert size={20} style={{ color: '#f87171' }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
            SOS Alerts
          </h1>
          {activeCount > 0 && (
            <p className="text-xs" style={{ color: '#f87171' }}>
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
              className="px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 shrink-0"
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

      {filtered.length === 0 ? (
        <EmptyState
          icon={ShieldAlert}
          title="No alerts"
          message="No SOS alerts match this filter."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map(alert => (
            <SOSAlertCard key={alert.id} alert={alert} onResolve={handleResolve} />
          ))}
        </div>
      )}
    </div>
  );
}
