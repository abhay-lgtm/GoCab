import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockDrivers } from '../../data/mockData';
import { LogOut, Star } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  padding: 20,
};

export default function DriverProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const driver = mockDrivers.find(d => d.id === user?.id) || mockDrivers[0];
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col max-w-xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
        Profile
      </h1>

      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #4f7eff 0%, #3b5ce4 100%)' }}
        >
          <span className="text-2xl font-bold text-white">{driver.name.charAt(0)}</span>
        </div>
        <div>
          <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>{driver.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={12} fill="#fbbf24" style={{ color: '#fbbf24' }} />
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {driver.rating} · {driver.totalRides} rides
            </span>
          </div>
        </div>
      </div>

      <div style={{ ...glass, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>Driver Details</h2>
        <Input label="Full Name" id="dp-name" defaultValue={driver.name} />
        <Input label="Email" id="dp-email" type="email" defaultValue={driver.email} />
        <Input label="Phone" id="dp-phone" type="tel" defaultValue={driver.phone} />
        <Input label="License Number" id="dp-license" defaultValue={driver.licenseNumber} />
        <Input label="Vehicle Number" id="dp-vehicle" defaultValue={driver.vehicleNumber} />
        <Button
          variant={saved ? 'safety' : 'primary'}
          fullWidth
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
        >
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
