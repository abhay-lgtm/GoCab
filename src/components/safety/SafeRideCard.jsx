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
      className="rounded transition-all duration-200"
      style={{
        background: enabled ? 'rgba(16,185,129,0.08)' : '#111827',
        border: enabled ? '1px solid rgba(16,185,129,0.25)' : '1px solid #1f2937',
      }}
    >
      <div className="flex items-start justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded flex items-center justify-center shrink-0"
            style={{ background: enabled ? '#16a34a' : '#1f2937' }}
          >
            <ShieldCheck size={20} className={enabled ? 'text-white' : ''} style={enabled ? {} : { color: '#6b7280' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold" style={{ color: '#f9fafb' }}>SafeRide Mode</p>
              {enabled && (
                <span
                  className="text-xs font-medium px-1.5 py-0.5 rounded-md"
                  style={{ color: '#16a34a', background: '#111827' }}
                >
                  Active
                </span>
              )}
            </div>
            <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>
              Extra protection for your journey
            </p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={onToggle}
          aria-pressed={enabled}
          aria-label="Toggle SafeRide mode"
          className="relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2 shrink-0 mt-1"
          style={{
            background: enabled ? '#16a34a' : '#374151',
            focusRingOffset: '#0a0d14',
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
                  style={{ color: enabled ? '#16a34a' : '#4b5563' }}
                />
                <span
                  className="text-xs"
                  style={{ color: enabled ? 'rgba(110,231,183,0.9)' : '#6b7280' }}
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
