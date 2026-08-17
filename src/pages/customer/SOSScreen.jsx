import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, MapPin, Navigation, Phone, ShieldCheck,
  AlertTriangle, Users,
} from 'lucide-react';
import { mockRides, mockUsers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import MapPlaceholder from '../../components/map/MapPlaceholder';

export default function SOSScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const customer = mockUsers.find(u => u.id === user?.id) || mockUsers[0];
  const ride = mockRides.find(r => r.id === 'r5') || mockRides[0];

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      {/* Alert banner */}
      <div className="bg-red-50 border-2 border-[#ef4444] rounded-2xl p-5 text-center animate-fade-in">
        <div className="w-14 h-14 rounded-full bg-[#ef4444] flex items-center justify-center mx-auto mb-3">
          <AlertTriangle size={28} className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-[#0a0f1e] mb-1">SOS Alert Sent</h1>
        <p className="text-sm text-[#4b5563]">
          Emergency assistance has been notified. Stay calm — help is on the way.
        </p>
      </div>

      {/* Notified parties */}
      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5">
        <h2 className="text-sm font-semibold text-[#0a0f1e] mb-3">Notified</h2>
        <div className="space-y-3">
          {customer.emergencyContacts.map(c => (
            <div key={c.id} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <CheckCircle size={15} className="text-[#10b981]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0a0f1e]">{c.name}</p>
                <p className="text-xs text-[#9ca3af]">{c.phone}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <CheckCircle size={15} className="text-[#10b981]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#0a0f1e]">RideSphere Admin</p>
              <p className="text-xs text-[#9ca3af]">Emergency monitoring team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current ride info */}
      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5">
        <h2 className="text-sm font-semibold text-[#0a0f1e] mb-3">Current Ride</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-[#10b981]" />
            <span className="text-sm text-[#0a0f1e]">{ride.pickup}</span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation size={13} className="text-[#3b6ef8]" />
            <span className="text-sm text-[#0a0f1e]">{ride.destination}</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div className="w-6 h-6 rounded-full bg-[#0a0f1e] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">R</span>
            </div>
            <span className="text-sm text-[#0a0f1e]">{ride.driverName} · {ride.vehicleNumber}</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <MapPlaceholder pickup={ride.pickup} destination={ride.destination} className="h-48" />

      {/* Current location */}
      <div className="flex items-center gap-2 bg-[#f0f2f8] rounded-xl px-4 py-3">
        <MapPin size={16} className="text-[#3b6ef8]" />
        <p className="text-sm text-[#0a0f1e]">MC Road, Near Thiruvanchoor, Kottayam</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <a href="tel:112" className="flex-1">
          <Button variant="danger" fullWidth size="lg">
            <Phone size={18} />
            Call 112
          </Button>
        </a>
        <Button variant="secondary" fullWidth size="lg" onClick={() => navigate('/customer/ride/r5')}>
          Back to Ride
        </Button>
      </div>
    </div>
  );
}
