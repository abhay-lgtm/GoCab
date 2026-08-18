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
      className="rounded-2xl transition-all duration-200"
      style={{
        background: enabled ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.04)',
        border: enabled ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-start justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: enabled ? '#10b981' : 'rgba(255,255,255,0.07)' }}
          >
            <ShieldCheck size={20} className={enabled ? 'text-white' : ''} style={enabled ? {} : { color: 'rgba(255,255,255,0.3)' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>SafeRide Mode</p>
              {enabled && (
                <span
                  className="text-xs font-medium px-1.5 py-0.5 rounded-md"
                  style={{ color: '#10b981', background: 'rgba(16,185,129,0.15)' }}
                >
                  Active
                </span>
              )}
            </div>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Extra protection for your journey
            </p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={onToggle}
          aria-pressed={enabled}
          aria-label="Toggle SafeRide mode"
          className="relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:ring-offset-2 shrink-0 mt-1"
          style={{
            background: enabled ? '#10b981' : 'rgba(255,255,255,0.12)',
            focusRingOffset: '#05091a',
          }}
        >
          <span
            className={clsx(
              'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200',
              enabled && 'translate-x-5'
            )}
          />
        </button>
      </div>

      {/* Benefits */}
      {!compact && (
        <div className="px-4 pb-4">
          <ul className="grid grid-cols-1 gap-1.5">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <CheckCircle
                  size={14}
                  style={{ color: enabled ? '#10b981' : 'rgba(255,255,255,0.2)' }}
                />
                <span
                  className="text-xs"
                  style={{ color: enabled ? 'rgba(110,231,183,0.9)' : 'rgba(255,255,255,0.3)' }}
                >
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
