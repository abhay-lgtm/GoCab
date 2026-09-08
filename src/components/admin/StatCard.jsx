import { clsx } from 'clsx';

export default function StatCard({ label, value, icon: Icon, trend, color = 'blue', description }) {
  const iconColors = {
    blue:   { icon: '#2563eb', bg: 'rgba(79,126,255,0.15)' },
    green:  { icon: '#16a34a', bg: 'rgba(16,185,129,0.15)' },
    red:    { icon: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
    indigo: { icon: '#818cf8', bg: 'rgba(99,102,241,0.15)' },
    navy:   { icon: '#d1d5db', bg: '#1f2937' },
    amber:  { icon: '#fbbf24', bg: 'rgba(245,158,11,0.15)' },
  };
  const c = iconColors[color] || iconColors.blue;

  return (
    <div
      className="rounded p-5 transition-all duration-200"
      style={{
        background: '#111827',
        border: '1px solid #1f2937',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(79,126,255,0.25)';
        e.currentTarget.style.background = '#1f2937';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#1f2937';
        e.currentTarget.style.background = '#111827';
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded flex items-center justify-center"
          style={{ background: c.bg }}
        >
          {Icon && <Icon size={20} style={{ color: c.icon }} />}
        </div>
        {trend !== undefined && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-lg"
            style={
              trend >= 0
                ? { color: '#16a34a', background: '#111827' }
                : { color: '#ef4444', background: '#111827' }
            }
          >
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold tabular-nums" style={{ color: '#f9fafb' }}>
        {value}
      </p>
      <p className="text-sm mt-0.5" style={{ color: '#9ca3af' }}>{label}</p>
      {description && (
        <p className="text-xs mt-1" style={{ color: '#6b7280' }}>{description}</p>
      )}
    </div>
  );
}
