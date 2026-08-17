import { ShieldCheck, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

const benefits = [
  'Verified driver preference',
  'Live trip sharing',
  'Emergency contacts notified',
  'One-tap SOS',
];

export default function SafeRideCard({ enabled, onToggle, compact = false }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border transition-all duration-200',
        enabled
          ? 'bg-emerald-50 border-emerald-200'
          : 'bg-white border-[#e4e8f0]'
      )}
    >
      <div className="flex items-start justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
              enabled ? 'bg-[#10b981]' : 'bg-[#f0f2f8]'
            )}
          >
            <ShieldCheck size={20} className={enabled ? 'text-white' : 'text-[#9ca3af]'} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[#0a0f1e]">SafeRide Mode</p>
              {enabled && (
                <span className="text-xs font-medium text-[#10b981] bg-emerald-100 px-1.5 py-0.5 rounded-md">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-[#4b5563] mt-0.5">Extra protection for your journey</p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={onToggle}
          aria-pressed={enabled}
          aria-label="Toggle SafeRide mode"
          className={clsx(
            'relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:ring-offset-2 shrink-0 mt-1',
            enabled ? 'bg-[#10b981]' : 'bg-[#e4e8f0]'
          )}
        >
          <span
            className={clsx(
              'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200',
              enabled && 'translate-x-5'
            )}
          />
        </button>
      </div>

      {/* Benefits — shown when enabled or not compact */}
      {!compact && (
        <div className="px-4 pb-4">
          <ul className="grid grid-cols-1 gap-1.5">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <CheckCircle
                  size={14}
                  className={enabled ? 'text-[#10b981]' : 'text-[#9ca3af]'}
                />
                <span className={`text-xs ${enabled ? 'text-emerald-800' : 'text-[#9ca3af]'}`}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
