import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Star, Phone, Share2, ShieldCheck, AlertTriangle, CheckCircle,
  MapPin, Navigation, Clock,
} from 'lucide-react';
import { mockRides } from '../../data/mockData';
import MapPlaceholder from '../../components/map/MapPlaceholder';
import SOSButton from '../../components/safety/SOSButton';
import Button from '../../components/common/Button';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';

export default function TrackRide() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const ride = mockRides.find(r => r.id === rideId) || mockRides[0];

  const [sosStep, setSosStep] = useState('idle'); // idle | confirm | sent
  const [cancelDialog, setCancelDialog] = useState(false);
  const [shared, setShared] = useState(false);

  const handleSOSTap = () => setSosStep('confirm');
  const handleSOSConfirm = () => {
    setSosStep('sent');
    setTimeout(() => navigate(`/customer/sos`), 800);
  };

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleCancel = () => {
    setCancelDialog(false);
    navigate('/customer/dashboard');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Map area */}
      <MapPlaceholder pickup={ride.pickup} destination={ride.destination} className="h-64 sm:h-80 rounded-none" />

      {/* Bottom card */}
      <div className="flex-1 overflow-y-auto bg-[#f8f9fc] px-4 sm:px-6 py-5 space-y-4">
        {/* SafeRide badge */}
        {ride.safeRideEnabled && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 animate-fade-in">
            <ShieldCheck size={16} className="text-[#10b981]" />
            <p className="text-sm font-medium text-emerald-800">SafeRide Active</p>
            <CheckCircle size={14} className="text-[#10b981] ml-auto" />
          </div>
        )}

        {/* Driver card */}
        <div className="bg-white rounded-2xl border border-[#e4e8f0] p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#0a0f1e] flex items-center justify-center shrink-0">
              <span className="text-lg font-bold text-white">
                {ride.driverName.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#0a0f1e]">{ride.driverName}</p>
              <p className="text-xs text-[#9ca3af]">{ride.vehicleModel} · {ride.vehicleNumber}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-amber-500 justify-end">
                <Star size={13} fill="currentColor" />
                <span className="text-sm font-semibold text-[#0a0f1e]">{ride.driverRating}</span>
              </div>
              <p className="text-xs text-[#3b6ef8] font-medium mt-0.5">{ride.eta} away</p>
            </div>
          </div>

          {/* Route */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" />
              <p className="text-sm text-[#0a0f1e]">{ride.pickup}</p>
            </div>
            <div className="ml-1 border-l-2 border-dashed border-[#e4e8f0] h-3" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3b6ef8] shrink-0" />
              <p className="text-sm text-[#0a0f1e]">{ride.destination}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="secondary" fullWidth size="sm" onClick={handleShare}>
              <Share2 size={14} />
              {shared ? 'Shared!' : 'Share Trip'}
            </Button>
            <a href={`tel:${ride.driverPhone}`} className="flex-1">
              <Button variant="secondary" fullWidth size="sm">
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

        {/* SOS confirm dialog */}
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

        {/* Cancel dialog */}
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
