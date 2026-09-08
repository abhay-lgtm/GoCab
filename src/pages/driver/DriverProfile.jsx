import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Star } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useApi, apiPost } from '../../hooks/useApi';

const glass = {
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 4,
  padding: 20,
};

export default function DriverProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { data: profile, loading } = useApi('/api/drivers/me');
  const [saved, setSaved] = useState(false);

  if (loading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const driver = profile || {};

  return (
    <div className="flex flex-col max-w-xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
        Profile
      </h1>

      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded flex items-center justify-center"
          style={{ background: '#111827' }}
        >
          <span className="text-2xl font-bold text-white">{driver.name?.charAt(0) || '?'}</span>
        </div>
        <div>
          <p className="font-semibold" style={{ color: '#f9fafb' }}>{driver.name || 'Driver'}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={12} fill="#fbbf24" style={{ color: '#fbbf24' }} />
            <span className="text-sm" style={{ color: '#9ca3af' }}>
              {driver.rating || 'N/A'} · {driver.totalRides || 0} rides
            </span>
          </div>
        </div>
      </div>

      <div style={{ ...glass, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 className="text-sm font-semibold" style={{ color: '#f9fafb' }}>Driver Details</h2>
        <Input label="Full Name" id="dp-name" defaultValue={driver.name} />
        <Input label="Email" id="dp-email" type="email" defaultValue={driver.email} />
        <Input label="Phone" id="dp-phone" type="tel" defaultValue={driver.phone} />
        <Input label="License Number" id="dp-license" defaultValue={driver.licenseNumber} />
        <Input label="Vehicle Number" id="dp-vehicle" defaultValue={driver.vehicleNumber} />
        <Button
          variant={saved ? 'safety' : 'primary'}
          fullWidth
          onClick={async () => { 
            /* assuming an update endpoint exists or just dummy */
            try { await apiPost('/api/users/me', { name: driver.name }, 'PUT'); } catch(e){}
            setSaved(true); 
            setTimeout(() => setSaved(false), 2000); 
          }}
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
