import { ShieldCheck, MapPin, Navigation, Clock, IndianRupee } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';

export default function RideRequestCard({ request, onAccept, onReject }) {
  return (
    <div className="rounded-2xl bg-white border border-[#e4e8f0] overflow-hidden shadow-sm animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f1e]">
        <div>
          <p className="text-xs text-white/50 font-medium uppercase tracking-wide">New Ride Request</p>
          <p className="text-sm font-semibold text-white mt-0.5">{request.customerName}</p>
        </div>
        {request.safeRideEnabled && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-[#10b981] bg-emerald-900/40 px-2.5 py-1 rounded-lg">
            <ShieldCheck size={12} />
            SafeRide
          </span>
        )}
      </div>

      {/* Route */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
            <MapPin size={13} className="text-[#10b981]" />
          </div>
          <div>
            <p className="text-[10px] text-[#9ca3af] font-medium uppercase tracking-wide">Pickup</p>
            <p className="text-sm font-medium text-[#0a0f1e]">{request.pickup}</p>
          </div>
        </div>
        <div className="ml-3.5 border-l-2 border-dashed border-[#e4e8f0] h-4" />
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
            <Navigation size={13} className="text-[#3b6ef8]" />
          </div>
          <div>
            <p className="text-[10px] text-[#9ca3af] font-medium uppercase tracking-wide">Destination</p>
            <p className="text-sm font-medium text-[#0a0f1e]">{request.destination}</p>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 px-4 pb-4">
        <div className="flex items-center gap-1.5 text-xs text-[#4b5563]">
          <Navigation size={12} />
          {request.distance}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0a0f1e]">
          <IndianRupee size={12} />
          {formatCurrency(request.estimatedFare)}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 p-3 border-t border-[#f0f2f8] bg-[#f8f9fc]">
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
