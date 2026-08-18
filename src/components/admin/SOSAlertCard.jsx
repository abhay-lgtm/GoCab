import { Phone, Eye, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';

export default function SOSAlertCard({ alert, onResolve, onViewRide }) {
  const isActive = alert.status === 'active';

  return (
    <div
      className="rounded-2xl p-4 transition-all duration-200"
      style={{
        background: isActive ? 'rgba(239,68,68,0.07)' : 'rgba(255,255,255,0.04)',
        border: isActive ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(255,255,255,0.08)',
      }}
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
          <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
            {alert.customerName}
          </p>
        </div>
        <StatusBadge status={alert.status} />
      </div>

      {/* Details */}
      <div className="space-y-1.5 mb-3">
        {[
          { label: 'Ride', value: alert.rideId?.toUpperCase() },
          { label: 'Driver', value: alert.driverName },
          { label: 'Location', value: alert.location, truncate: true },
          { label: 'Time', value: `${alert.time} · ${alert.date}` },
        ].map(({ label, value, truncate }) => (
          <div key={label} className="flex items-start gap-2">
            <span className="text-xs w-16 shrink-0 pt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {label}
            </span>
            <span
              className={`text-xs ${truncate ? 'line-clamp-1' : ''}`}
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div
        className="flex flex-wrap gap-2 pt-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
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
