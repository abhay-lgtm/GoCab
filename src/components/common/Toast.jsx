import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const config = {
  success: {
    icon: CheckCircle,
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.25)',
    icon_color: '#10b981',
    text: '#6ee7b7',
  },
  error: {
    icon: AlertCircle,
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.25)',
    icon_color: '#f87171',
    text: '#fca5a5',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.25)',
    icon_color: '#fbbf24',
    text: '#fcd34d',
  },
  info: {
    icon: Info,
    bg: 'rgba(79,126,255,0.12)',
    border: 'rgba(79,126,255,0.25)',
    icon_color: '#5b8eff',
    text: '#93b4ff',
  },
};

function Toast({ id, message, type = 'info', onRemove }) {
  const c = config[type] || config.info;
  const Icon = c.icon;

  return (
    <div
      className="flex items-start gap-3 px-4 py-3 rounded-xl shadow-xl animate-toast-in max-w-sm w-full"
      style={{
        background: 'rgba(10,15,30,0.96)',
        border: `1px solid ${c.border}`,
        backdropFilter: 'blur(16px)',
      }}
      role="alert"
    >
      <Icon size={18} className="mt-0.5 shrink-0" style={{ color: c.icon_color }} />
      <p className="text-sm font-medium flex-1" style={{ color: c.text }}>{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="opacity-40 hover:opacity-80 transition-opacity mt-0.5"
        aria-label="Dismiss"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast {...t} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
}

export default Toast;
