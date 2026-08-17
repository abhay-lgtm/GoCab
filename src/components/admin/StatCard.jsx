import { clsx } from 'clsx';

export default function StatCard({ label, value, icon: Icon, trend, color = 'blue', description }) {
  const colors = {
    blue: { bg: 'bg-blue-50', icon: 'text-[#3b6ef8]', iconBg: 'bg-[#3b6ef8]/10' },
    green: { bg: 'bg-emerald-50', icon: 'text-[#10b981]', iconBg: 'bg-emerald-100' },
    red: { bg: 'bg-red-50', icon: 'text-[#ef4444]', iconBg: 'bg-red-100' },
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', iconBg: 'bg-indigo-100' },
    navy: { bg: 'bg-[#0a0f1e]/5', icon: 'text-[#0a0f1e]', iconBg: 'bg-[#0a0f1e]/10' },
  };
  const c = colors[color] || colors.blue;

  return (
    <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5 hover:border-[#3b6ef8]/30 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center`}>
          {Icon && <Icon size={20} className={c.icon} />}
        </div>
        {trend !== undefined && (
          <span
            className={clsx(
              'text-xs font-medium px-2 py-0.5 rounded-lg',
              trend >= 0 ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'
            )}
          >
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-[#0a0f1e] tabular-nums">{value}</p>
      <p className="text-sm text-[#4b5563] mt-0.5">{label}</p>
      {description && <p className="text-xs text-[#9ca3af] mt-1">{description}</p>}
    </div>
  );
}
