import { Phone, Trash2, User } from 'lucide-react';
import Button from '../common/Button';

export default function EmergencyContactCard({ contact, onRemove }) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#e4e8f0] hover:border-[#3b6ef8]/30 transition-colors duration-150">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#3b6ef8]/10 flex items-center justify-center shrink-0">
          <User size={16} className="text-[#3b6ef8]" />
        </div>
        <div>
          <p className="text-sm font-medium text-[#0a0f1e]">{contact.name}</p>
          <p className="text-xs text-[#9ca3af]">{contact.phone}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <a href={`tel:${contact.phone}`}>
          <Button variant="ghost" size="icon" aria-label={`Call ${contact.name}`}>
            <Phone size={15} className="text-[#3b6ef8]" />
          </Button>
        </a>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(contact.id)}
            aria-label={`Remove ${contact.name}`}
          >
            <Trash2 size={15} className="text-[#9ca3af] hover:text-red-500" />
          </Button>
        )}
      </div>
    </div>
  );
}
