import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Star, Phone, Share2, ShieldCheck, CheckCircle, Key,
} from 'lucide-react';
import MapPlaceholder from '../../components/map/MapPlaceholder';
import SOSButton from '../../components/safety/SOSButton';
import Button from '../../components/common/Button';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import { useApi, apiPost } from '../../hooks/useApi';

export default function TrackRide() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const { data: bookings, loading } = useApi('/api/bookings', { pollInterval: 3000 });

  const ride = bookings?.find(r => r.id === rideId) || bookings?.find(b => b.status === 'pending' || b.status === 'accepted' || b.status === 'in_progress') || bookings?.[0] || null;

  const [sosStep, setSosStep] = useState('idle'); // idle | confirm | sent
  const [cancelDialog, setCancelDialog] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (ride?.status === 'completed') {
      navigate(`/customer/payment/${ride.id}`);
    }
  }, [ride?.status, ride?.id, navigate]);

  const handleSOSTap = () => setSosStep('confirm');
  const handleSOSConfirm = async () => {
    try {
      await apiPost('/api/sos/trigger', {
        rideId: ride?.id,
        location: { lat: 9.5912, lng: 76.5222 },
      });
    } catch (e) {
      console.error(e);
    }
    setSosStep('sent');
    setTimeout(() => navigate('/customer/sos'), 800);
  };

  const handleShare = async () => {
    try {
      await apiPost('/api/location/share', { rideId: ride?.id });
    } catch (e) {
      console.error(e);
    }
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleCancel = async () => {
    try {
      if (ride) {
        await apiPost(`/api/bookings/${ride.id}/cancel`, {});
      }
    } catch (e) {
      console.error(e);
    }
    setCancelDialog(false);
    navigate('/customer/dashboard');
  };

  if (loading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!ride) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Ride not found</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Map area */}
      <MapPlaceholder pickup={ride.pickup} destination={ride.destination} className="h-64 sm:h-80 rounded-none" />

      {/* Bottom card */}
      <div
        className="flex flex-col flex-1 overflow-y-auto px-4 sm:px-6 py-5 gap-4"
        style={{ background: '#0a0d14' }}
      >
        {/* Start Ride OTP */}
        {ride.otp && (ride.status === 'pending' || ride.status === 'accepted') && (
          <div className="flex items-center justify-between p-4 bg-[#111827] border border-[#2563eb]/40 rounded-2xl animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2563eb]/20 text-[#3b82f6] shrink-0">
                <Key size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#93c5fd] uppercase tracking-wider">Start Ride PIN</p>
                <p className="text-xs text-[#9ca3af]">Share this PIN with your driver</p>
              </div>
            </div>
            <div className="px-4 py-1.5 bg-[#1e3a5f] border border-[#2563eb] rounded-xl">
              <span className="text-2xl font-bold tracking-widest text-white font-mono">{ride.otp}</span>
            </div>
          </div>
        )}

        {/* SafeRide badge */}
        {Boolean(ride.safeRideEnabled) && (
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 animate-fade-in"
            style={{
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
            }}
          >
            <ShieldCheck size={16} style={{ color: '#16a34a' }} />
            <p className="text-sm font-medium flex-1" style={{ color: '#6ee7b7' }}>SafeRide Active</p>
            <CheckCircle size={14} style={{ color: '#16a34a' }} />
          </div>
        )}

        {/* Driver card */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: '#111827',
            border: '1px solid #1f2937',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'rgba(79,126,255,0.2)' }}
            >
              <span className="text-lg font-bold" style={{ color: '#2563eb' }}>
                {ride.driverName?.charAt(0) || '?'}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold" style={{ color: '#f9fafb' }}>{ride.driverName || 'Assigning driver...'}</p>
              <p className="text-xs" style={{ color: '#9ca3af' }}>
                {ride.vehicleModel ? `${ride.vehicleModel}${ride.vehicleNumber ? ` · ${ride.vehicleNumber}` : ''}` : (ride.status === 'pending' ? 'Searching for nearby driver...' : 'Vehicle details pending')}
              </p>
            </div>
            <div className="text-right">
              {ride.driverRating && (
                <div className="flex items-center gap-1 justify-end">
                  <Star size={13} fill="#fbbf24" style={{ color: '#fbbf24' }} />
                  <span className="text-sm font-semibold" style={{ color: '#f9fafb' }}>
                    {ride.driverRating}
                  </span>
                </div>
              )}
              <p className="text-xs font-medium mt-0.5" style={{ color: '#2563eb' }}>
                {ride.status === 'pending' ? 'Searching...' : (ride.eta || 'Pending')}
              </p>
            </div>
          </div>

          {/* Route */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#16a34a] shrink-0" />
              <p className="text-sm" style={{ color: '#e5e7eb' }}>{ride.pickup}</p>
            </div>
            <div className="ml-1 border-l-2 border-dashed h-3" style={{ borderColor: '#1f2937' }} />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2563eb] shrink-0" />
              <p className="text-sm" style={{ color: '#e5e7eb' }}>{ride.destination}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="secondary" fullWidth size="sm" onClick={handleShare}>
              <Share2 size={14} />
              {shared ? 'Shared!' : 'Share Trip'}
            </Button>
            <a href={ride.driverPhone ? `tel:${ride.driverPhone}` : '#'} className="flex-1" style={{ pointerEvents: ride.driverPhone ? 'auto' : 'none' }}>
              <Button variant="secondary" fullWidth size="sm" disabled={!ride.driverPhone}>
                <Phone size={14} />
                Call Driver
              </Button>
            </a>
            <Button variant="ghost" size="sm" onClick={() => setCancelDialog(true)}>
              Cancel
            </Button>
          </div>
        </div>

        {/* SOS */}
        <div className="flex justify-center">
          <SOSButton onClick={handleSOSTap} />
        </div>

        <ConfirmationDialog
          isOpen={sosStep === 'confirm'}
          onCancel={() => setSosStep('idle')}
          onConfirm={handleSOSConfirm}
          title="Emergency Assistance"
          message="Are you sure you want to send an SOS alert? Your emergency contacts and RideSphere admins will be notified immediately with your location."
          confirmLabel="Send SOS"
          cancelLabel="Cancel"
          variant="danger"
        />

        <ConfirmationDialog
          isOpen={cancelDialog}
          onCancel={() => setCancelDialog(false)}
          onConfirm={handleCancel}
          title="Cancel Ride?"
          message="Are you sure you want to cancel this ride? Cancellation fees may apply."
          confirmLabel="Yes, Cancel"
          cancelLabel="Keep Ride"
          variant="danger"
        />
      </div>
    </div>
  );
}
