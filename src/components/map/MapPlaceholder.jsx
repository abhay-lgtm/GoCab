import { MapPin, Navigation } from 'lucide-react';

/**
 * MapPlaceholder
 *
 * A visually convincing map mock. Replace the inner div with a real
 * map library (Leaflet, Google Maps, Mapbox) when integrating backend.
 *
 * Props:
 *   pickup    {string}
 *   destination {string}
 *   className {string}
 */
export default function MapPlaceholder({ pickup, destination, className = '' }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-[#e8edf8] map-grid ${className}`}
      role="img"
      aria-label="Map showing route"
    >
      {/* Decorative road paths */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Main road */}
        <path d="M50 250 Q150 200 200 150 Q250 100 320 60" stroke="#3b6ef8" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* Side roads */}
        <path d="M50 250 Q80 220 130 200" stroke="#3b6ef8" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M320 60 Q340 80 360 100 Q370 150 350 200" stroke="#3b6ef8" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M200 150 Q180 170 160 180 Q130 190 110 210" stroke="#6366f1" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
        <path d="M150 250 Q170 230 200 220" stroke="#3b6ef8" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.3" />
        {/* Dashed center line */}
        <path d="M50 250 Q150 200 200 150 Q250 100 320 60" stroke="white" strokeWidth="2" fill="none" strokeDasharray="8 12" strokeLinecap="round" opacity="0.6" />
        {/* Vehicle position */}
        <circle cx="175" cy="170" r="8" fill="#3b6ef8" opacity="0.9" />
        <circle cx="175" cy="170" r="14" fill="#3b6ef8" opacity="0.2" />
      </svg>

      {/* Pickup pin */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2 glass-card rounded-xl px-3 py-2 shadow-sm">
        <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center">
          <MapPin size={12} className="text-white" />
        </div>
        <span className="text-xs font-medium text-[#0a0f1e] max-w-[140px] truncate">
          {pickup || 'Pickup location'}
        </span>
      </div>

      {/* Destination pin */}
      <div className="absolute top-6 right-6 flex items-center gap-2 glass-card rounded-xl px-3 py-2 shadow-sm">
        <div className="w-6 h-6 rounded-full bg-[#3b6ef8] flex items-center justify-center">
          <Navigation size={12} className="text-white" />
        </div>
        <span className="text-xs font-medium text-[#0a0f1e] max-w-[140px] truncate">
          {destination || 'Destination'}
        </span>
      </div>

      {/* Map attribution placeholder */}
      <div className="absolute bottom-2 right-3">
        <span className="text-[9px] text-[#9ca3af]">Map integration ready</span>
      </div>
    </div>
  );
}
