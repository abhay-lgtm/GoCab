import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockDrivers } from '../../data/mockData';
import { LogOut, Star } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function DriverProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const driver = mockDrivers.find(d => d.id === user?.id) || mockDrivers[0];
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <h1 className="text-2xl font-bold text-[#0a0f1e]">Profile</h1>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#0a0f1e] flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{driver.name.charAt(0)}</span>
        </div>
        <div>
          <p className="font-semibold text-[#0a0f1e]">{driver.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={12} className="text-amber-400" fill="currentColor" />
            <span className="text-sm text-[#4b5563]">{driver.rating} · {driver.totalRides} rides</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5 space-y-4">
        <h2 className="text-sm font-semibold text-[#0a0f1e]">Driver Details</h2>
        <Input label="Full Name" id="dp-name" defaultValue={driver.name} />
        <Input label="Email" id="dp-email" type="email" defaultValue={driver.email} />
        <Input label="Phone" id="dp-phone" type="tel" defaultValue={driver.phone} />
        <Input label="License Number" id="dp-license" defaultValue={driver.licenseNumber} />
        <Input label="Vehicle Number" id="dp-vehicle" defaultValue={driver.vehicleNumber} />
        <Button variant={saved ? 'safety' : 'primary'} fullWidth onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
          {saved ? '✓ Saved' : 'Save Changes'}
        </Button>
      </div>

      <Button variant="secondary" fullWidth size="lg" onClick={() => { logout(); navigate('/'); }}>
        <LogOut size={16} />
        Sign Out
      </Button>
    </div>
  );
}
