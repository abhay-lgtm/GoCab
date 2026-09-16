import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function makeLiveIcon() {
  return L.divIcon({
    className: '',
    html: '<div class="live-dot"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

export default function LiveMap({
  pickup,
  destination,
  pickupCoords,
  dropoffCoords,
  liveCoords,
  className = '',
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const liveMarkerRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const dropoffMarkerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up any previous leaflet instance on this DOM node
    if (containerRef.current._leaflet_id) {
      delete containerRef.current._leaflet_id;
    }

    const defaultCenter = [9.5916, 76.5222]; // Kottayam default
    const map = L.map(containerRef.current, {
      center: defaultCenter,
      zoom: 13,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      liveMarkerRef.current = null;
      pickupMarkerRef.current = null;
      dropoffMarkerRef.current = null;
    };
  }, []);

  // Update pickup marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.remove();
      pickupMarkerRef.current = null;
    }

    if (pickupCoords?.lat && pickupCoords?.lng) {
      const greenIcon = L.divIcon({
        className: '',
        html: '<div style="width:14px;height:14px;border-radius:50%;background:#16a34a;border:2.5px solid #fff;box-shadow:0 0 6px rgba(22,163,74,0.8)"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      pickupMarkerRef.current = L.marker([pickupCoords.lat, pickupCoords.lng], { icon: greenIcon })
        .addTo(map)
        .bindPopup(`<b>Pickup</b><br/>${pickup || ''}`);
    }
  }, [pickupCoords?.lat, pickupCoords?.lng, pickup]);

  // Update dropoff marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (dropoffMarkerRef.current) {
      dropoffMarkerRef.current.remove();
      dropoffMarkerRef.current = null;
    }

    if (dropoffCoords?.lat && dropoffCoords?.lng) {
      const blueIcon = L.divIcon({
        className: '',
        html: '<div style="width:14px;height:14px;border-radius:50%;background:#2563eb;border:2.5px solid #fff;box-shadow:0 0 6px rgba(37,99,235,0.8)"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      dropoffMarkerRef.current = L.marker([dropoffCoords.lat, dropoffCoords.lng], { icon: blueIcon })
        .addTo(map)
        .bindPopup(`<b>Destination</b><br/>${destination || ''}`);
    }
  }, [dropoffCoords?.lat, dropoffCoords?.lng, destination]);

  // Fit bounds when markers change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const bounds = [];
    if (pickupCoords?.lat && pickupCoords?.lng) bounds.push([pickupCoords.lat, pickupCoords.lng]);
    if (dropoffCoords?.lat && dropoffCoords?.lng) bounds.push([dropoffCoords.lat, dropoffCoords.lng]);
    if (liveCoords?.lat && liveCoords?.lng) bounds.push([liveCoords.lat, liveCoords.lng]);

    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 14);
    }
  }, [pickupCoords?.lat, pickupCoords?.lng, dropoffCoords?.lat, dropoffCoords?.lng]);

  // Update live marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !liveCoords?.lat || !liveCoords?.lng) return;

    if (liveMarkerRef.current) {
      liveMarkerRef.current.setLatLng([liveCoords.lat, liveCoords.lng]);
    } else {
      liveMarkerRef.current = L.marker([liveCoords.lat, liveCoords.lng], {
        icon: makeLiveIcon(),
      }).addTo(map);
    }
  }, [liveCoords?.lat, liveCoords?.lng]);

  return (
    <>
      <style>{`
        .live-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f97316;
          border: 2px solid #fff;
          box-shadow: 0 0 0 0 rgba(249,115,22,0.6);
          animation: livePulse 1.5s infinite;
        }
        @keyframes livePulse {
          0%   { box-shadow: 0 0 0 0 rgba(249,115,22,0.6); }
          70%  { box-shadow: 0 0 0 12px rgba(249,115,22,0); }
          100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
        }
        .leaflet-container {
          background: #0a0d14;
          z-index: 0;
        }
      `}</style>
      <div
        ref={containerRef}
        className={`relative w-full rounded overflow-hidden ${className}`}
        style={{ minHeight: 220 }}
      />
    </>
  );
}
