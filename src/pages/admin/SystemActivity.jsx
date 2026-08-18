import { Activity } from 'lucide-react';
import { mockSystemActivity } from '../../data/mockData';

const typeColors = {
  sos:     { bg: 'rgba(239,68,68,0.12)',   dot: '#ef4444',   text: '#f87171'  },
  booking: { bg: 'rgba(79,126,255,0.12)',  dot: '#4f7eff',   text: '#5b8eff'  },
  payment: { bg: 'rgba(16,185,129,0.12)', dot: '#10b981',   text: '#10b981'  },
  user:    { bg: 'rgba(167,139,250,0.12)', dot: '#a78bfa',   text: '#a78bfa'  },
  system:  { bg: 'rgba(255,255,255,0.06)', dot: 'rgba(255,255,255,0.3)', text: 'rgba(255,255,255,0.4)' },
};

export default function SystemActivity() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(79,126,255,0.15)', border: '1px solid rgba(79,126,255,0.2)' }}
        >
          <Activity size={20} style={{ color: '#5b8eff' }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
            System Activity
          </h1>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {mockSystemActivity.length} recent events
          </p>
        </div>
      </div>

      {/* Activity feed */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {mockSystemActivity.map((act, idx) => {
          const c = typeColors[act.type] || typeColors.system;
          return (
            <div
              key={act.id}
              className="flex items-start gap-4 px-5 py-4 transition-colors"
              style={{
                borderBottom: idx < mockSystemActivity.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
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
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{act.message}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
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
