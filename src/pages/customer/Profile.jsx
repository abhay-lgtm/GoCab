import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockUsers } from '../../data/mockData';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  padding: 20,
};

export default function CustomerProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const data = mockUsers.find(u => u.id === user?.id) || mockUsers[0];
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(data.name);
  const [phone, setPhone] = useState(data.phone);
  const [email, setEmail] = useState(data.email);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-6 space-y-8">
      <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
        Profile
      </h1>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #4f7eff 0%, #3b5ce4 100%)' }}
        >
          <span className="text-2xl font-bold text-white">{data.name.charAt(0)}</span>
        </div>
        <div>
          <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>{data.name}</p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>{data.totalRides} total rides</p>
        </div>
      </div>

      {/* Edit form */}
      <div style={{ ...glass, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>Personal Details</h2>
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
          { label: 'Total Rides', value: data.totalRides },
          { label: 'Saved Locations', value: data.savedLocations?.length || 0 },
          { label: 'Emergency Contacts', value: data.emergencyContacts?.length || 0 },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl p-3 text-center" style={glass}>
            <p className="text-xl font-bold" style={{ color: 'rgba(255,255,255,0.92)' }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
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
