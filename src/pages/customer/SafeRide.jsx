import { useState } from 'react';
import { Plus, Save, ShieldCheck } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import SafeRideCard from '../../components/safety/SafeRideCard';
import EmergencyContactCard from '../../components/safety/EmergencyContactCard';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

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
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-2xl bg-[#10b981] flex items-center justify-center">
          <ShieldCheck size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#0a0f1e]">SafeRide</h1>
          <p className="text-sm text-[#4b5563]">Extra protection for every journey.</p>
        </div>
      </div>

      {/* Main toggle card */}
      <SafeRideCard enabled={safeRide} onToggle={() => setSafeRide(s => !s)} />

      {/* Emergency contacts */}
      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#0a0f1e]">Emergency Contacts</h2>
          <span className="text-xs text-[#9ca3af]">{contacts.length} contacts</span>
        </div>
        {contacts.length > 0 ? (
          <div className="space-y-2">
            {contacts.map(contact => (
              <EmergencyContactCard
                key={contact.id}
                contact={contact}
                onRemove={handleRemove}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#9ca3af] text-center py-4">
            No emergency contacts added. Add someone you trust.
          </p>
        )}

        <Button
          variant="outline"
          fullWidth
          size="md"
          className="mt-3"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} />
          Add Emergency Contact
        </Button>
      </div>

      {/* Info cards */}
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { icon: '🔒', title: 'Verified Drivers', desc: 'Matches you with background-checked drivers.' },
          { icon: '📍', title: 'Live Trip Sharing', desc: 'Your contacts see your journey in real time.' },
          { icon: '🚨', title: 'One-Tap SOS', desc: 'Emergency alert sent instantly during a ride.' },
          { icon: '📞', title: 'Admin Monitoring', desc: 'Platform admins monitor all SafeRide trips.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-[#f8f9fc] rounded-xl border border-[#e4e8f0] p-3.5">
            <p className="text-xl mb-1.5">{icon}</p>
            <p className="text-sm font-medium text-[#0a0f1e] mb-0.5">{title}</p>
            <p className="text-xs text-[#4b5563] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Save */}
      <Button
        variant={saved ? 'safety' : 'primary'}
        fullWidth
        size="lg"
        onClick={handleSave}
      >
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
