import { Phone, Trash2, User } from 'lucide-react';
import Button from '../common/Button';

export default function EmergencyContactCard({ contact, onRemove }) {
  return (
    <div
      className="flex items-center justify-between gap-3 p-3 rounded-xl transition-colors duration-150"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'rgba(79,126,255,0.15)' }}
        >
          <User size={16} style={{ color: '#5b8eff' }} />
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {contact.name}
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {contact.phone}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <a href={`tel:${contact.phone}`}>
          <Button variant="ghost" size="icon" aria-label={`Call ${contact.name}`}>
            <Phone size={15} style={{ color: '#5b8eff' }} />
          </Button>
        </a>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(contact.id)}
            aria-label={`Remove ${contact.name}`}
          >
            <Trash2 size={15} style={{ color: 'rgba(255,255,255,0.25)' }} />
          </Button>
        )}
      </div>
    </div>
  );
}
