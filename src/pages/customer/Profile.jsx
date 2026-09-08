import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useApi, apiPost } from '../../hooks/useApi';

const glass = {
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 4,
  padding: 20,
};

export default function CustomerProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { data: profile, loading } = useApi('/api/users/me');

  const data = profile || {};
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setPhone(data.phone || '');
      setEmail(data.email || '');
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await apiPost('/api/users/me', { name, phone, email }, 'PUT');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto mt-6 gap-8">
      <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
        Profile
      </h1>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded flex items-center justify-center"
          style={{ background: '#111827' }}
        >
          <span className="text-2xl font-bold text-white">{data.name?.charAt(0) || '?'}</span>
        </div>
        <div>
          <p className="font-semibold" style={{ color: '#f9fafb' }}>{data.name || 'User'}</p>
          <p className="text-sm" style={{ color: '#9ca3af' }}>{data.totalRides || 0} total rides</p>
        </div>
      </div>

      {/* Edit form */}
      <div style={{ ...glass, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 className="text-sm font-semibold" style={{ color: '#f9fafb' }}>Personal Details</h2>
        <Input label="Full Name" id="prof-name" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Email" id="prof-email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label="Phone" id="prof-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        <Button variant={saved ? 'safety' : 'primary'} fullWidth onClick={handleSave}>
          {saved ? '✓ Saved' : 'Save Changes'}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Rides', value: data.totalRides || 0 },
          { label: 'Saved Locations', value: data.savedLocations?.length || 0 },
          { label: 'Emergency Contacts', value: data.emergencyContacts?.length || 0 },
        ].map(({ label, value }) => (
          <div key={label} className="rounded p-3 text-center" style={glass}>
            <p className="text-xl font-bold" style={{ color: '#f9fafb' }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{label}</p>
          </div>
        ))}
      </div>

      <Button variant="secondary" fullWidth size="lg" onClick={() => { logout(); navigate('/'); }}>
        <LogOut size={16} />
        Sign Out
      </Button>
    </div>
  );
}
