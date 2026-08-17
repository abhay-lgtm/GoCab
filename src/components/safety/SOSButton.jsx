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
      className={`
        relative group flex items-center justify-center gap-2
        bg-white border-2 border-[#ef4444] text-[#ef4444]
        font-bold text-sm tracking-widest uppercase
        rounded-2xl px-6 py-3
        hover:bg-[#ef4444] hover:text-white
        active:scale-95
        transition-all duration-200
        shadow-sm hover:shadow-md hover:shadow-red-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2
        ${className}
      `}
    >
      <AlertTriangle size={18} />
      SOS
    </button>
  );
}
