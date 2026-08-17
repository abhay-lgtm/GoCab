import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#f0f2f8] flex items-center justify-center mb-4">
        <Icon size={24} className="text-[#9ca3af]" />
      </div>
      <h3 className="text-base font-semibold text-[#0a0f1e] mb-1">{title}</h3>
      {message && <p className="text-sm text-[#9ca3af] max-w-xs">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
