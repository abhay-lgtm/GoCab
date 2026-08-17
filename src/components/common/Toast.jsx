import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const config = {
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-50 border-emerald-200',
    icon_color: 'text-[#10b981]',
    text: 'text-emerald-800',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-red-50 border-red-200',
    icon_color: 'text-[#ef4444]',
    text: 'text-red-800',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50 border-amber-200',
    icon_color: 'text-amber-500',
    text: 'text-amber-800',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50 border-blue-200',
    icon_color: 'text-[#3b6ef8]',
    text: 'text-blue-800',
  },
};

function Toast({ id, message, type = 'info', onRemove }) {
  const { icon: Icon, bg, icon_color, text } = config[type] || config.info;

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg animate-toast-in ${bg} max-w-sm w-full`}
      role="alert"
    >
      <Icon size={18} className={`mt-0.5 shrink-0 ${icon_color}`} />
      <p className={`text-sm font-medium flex-1 ${text}`}>{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="text-current opacity-50 hover:opacity-100 transition-opacity mt-0.5"
        aria-label="Dismiss"
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
