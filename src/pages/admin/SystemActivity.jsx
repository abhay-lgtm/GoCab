import React from 'react';
import { Activity } from 'lucide-react';
import { useApi } from '../../hooks/useApi';

const typeColors = {
  sos:     { bg: 'rgba(239,68,68,0.12)',   dot: '#dc2626',   text: '#ef4444'  },
  booking: { bg: 'rgba(79,126,255,0.12)',  dot: '#2563eb',   text: '#2563eb'  },
  payment: { bg: 'rgba(16,185,129,0.12)', dot: '#16a34a',   text: '#16a34a'  },
  user:    { bg: 'rgba(167,139,250,0.12)', dot: '#8b5cf6',   text: '#8b5cf6'  },
  system:  { bg: '#1f2937', dot: '#6b7280', text: '#9ca3af' },
};

export default function SystemActivity() {
  const { data: allData, loading } = useApi('/api/data');

  if (loading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const activity = allData?.systemActivity || (allData?.bookings || []).slice(-10).map(b => ({
    id: `act_${b.id}`,
    type: 'booking',
    message: `Ride ${b.id} was ${b.status}`,
    time: 'Recently',
    date: 'Today',
  }));

  return (
    <div className="flex flex-col max-w-3xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded flex items-center justify-center"
          style={{ background: '#111827', border: '1px solid rgba(79,126,255,0.2)' }}
        >
          <Activity size={20} style={{ color: '#2563eb' }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
            System Activity
          </h1>
          <p className="text-xs" style={{ color: '#9ca3af' }}>
            {activity.length} recent events
          </p>
        </div>
      </div>

      {/* Activity feed */}
      <div
        className="rounded overflow-hidden"
        style={{
          background: '#111827',
          border: '1px solid #1f2937',
        }}
      >
        {activity.map((act, idx) => {
          const c = typeColors[act.type] || typeColors.system;
          return (
            <div
              key={act.id}
              className="flex items-start gap-4 px-5 py-4 transition-colors"
              style={{
                borderBottom: idx < activity.length - 1 ? '1px solid #1f2937' : 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#111827'}
              onMouseLeave={e => e.currentTarget.style.background = ''}
            >
              {/* Type badge */}
              <div
                className="shrink-0 mt-0.5 rounded-lg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{ background: c.bg, color: c.text, minWidth: 52, textAlign: 'center' }}
              >
                {act.type}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: '#e5e7eb' }}>{act.message}</p>
                <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
                  {act.time} · {act.date}
                </p>
              </div>

              <div
                className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                style={{ background: c.dot }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
