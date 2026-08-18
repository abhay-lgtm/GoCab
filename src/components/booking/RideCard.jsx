import { MapPin, Navigation, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatRelativeDate } from '../../utils/formatDate';

const cardStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  padding: 16,
  transition: 'border-color 0.2s, background 0.2s',
  cursor: 'pointer',
};

export default function RideCard({ ride, linkTo }) {
  const card = (
    <div
      style={cardStyle}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(79,126,255,0.3)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {formatRelativeDate(ride.date)}
            </span>
            {ride.time && (
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                · {ride.time}
              </span>
            )}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" />
              <p className="text-sm font-medium truncate" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {ride.pickup}
              </p>
            </div>
            <div className="ml-1 border-l-2 border-dashed h-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#4f7eff] shrink-0" />
              <p className="text-sm truncate" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {ride.destination}
              </p>
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-base font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
            {formatCurrency(ride.total)}
          </p>
          <StatusBadge status={ride.status} className="mt-1" />
        </div>
      </div>
      {ride.driverName && (
        <div
          className="flex items-center gap-3 pt-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(79,126,255,0.2)' }}
          >
            <span className="text-[10px] font-bold" style={{ color: '#5b8eff' }}>
              {ride.driverName.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {ride.driverName}
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {ride.vehicleModel}
            </p>
          </div>
          {ride.distance && (
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {ride.distance}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (linkTo) return <Link to={linkTo}>{card}</Link>;
  return card;
}
