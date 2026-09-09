import { useState, useEffect } from 'react';
import { Plus, Save, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApi, apiPost } from '../../hooks/useApi';
import SafeRideCard from '../../components/safety/SafeRideCard';
import EmergencyContactCard from '../../components/safety/EmergencyContactCard';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

const glass = {
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 4,
  padding: 16,
};

export default function SafeRide() {
  const { user } = useAuth();
  const { data: profile } = useApi('/api/users/me');
  const [safeRide, setSafeRide] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  useEffect(() => {
    if (profile && profile.safeRideEnabled !== undefined) {
      setSafeRide(Boolean(profile.safeRideEnabled));
    }
  }, [profile]);

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) return;
    setContacts(c => [...c, { id: `ec${Date.now()}`, ...newContact }]);
    setNewContact({ name: '', phone: '' });
    setShowModal(false);
  };

  const handleRemove = (id) => {
    setContacts(c => c.filter(ec => ec.id !== id));
  };

  const handleSave = async () => {
    try {
      await apiPost('/api/users/me', {
        safeRideEnabled: safeRide ? 1 : 0,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Failed to save safety settings:', err);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto mt-6 gap-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded flex items-center justify-center"
          style={{ background: '#111827', border: '1px solid rgba(16,185,129,0.25)' }}
        >
          <ShieldCheck size={22} style={{ color: '#16a34a' }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
            SafeRide
          </h1>
          <p className="text-sm" style={{ color: '#9ca3af' }}>Extra protection for every journey.</p>
        </div>
      </div>

      {/* Main toggle card */}
      <SafeRideCard enabled={safeRide} onToggle={() => setSafeRide(s => !s)} />

      {/* Emergency contacts */}
      <div style={glass}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold" style={{ color: '#f9fafb' }}>Emergency Contacts</h2>
          <span className="text-xs" style={{ color: '#6b7280' }}>{contacts.length} contacts</span>
        </div>
        {contacts.length > 0 ? (
          <div className="flex flex-col gap-2">
            {contacts.map(contact => (
              <EmergencyContactCard key={contact.id} contact={contact} onRemove={handleRemove} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-center py-4" style={{ color: '#6b7280' }}>
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
          { title: 'Verified Drivers', desc: 'Matches you with background-checked drivers.' },
          { title: 'Live Trip Sharing', desc: 'Your contacts see your journey in real time.' },
          { title: 'One-Tap SOS', desc: 'Emergency alert sent instantly during a ride.' },
          { title: 'Admin Monitoring', desc: 'Platform admins monitor all SafeRide trips.' },
        ].map(({ title, desc }) => (
          <div
            key={title}
            className="rounded p-3.5"
            style={{
              background: '#111827',
              border: '1px solid #1f2937',
            }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: '#f9fafb' }}>{title}</p>
            <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>{desc}</p>
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
        <div className="flex flex-col gap-4">
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
