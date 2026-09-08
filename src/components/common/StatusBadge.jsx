import { clsx } from 'clsx';

const variants = {
  completed:  { bg: 'rgba(16,185,129,0.12)', text: '#16a34a', dot: '#16a34a', border: 'rgba(16,185,129,0.25)' },
  cancelled:  { bg: 'rgba(239,68,68,0.1)',   text: '#ef4444', dot: '#dc2626', border: 'rgba(239,68,68,0.2)' },
  in_progress:{ bg: 'rgba(79,126,255,0.12)', text: '#2563eb', dot: '#2563eb', border: 'rgba(79,126,255,0.25)' },
  driver_assigned: { bg: 'rgba(99,102,241,0.12)', text: '#818cf8', dot: '#6366f1', border: 'rgba(99,102,241,0.25)' },
  active:     { bg: 'rgba(239,68,68,0.12)', text: '#ef4444', dot: '#dc2626', border: 'rgba(239,68,68,0.25)' },
  resolved:   { bg: 'rgba(16,185,129,0.12)', text: '#16a34a', dot: '#16a34a', border: 'rgba(16,185,129,0.25)' },
  available:  { bg: 'rgba(16,185,129,0.12)', text: '#16a34a', dot: '#16a34a', border: 'rgba(16,185,129,0.25)' },
  unavailable:{ bg: '#1f2937', text: '#9ca3af', dot: '#4b5563', border: '#1f2937' },
  pending:    { bg: 'rgba(245,158,11,0.12)', text: '#fbbf24', dot: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
};

const labels = {
  completed: 'Completed',
  cancelled: 'Cancelled',
  in_progress: 'In Progress',
  driver_assigned: 'Assigned',
  active: 'Active',
  resolved: 'Resolved',
  available: 'Available',
  unavailable: 'Unavailable',
  pending: 'Pending',
};

export default function StatusBadge({ status, className = '' }) {
  const v = variants[status] || { bg: '#1f2937', text: '#9ca3af', dot: '#6b7280', border: '#1f2937' };

  return (
    <span
      className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium', className)}
      style={{ background: v.bg, color: v.text, border: `1px solid ${v.border}` }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: v.dot }}
      />
      {labels[status] || status}
    </span>
  );
}
