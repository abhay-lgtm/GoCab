import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <Icon size={24} style={{ color: 'rgba(255,255,255,0.3)' }} />
      </div>
      <h3 className="text-base font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{title}</h3>
      {message && (
        <p className="text-sm max-w-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{message}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
