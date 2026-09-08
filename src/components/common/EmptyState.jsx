import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div
        className="w-14 h-14 rounded flex items-center justify-center mb-4"
        style={{ background: '#111827', border: '1px solid #1f2937' }}
      >
        <Icon size={24} style={{ color: '#6b7280' }} />
      </div>
      <h3 className="text-base font-semibold mb-1" style={{ color: '#f9fafb' }}>{title}</h3>
      {message && (
        <p className="text-sm max-w-xs" style={{ color: '#9ca3af' }}>{message}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
