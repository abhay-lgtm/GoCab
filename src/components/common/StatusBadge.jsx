import { clsx } from 'clsx';

const variants = {
  completed:  { bg: 'rgba(16,185,129,0.12)', text: '#10b981', dot: '#10b981', border: 'rgba(16,185,129,0.25)' },
  cancelled:  { bg: 'rgba(239,68,68,0.1)',   text: '#f87171', dot: '#ef4444', border: 'rgba(239,68,68,0.2)' },
  in_progress:{ bg: 'rgba(79,126,255,0.12)', text: '#5b8eff', dot: '#4f7eff', border: 'rgba(79,126,255,0.25)' },
  driver_assigned: { bg: 'rgba(99,102,241,0.12)', text: '#818cf8', dot: '#6366f1', border: 'rgba(99,102,241,0.25)' },
  active:     { bg: 'rgba(239,68,68,0.12)', text: '#f87171', dot: '#ef4444', border: 'rgba(239,68,68,0.25)' },
  resolved:   { bg: 'rgba(16,185,129,0.12)', text: '#10b981', dot: '#10b981', border: 'rgba(16,185,129,0.25)' },
  available:  { bg: 'rgba(16,185,129,0.12)', text: '#10b981', dot: '#10b981', border: 'rgba(16,185,129,0.25)' },
  unavailable:{ bg: 'rgba(255,255,255,0.05)', text: 'rgba(255,255,255,0.35)', dot: 'rgba(255,255,255,0.2)', border: 'rgba(255,255,255,0.08)' },
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
  const v = variants[status] || { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.4)', dot: 'rgba(255,255,255,0.3)', border: 'rgba(255,255,255,0.1)' };

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
