import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Navigation, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import LiveMap from '../../components/map/LiveMap';

export default function ShareTrack() {
  const { token } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [gone, setGone] = useState(false);

  // Use a ref for the interval so cleanup is always referencing the latest timer id
  const timerRef = useRef(null);
  const goneRef = useRef(false);

  useEffect(() => {
    // Keep ref in sync so the interval callback sees the latest value
    goneRef.current = gone;
  }, [gone]);

  useEffect(() => {
    // Define fetchData inside the effect — always fresh, no stale closure
    const fetchData = async () => {
      if (goneRef.current) return;
      try {
        const res = await fetch(`/api/location/shared/${token}`);
        if (res.status === 410) {
          setGone(true);
          clearInterval(timerRef.current);
          return;
        }
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          setError(j.message || 'Failed to load location');
          return;
        }
        const json = await res.json();
        // Use functional update so we never create a dependency on previous data
        setData(json);
        setError(null);
      } catch {
        setError('Network error – retrying…');
      }
    };

    fetchData();
    timerRef.current = setInterval(fetchData, 5000);

    return () => {
      clearInterval(timerRef.current);
    };
  // Only re-run if the token changes (i.e. a new share link)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const statusColor = {
    pending: '#f59e0b',
    accepted: '#3b82f6',
    in_progress: '#16a34a',
    completed: '#6b7280',
    cancelled: '#ef4444',
  };

  const statusLabel = {
    pending: 'Waiting for driver',
    accepted: 'Driver assigned',
    in_progress: 'Ride in progress',
    completed: 'Ride completed',
    cancelled: 'Ride cancelled',
  };

  const liveCoords = data?.location
    ? { lat: data.location.lat, lng: data.location.lng }
    : null;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#0a0d14', color: '#f9fafb', fontFamily: 'system-ui, sans-serif' }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 shrink-0"
        style={{ background: '#111827', borderBottom: '1px solid #1f2937' }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0"
          style={{ background: '#2563eb' }}
        >
          G
        </div>
        <div>
          <p className="font-bold text-sm">GoCab Live Tracking</p>
          <p className="text-xs" style={{ color: '#6b7280' }}>Shared ride location</p>
        </div>
      </div>

      {/* Ride ended */}
      {gone && (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(107,114,128,0.15)', border: '1px solid #374151' }}
          >
            <CheckCircle2 size={32} style={{ color: '#6b7280' }} />
          </div>
          <h2 className="text-xl font-bold">Ride Ended</h2>
          <p style={{ color: '#6b7280' }}>This ride has been completed. Location sharing is no longer active.</p>
        </div>
      )}

      {/* Error */}
      {!gone && error && !data && (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 px-6 text-center">
          <AlertTriangle size={32} style={{ color: '#f59e0b' }} />
          <p style={{ color: '#9ca3af' }}>{error}</p>
          <p className="text-xs" style={{ color: '#4b5563' }}>Retrying automatically…</p>
        </div>
      )}

      {/* Loading (first load only) */}
      {!gone && !error && !data && (
        <div className="flex flex-col items-center justify-center flex-1 gap-3">
          <Loader2 size={24} className="animate-spin" style={{ color: '#2563eb' }} />
          <p className="text-sm" style={{ color: '#6b7280' }}>Loading location…</p>
        </div>
      )}

      {/* Main content — only rendered once data arrives, stays mounted thereafter */}
      {!gone && data && (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Map takes majority of screen height */}
          <div style={{ height: '55vh', minHeight: 240 }}>
            <LiveMap
              pickup={data.booking?.pickup}
              destination={data.booking?.destination}
              liveCoords={liveCoords}
              className="h-full rounded-none"
            />
          </div>

          {/* Info card — scrollable */}
          <div className="overflow-y-auto px-4 py-5 flex flex-col gap-4" style={{ background: '#0a0d14' }}>
            {/* Status badge */}
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
                style={{ background: statusColor[data.booking?.status] || '#6b7280' }}
              />
              <span className="text-sm font-semibold" style={{ color: statusColor[data.booking?.status] || '#9ca3af' }}>
                {statusLabel[data.booking?.status] || data.booking?.status}
              </span>
              {data.location?.timestamp && (
                <span className="ml-auto text-xs" style={{ color: '#4b5563' }}>
                  Updated {new Date(data.location.timestamp).toLocaleTimeString()}
                </span>
              )}
              {error && (
                <span className="ml-auto text-xs" style={{ color: '#f59e0b' }}>
                  ⚠ Retrying…
                </span>
              )}
            </div>

            {/* Route */}
            <div
              className="rounded-xl p-4 flex flex-col gap-3"
              style={{ background: '#111827', border: '1px solid #1f2937' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#16a34a] flex items-center justify-center shrink-0">
                  <MapPin size={12} className="text-white" />
                </div>
                <div>
                  <p className="text-xs" style={{ color: '#6b7280' }}>Pickup</p>
                  <p className="text-sm font-semibold">{data.booking?.pickup || '—'}</p>
                </div>
              </div>
              <div className="ml-3 border-l-2 border-dashed h-3" style={{ borderColor: '#1f2937' }} />
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0">
                  <Navigation size={12} className="text-white" />
                </div>
                <div>
                  <p className="text-xs" style={{ color: '#6b7280' }}>Destination</p>
                  <p className="text-sm font-semibold">{data.booking?.destination || '—'}</p>
                </div>
              </div>
            </div>

            {/* Driver info */}
            {data.booking?.driverName && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: '#111827', border: '1px solid #1f2937' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                  style={{ background: 'rgba(37,99,235,0.15)', color: '#2563eb' }}
                >
                  {data.booking.driverName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{data.booking.driverName}</p>
                  <p className="text-xs" style={{ color: '#6b7280' }}>
                    {data.booking.vehicleModel || 'Driver'}
                    {data.booking.vehicleNumber ? ` · ${data.booking.vehicleNumber}` : ''}
                  </p>
                </div>
              </div>
            )}

            {!liveCoords && (
              <p className="text-xs text-center" style={{ color: '#4b5563' }}>
                Waiting for the rider to enable location sharing…
              </p>
            )}

            <p className="text-xs text-center pb-2" style={{ color: '#1f2937' }}>
              Powered by GoCab · Updates every 5 seconds
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
