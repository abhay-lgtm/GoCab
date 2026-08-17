import { Phone, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';

export default function SOSAlertCard({ alert, onResolve, onViewRide }) {
  const isActive = alert.status === 'active';

  return (
    <div
      className={`rounded-2xl border p-4 transition-all duration-200 ${
        isActive ? 'bg-red-50 border-red-200' : 'bg-white border-[#e4e8f0]'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {isActive && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ef4444]" />
            </span>
          )}
          <p className="text-sm font-semibold text-[#0a0f1e]">{alert.customerName}</p>
        </div>
        <StatusBadge status={alert.status} />
      </div>

      {/* Details */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-start gap-2">
          <span className="text-xs text-[#9ca3af] w-16 shrink-0 pt-0.5">Ride</span>
          <span className="text-xs font-medium text-[#0a0f1e]">{alert.rideId?.toUpperCase()}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xs text-[#9ca3af] w-16 shrink-0 pt-0.5">Driver</span>
          <span className="text-xs text-[#0a0f1e]">{alert.driverName}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xs text-[#9ca3af] w-16 shrink-0 pt-0.5">Location</span>
          <span className="text-xs text-[#0a0f1e] line-clamp-1">{alert.location}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xs text-[#9ca3af] w-16 shrink-0">Time</span>
          <span className="text-xs text-[#0a0f1e]">{alert.time} · {alert.date}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-current/10">
        <Button variant="ghost" size="sm" onClick={() => onViewRide?.(alert.rideId)}>
          <Eye size={14} />
          View Ride
        </Button>
        <a href={`tel:${alert.customerPhone}`}>
          <Button variant="ghost" size="sm">
            <Phone size={14} />
            Customer
          </Button>
        </a>
        <a href={`tel:${alert.driverPhone}`}>
          <Button variant="ghost" size="sm">
            <Phone size={14} />
            Driver
          </Button>
        </a>
        {isActive && (
          <Button variant="safety" size="sm" onClick={() => onResolve?.(alert.id)}>
            <CheckCircle size={14} />
            Resolve
          </Button>
        )}
      </div>
    </div>
  );
}
