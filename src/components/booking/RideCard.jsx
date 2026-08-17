import { MapPin, Navigation, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatRelativeDate } from '../../utils/formatDate';

export default function RideCard({ ride, linkTo }) {
  const card = (
    <div className="group p-4 rounded-2xl bg-white border border-[#e4e8f0] hover:border-[#3b6ef8]/40 hover:shadow-sm transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs text-[#9ca3af]">{formatRelativeDate(ride.date)}</span>
            {ride.time && <span className="text-xs text-[#9ca3af]">· {ride.time}</span>}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" />
              <p className="text-sm font-medium text-[#0a0f1e] truncate">{ride.pickup}</p>
            </div>
            <div className="ml-1 border-l-2 border-dashed border-[#e4e8f0] h-3" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3b6ef8] shrink-0" />
              <p className="text-sm text-[#4b5563] truncate">{ride.destination}</p>
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-base font-semibold text-[#0a0f1e]">{formatCurrency(ride.total)}</p>
          <StatusBadge status={ride.status} className="mt-1" />
        </div>
      </div>
      {ride.driverName && (
        <div className="flex items-center gap-3 pt-3 border-t border-[#f0f2f8]">
          <div className="w-7 h-7 rounded-full bg-[#0a0f1e] flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">
              {ride.driverName.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#0a0f1e]">{ride.driverName}</p>
            <p className="text-xs text-[#9ca3af]">{ride.vehicleModel}</p>
          </div>
          {ride.distance && (
            <span className="text-xs text-[#9ca3af]">{ride.distance}</span>
          )}
        </div>
      )}
    </div>
  );

  if (linkTo) return <Link to={linkTo}>{card}</Link>;
  return card;
}
