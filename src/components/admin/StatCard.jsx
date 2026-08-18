import { clsx } from 'clsx';

export default function StatCard({ label, value, icon: Icon, trend, color = 'blue', description }) {
  const iconColors = {
    blue:   { icon: '#5b8eff', bg: 'rgba(79,126,255,0.15)' },
    green:  { icon: '#10b981', bg: 'rgba(16,185,129,0.15)' },
    red:    { icon: '#f87171', bg: 'rgba(239,68,68,0.15)' },
    indigo: { icon: '#818cf8', bg: 'rgba(99,102,241,0.15)' },
    navy:   { icon: 'rgba(255,255,255,0.6)', bg: 'rgba(255,255,255,0.08)' },
    amber:  { icon: '#fbbf24', bg: 'rgba(245,158,11,0.15)' },
  };
  const c = iconColors[color] || iconColors.blue;

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(79,126,255,0.25)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: c.bg }}
        >
          {Icon && <Icon size={20} style={{ color: c.icon }} />}
        </div>
        {trend !== undefined && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-lg"
            style={
              trend >= 0
                ? { color: '#10b981', background: 'rgba(16,185,129,0.12)' }
                : { color: '#f87171', background: 'rgba(239,68,68,0.12)' }
            }
          >
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold tabular-nums" style={{ color: 'rgba(255,255,255,0.92)' }}>
        {value}
      </p>
      <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</p>
      {description && (
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>{description}</p>
      )}
    </div>
  );
}
