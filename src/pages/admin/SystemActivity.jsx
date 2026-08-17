import { mockSystemActivity } from '../../data/mockData';
import { Activity, ShoppingBag, Car, CreditCard, UserPlus, XCircle } from 'lucide-react';

const typeConfig = {
  booking: { icon: ShoppingBag, color: 'text-[#3b6ef8]', bg: 'bg-blue-50' },
  sos: { icon: Activity, color: 'text-[#ef4444]', bg: 'bg-red-50' },
  driver: { icon: Car, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  payment: { icon: CreditCard, color: 'text-[#10b981]', bg: 'bg-emerald-50' },
  registration: { icon: UserPlus, color: 'text-amber-600', bg: 'bg-amber-50' },
  cancellation: { icon: XCircle, color: 'text-[#9ca3af]', bg: 'bg-[#f0f2f8]' },
};

export default function SystemActivity() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0a0f1e]">System Activity</h1>
        <p className="text-sm text-[#9ca3af]">Live platform event log</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#e4e8f0] divide-y divide-[#f0f2f8]">
        {mockSystemActivity.map((act) => {
          const { icon: Icon, color, bg } = typeConfig[act.type] || typeConfig.booking;
          return (
            <div key={act.id} className="flex items-start gap-4 px-5 py-4 hover:bg-[#f8f9fc] transition-colors">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={16} className={color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#0a0f1e]">{act.message}</p>
                <p className="text-xs text-[#9ca3af] mt-0.5">{act.time} · {act.date}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${bg} ${color} shrink-0`}>
                {act.type}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
