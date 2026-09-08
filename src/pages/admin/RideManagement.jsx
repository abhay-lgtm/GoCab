import { useState } from 'react';
import { Search, Navigation } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatRelativeDate } from '../../utils/formatDate';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';

const glass = {
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 4,
  overflow: 'hidden',
};

export default function RideManagement() {
  const [query, setQuery] = useState('');
  const { data: ridesData, loading } = useApi('/api/bookings');
  const ridesList = ridesData || [];

  const rides = ridesList.filter(r =>
    r.pickup.toLowerCase().includes(query.toLowerCase()) ||
    r.destination.toLowerCase().includes(query.toLowerCase()) ||
    r.customerName?.toLowerCase().includes(query.toLowerCase())
  );

  if (loading && !ridesData) return <div style={{color:'#9ca3af',padding:'40px',textAlign:'center'}}>Loading...</div>;

  return (
    <div className="flex flex-col max-w-6xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
          Ride Management
        </h1>
        <p className="text-sm mt-0.5" style={{ color: '#9ca3af' }}>
          {ridesList.length} total rides
        </p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#6b7280' }} />
        <input
          type="search"
          placeholder="Search by route or customer..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded text-sm"
          style={{
            background: '#111827',
            border: '1px solid #374151',
            color: '#f9fafb',
            outline: 'none',
          }}
        />
      </div>

      {rides.length === 0 ? (
        <EmptyState icon={Navigation} title="No rides found" message="Try adjusting your search." />
      ) : (
        <div style={glass}>
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr style={{ borderBottom: '1px solid #1f2937', background: '#111827' }}>
                {['ID', 'Customer', 'Driver', 'Route', 'Fare', 'Date', 'Status'].map(h => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wide"
                    style={{ color: '#6b7280' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rides.map(ride => (
                <tr
                  key={ride.id}
                  style={{ borderBottom: '1px solid #111827', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#111827'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: '#6b7280' }}>
                    {ride.id.toUpperCase()}
                  </td>
                  <td className="px-5 py-3 font-medium" style={{ color: '#f9fafb' }}>
                    {ride.customerName}
                  </td>
                  <td className="px-5 py-3" style={{ color: '#9ca3af' }}>{ride.driverName}</td>
                  <td className="px-5 py-3 max-w-[160px] truncate text-xs" style={{ color: '#9ca3af' }}>
                    {ride.pickup} → {ride.destination}
                  </td>
                  <td className="px-5 py-3 font-medium" style={{ color: '#f9fafb' }}>
                    {formatCurrency(ride.total)}
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: '#9ca3af' }}>
                    {formatRelativeDate(ride.date)}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={ride.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
