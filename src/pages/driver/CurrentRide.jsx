import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MapPin, Navigation, Phone, ShieldCheck, CheckCircle, Play, Flag,
} from 'lucide-react';
import { mockRides } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';
import MapPlaceholder from '../../components/map/MapPlaceholder';
import Button from '../../components/common/Button';

const statusFlow = ['accepted', 'started', 'completed'];

export default function DriverCurrentRide() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const ride = mockRides.find(r => r.id === rideId) || mockRides.find(r => r.id === 'r5');
  const [status, setStatus] = useState('accepted');
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setStatus('started');
  };

  const handleComplete = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setStatus('completed');
  };

  if (status === 'completed') {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16 text-center animate-slide-up">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-[#10b981]" />
        </div>
        <h1 className="text-2xl font-bold text-[#0a0f1e] mb-2">Ride Completed!</h1>
        <p className="text-[#4b5563] mb-1">Fare earned</p>
        <p className="text-4xl font-bold text-[#0a0f1e] mb-6">{formatCurrency(ride?.total || 320)}</p>
        <div className="bg-white rounded-2xl border border-[#e4e8f0] p-4 text-left space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-[#4b5563]">Passenger</span>
            <span className="font-medium">{ride?.customerName || 'Abhay Prasad'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#4b5563]">Route</span>
            <span className="font-medium text-right max-w-[55%]">{ride?.pickup} → {ride?.destination}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#4b5563]">Distance</span>
            <span className="font-medium">{ride?.distance}</span>
          </div>
        </div>
        <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/driver/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <MapPlaceholder pickup={ride?.pickup} destination={ride?.destination} className="h-56 sm:h-72 rounded-none" />

      <div className="flex-1 overflow-y-auto bg-[#f8f9fc] px-4 sm:px-6 py-5 space-y-4">
        {/* Status */}
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${status === 'started' ? 'bg-[#3b6ef8] animate-pulse' : 'bg-[#10b981]'}`} />
          <p className="text-sm font-semibold text-[#0a0f1e]">
            {status === 'accepted' ? 'Heading to pickup' : 'Ride in progress'}
          </p>
        </div>

        {/* Passenger card */}
        <div className="bg-white rounded-2xl border border-[#e4e8f0] p-4 space-y-3">
          {ride?.safeRideEnabled && (
            <div className="flex items-center gap-2 text-[#10b981] text-xs font-medium mb-1">
              <ShieldCheck size={14} />
              SafeRide Passenger
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#3b6ef8] flex items-center justify-center shrink-0">
              <span className="text-base font-bold text-white">
                {(ride?.customerName || 'Abhay').charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#0a0f1e]">{ride?.customerName || 'Abhay Prasad'}</p>
              <p className="text-xs text-[#9ca3af]">Passenger</p>
            </div>
            <a href={`tel:${ride?.driverPhone || '+91 94470 12345'}`}>
              <Button variant="secondary" size="icon">
                <Phone size={16} />
              </Button>
            </a>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981]" />
              <p className="text-sm text-[#0a0f1e]">{ride?.pickup}</p>
            </div>
            <div className="ml-1 border-l-2 border-dashed border-[#e4e8f0] h-3" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3b6ef8]" />
              <p className="text-sm text-[#0a0f1e]">{ride?.destination}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <span className="text-xs text-[#9ca3af]">{ride?.distance}</span>
            <span className="text-xs font-semibold text-[#0a0f1e]">{formatCurrency(ride?.total)}</span>
          </div>
        </div>

        {/* Action buttons */}
        {status === 'accepted' && (
          <Button variant="primary" fullWidth size="lg" onClick={handleStart} loading={loading}>
            <Play size={18} />
            Start Ride
          </Button>
        )}
        {status === 'started' && (
          <Button variant="safety" fullWidth size="lg" onClick={handleComplete} loading={loading}>
            <Flag size={18} />
            Complete Ride
          </Button>
        )}
      </div>
    </div>
  );
}
