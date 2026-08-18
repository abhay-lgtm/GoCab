import { useState } from 'react';
import { Plus, Save, ShieldCheck } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import SafeRideCard from '../../components/safety/SafeRideCard';
import EmergencyContactCard from '../../components/safety/EmergencyContactCard';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  padding: 16,
};

export default function SafeRide() {
  const { user } = useAuth();
  const customerData = mockUsers.find(u => u.id === user?.id) || mockUsers[0];
  const [safeRide, setSafeRide] = useState(customerData.safeRideEnabled);
  const [contacts, setContacts] = useState(customerData.emergencyContacts);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) return;
    setContacts(c => [...c, { id: `ec${Date.now()}`, ...newContact }]);
    setNewContact({ name: '', phone: '' });
    setShowModal(false);
  };

  const handleRemove = (id) => {
    setContacts(c => c.filter(ec => ec.id !== id));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.25)' }}
        >
          <ShieldCheck size={22} style={{ color: '#10b981' }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
            SafeRide
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Extra protection for every journey.</p>
        </div>
      </div>

      {/* Main toggle card */}
      <SafeRideCard enabled={safeRide} onToggle={() => setSafeRide(s => !s)} />

      {/* Emergency contacts */}
      <div style={glass}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>Emergency Contacts</h2>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{contacts.length} contacts</span>
        </div>
        {contacts.length > 0 ? (
          <div className="space-y-2">
            {contacts.map(contact => (
              <EmergencyContactCard key={contact.id} contact={contact} onRemove={handleRemove} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-center py-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
            No emergency contacts added. Add someone you trust.
          </p>
        )}

        <Button variant="outline" fullWidth size="md" className="mt-3" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Add Emergency Contact
        </Button>
      </div>

      {/* Info cards */}
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { emoji: '✅', title: 'Verified Drivers', desc: 'Matches you with background-checked drivers.' },
          { emoji: '📍', title: 'Live Trip Sharing', desc: 'Your contacts see your journey in real time.' },
          { emoji: '🆘', title: 'One-Tap SOS', desc: 'Emergency alert sent instantly during a ride.' },
          { emoji: '🛡️', title: 'Admin Monitoring', desc: 'Platform admins monitor all SafeRide trips.' },
        ].map(({ emoji, title, desc }) => (
          <div
            key={title}
            className="rounded-xl p-3.5"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <p className="text-xl mb-1.5">{emoji}</p>
            <p className="text-sm font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.85)' }}>{title}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* Save */}
      <Button variant={saved ? 'safety' : 'primary'} fullWidth size="lg" onClick={handleSave}>
        {saved ? '✓ Saved' : (
          <>
            <Save size={16} />
            Save Safety Settings
          </>
        )}
      </Button>

      {/* Add Contact Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Emergency Contact">
        <div className="space-y-4">
          <Input
            label="Name"
            id="contact-name"
            placeholder="e.g. Mom, Friend (Rahul)"
            value={newContact.name}
            onChange={e => setNewContact(c => ({ ...c, name: e.target.value }))}
          />
          <Input
            label="Phone Number"
            id="contact-phone"
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={newContact.phone}
            onChange={e => setNewContact(c => ({ ...c, phone: e.target.value }))}
          />
          <div className="flex gap-2 pt-1">
            <Button variant="secondary" fullWidth onClick={() => setShowModal(false)}>Cancel</Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleAddContact}
              disabled={!newContact.name || !newContact.phone}
            >
              Add Contact
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
