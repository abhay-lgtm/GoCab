import { Phone, Trash2, User } from 'lucide-react';
import Button from '../common/Button';

export default function EmergencyContactCard({ contact, onRemove }) {
  return (
    <div
      className="flex items-center justify-between gap-3 p-3 rounded transition-colors duration-150"
      style={{
        background: '#111827',
        border: '1px solid #1f2937',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: '#111827' }}
        >
          <User size={16} style={{ color: '#2563eb' }} />
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: '#f9fafb' }}>
            {contact.name}
          </p>
          <p className="text-xs" style={{ color: '#9ca3af' }}>
            {contact.phone}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <a href={`tel:${contact.phone}`}>
          <Button variant="ghost" size="icon" aria-label={`Call ${contact.name}`}>
            <Phone size={15} style={{ color: '#2563eb' }} />
          </Button>
        </a>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(contact.id)}
            aria-label={`Remove ${contact.name}`}
          >
            <Trash2 size={15} style={{ color: '#6b7280' }} />
          </Button>
        )}
      </div>
    </div>
  );
}
