import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockUsers } from '../../data/mockData';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

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
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <h1 className="text-2xl font-bold text-[#0a0f1e]">Profile</h1>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#0a0f1e] flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{data.name.charAt(0)}</span>
        </div>
        <div>
          <p className="font-semibold text-[#0a0f1e]">{data.name}</p>
          <p className="text-sm text-[#9ca3af]">{data.totalRides} total rides</p>
        </div>
      </div>

      {/* Edit form */}
      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5 space-y-4">
        <h2 className="text-sm font-semibold text-[#0a0f1e]">Personal Details</h2>
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
          { label: 'Saved Locations', value: data.savedLocations.length },
          { label: 'Emergency Contacts', value: data.emergencyContacts.length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#e4e8f0] p-3 text-center">
            <p className="text-xl font-bold text-[#0a0f1e]">{value}</p>
            <p className="text-xs text-[#9ca3af] mt-0.5">{label}</p>
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
