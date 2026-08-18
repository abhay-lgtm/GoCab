import { ShieldCheck, MapPin, Navigation, IndianRupee } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';

export default function RideRequestCard({ request, onAccept, onReject }) {
  return (
    <div
      className="rounded-2xl overflow-hidden animate-slide-up"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: 'rgba(79,126,255,0.1)', borderBottom: '1px solid rgba(79,126,255,0.15)' }}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>
            New Ride Request
          </p>
          <p className="text-sm font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.9)' }}>
            {request.customerName}
          </p>
        </div>
        {request.safeRideEnabled && (
          <span
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg"
            style={{ color: '#10b981', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}
          >
            <ShieldCheck size={12} />
            SafeRide
          </span>
        )}
      </div>

      {/* Route */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <MapPin size={13} style={{ color: '#10b981' }} />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Pickup
            </p>
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {request.pickup}
            </p>
          </div>
        </div>
        <div
          className="ml-3.5 border-l-2 border-dashed h-4"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        />
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(79,126,255,0.15)', border: '1px solid rgba(79,126,255,0.2)' }}
          >
            <Navigation size={13} style={{ color: '#5b8eff' }} />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Destination
            </p>
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {request.destination}
            </p>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 px-4 pb-4">
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
          <Navigation size={12} />
          {request.distance}
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
          <IndianRupee size={12} />
          {formatCurrency(request.estimatedFare)}
        </div>
      </div>

      {/* Actions */}
      <div
        className="flex gap-2 p-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
      >
        <Button variant="secondary" fullWidth size="md" onClick={() => onReject(request.id)}>
          Reject
        </Button>
        <Button variant="primary" fullWidth size="md" onClick={() => onAccept(request.id)}>
          Accept
        </Button>
      </div>
    </div>
  );
}
