import { AlertTriangle } from 'lucide-react';

/**
 * SOSButton — large emergency button.
 * Requires two taps: first tap opens confirmation, handled by parent.
 */
export default function SOSButton({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      aria-label="SOS Emergency"
      className={`relative flex items-center justify-center gap-2 font-bold text-sm tracking-widest uppercase rounded-2xl px-8 py-3.5 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${className}`}
      style={{
        background: 'rgba(239,68,68,0.1)',
        border: '2px solid rgba(239,68,68,0.5)',
        color: '#f87171',
        boxShadow: '0 0 30px rgba(239,68,68,0.15)',
        focusRingOffsetColor: '#05091a',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
        e.currentTarget.style.borderColor = '#ef4444';
        e.currentTarget.style.boxShadow = '0 0 40px rgba(239,68,68,0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
        e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(239,68,68,0.15)';
      }}
    >
      <AlertTriangle size={18} />
      SOS
    </button>
  );
}
