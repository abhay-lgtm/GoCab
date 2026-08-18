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
      className={`relative w-full overflow-hidden rounded-2xl map-grid ${className}`}
      style={{ background: '#080d1f' }}
      role="img"
      aria-label="Map showing route"
    >
      {/* Decorative road paths */}
      <svg
        className="absolute inset-0 w-full h-full opacity-50"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Main road */}
        <path d="M50 250 Q150 200 200 150 Q250 100 320 60" stroke="#4f7eff" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Side roads */}
        <path d="M50 250 Q80 220 130 200" stroke="#4f7eff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
        <path d="M320 60 Q340 80 360 100 Q370 150 350 200" stroke="#4f7eff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
        <path d="M200 150 Q180 170 160 180 Q130 190 110 210" stroke="#a78bfa" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.35" />
        <path d="M150 250 Q170 230 200 220" stroke="#4f7eff" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.25" />
        {/* Dashed center line */}
        <path d="M50 250 Q150 200 200 150 Q250 100 320 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="8 12" strokeLinecap="round" />
        {/* Vehicle position */}
        <circle cx="175" cy="170" r="7" fill="#4f7eff" opacity="0.95" />
        <circle cx="175" cy="170" r="14" fill="#4f7eff" opacity="0.15" />
        <circle cx="175" cy="170" r="22" fill="#4f7eff" opacity="0.07" />
      </svg>

      {/* Pickup pin */}
      <div
        className="absolute bottom-6 left-6 flex items-center gap-2 rounded-xl px-3 py-2 shadow-lg"
        style={{
          background: 'rgba(10,15,30,0.85)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center">
          <MapPin size={12} className="text-white" />
        </div>
        <span
          className="text-xs font-medium max-w-[140px] truncate"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {pickup || 'Pickup location'}
        </span>
      </div>

      {/* Destination pin */}
      <div
        className="absolute top-6 right-6 flex items-center gap-2 rounded-xl px-3 py-2 shadow-lg"
        style={{
          background: 'rgba(10,15,30,0.85)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="w-6 h-6 rounded-full bg-[#4f7eff] flex items-center justify-center">
          <Navigation size={12} className="text-white" />
        </div>
        <span
          className="text-xs font-medium max-w-[140px] truncate"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {destination || 'Destination'}
        </span>
      </div>

      {/* Map attribution placeholder */}
      <div className="absolute bottom-2 right-3">
        <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>Map integration ready</span>
      </div>
    </div>
  );
}
