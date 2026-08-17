import { clsx } from 'clsx';

const variants = {
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  cancelled: 'bg-red-50 text-red-700 border border-red-200',
  in_progress: 'bg-blue-50 text-[#3b6ef8] border border-blue-200',
  driver_assigned: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  active: 'bg-red-50 text-red-700 border border-red-200',
  resolved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  available: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  unavailable: 'bg-gray-100 text-gray-500 border border-gray-200',
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
};

const labels = {
  completed: 'Completed',
  cancelled: 'Cancelled',
  in_progress: 'In Progress',
  driver_assigned: 'Driver Assigned',
  active: 'Active',
  resolved: 'Resolved',
  available: 'Available',
  unavailable: 'Unavailable',
  pending: 'Pending',
};

export default function StatusBadge({ status, className = '' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium',
        variants[status] || 'bg-gray-100 text-gray-600',
        className
      )}
    >
      <span
        className={clsx(
          'w-1.5 h-1.5 rounded-full',
          status === 'completed' || status === 'resolved' || status === 'available' ? 'bg-emerald-500' :
          status === 'cancelled' || status === 'active' ? 'bg-red-500' :
          status === 'in_progress' ? 'bg-[#3b6ef8]' :
          status === 'driver_assigned' ? 'bg-indigo-500' :
          'bg-amber-500'
        )}
      />
      {labels[status] || status}
    </span>
  );
}
