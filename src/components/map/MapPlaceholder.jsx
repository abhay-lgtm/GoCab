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
      className={`relative w-full overflow-hidden rounded ${className}`}
      style={{
        backgroundColor: '#0a0d14',
        backgroundImage: 'linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
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
        <path d="M50 250 Q150 200 200 150 Q250 100 320 60" stroke="#2563eb" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Side roads */}
        <path d="M50 250 Q80 220 130 200" stroke="#2563eb" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
        <path d="M320 60 Q340 80 360 100 Q370 150 350 200" stroke="#2563eb" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
        <path d="M200 150 Q180 170 160 180 Q130 190 110 210" stroke="#8b5cf6" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.35" />
        <path d="M150 250 Q170 230 200 220" stroke="#2563eb" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.25" />
        {/* Dashed center line */}
        <path d="M50 250 Q150 200 200 150 Q250 100 320 60" stroke="#6b7280" strokeWidth="1.5" fill="none" strokeDasharray="8 12" strokeLinecap="round" />
        {/* Vehicle position */}
        <circle cx="175" cy="170" r="7" fill="#2563eb" opacity="0.95" />
        <circle cx="175" cy="170" r="14" fill="#2563eb" opacity="0.15" />
        <circle cx="175" cy="170" r="22" fill="#2563eb" opacity="0.07" />
      </svg>

      {/* Pickup pin */}
      <div
        className="absolute bottom-6 left-6 flex items-center gap-2 rounded px-3 py-2"
        style={{
          background: '#111827',
          border: '1px solid #1f2937'
        }}
      >
        <div className="w-6 h-6 rounded flex items-center justify-center bg-[#16a34a]">
          <MapPin size={12} className="text-white" />
        </div>
        <span
          className="text-xs font-medium max-w-[140px] truncate"
          style={{ color: '#f9fafb' }}
        >
          {pickup || 'Pickup location'}
        </span>
      </div>

      {/* Destination pin */}
      <div
        className="absolute top-6 right-6 flex items-center gap-2 rounded px-3 py-2"
        style={{
          background: '#111827',
          border: '1px solid #1f2937'
        }}
      >
        <div className="w-6 h-6 rounded flex items-center justify-center bg-[#2563eb]">
          <Navigation size={12} className="text-white" />
        </div>
        <span
          className="text-xs font-medium max-w-[140px] truncate"
          style={{ color: '#f9fafb' }}
        >
          {destination || 'Destination'}
        </span>
      </div>

      {/* Map attribution placeholder */}
      <div className="absolute bottom-2 right-3">
        <span className="text-[9px]" style={{ color: '#4b5563' }}>Map integration ready</span>
      </div>
    </div>
  );
}
