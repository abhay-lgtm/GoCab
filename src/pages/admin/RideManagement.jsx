import { useState } from 'react';
import { Search, Navigation } from 'lucide-react';
import { mockRides } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatRelativeDate } from '../../utils/formatDate';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  overflow: 'hidden',
};

export default function RideManagement() {
  const [query, setQuery] = useState('');
  const rides = mockRides.filter(r =>
    r.pickup.toLowerCase().includes(query.toLowerCase()) ||
    r.destination.toLowerCase().includes(query.toLowerCase()) ||
    r.customerName?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
          Ride Management
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {mockRides.length} total rides
        </p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
        <input
          type="search"
          placeholder="Search by route or customer..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl text-sm"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.09)',
            color: 'rgba(255,255,255,0.85)',
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
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                {['ID', 'Customer', 'Driver', 'Route', 'Fare', 'Date', 'Status'].map(h => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wide"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
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
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {ride.id.toUpperCase()}
                  </td>
                  <td className="px-5 py-3 font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {ride.customerName}
                  </td>
                  <td className="px-5 py-3" style={{ color: 'rgba(255,255,255,0.5)' }}>{ride.driverName}</td>
                  <td className="px-5 py-3 max-w-[160px] truncate text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {ride.pickup} → {ride.destination}
                  </td>
                  <td className="px-5 py-3 font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {formatCurrency(ride.total)}
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
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
