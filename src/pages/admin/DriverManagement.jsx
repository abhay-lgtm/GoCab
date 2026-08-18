import { useState } from 'react';
import { Search, Car, Star } from 'lucide-react';
import { mockDrivers } from '../../data/mockData';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  overflow: 'hidden',
};

export default function DriverManagement() {
  const [query, setQuery] = useState('');
  const drivers = mockDrivers.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.vehicleModel.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
          Driver Management
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {mockDrivers.length} registered drivers
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
        <input
          type="search"
          placeholder="Search drivers..."
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

      {drivers.length === 0 ? (
        <EmptyState icon={Car} title="No drivers found" message="Try adjusting your search." />
      ) : (
        <div style={glass}>
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                {['Name', 'Vehicle', 'Vehicle No.', 'Rides', 'Rating', 'Status'].map(h => (
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
              {drivers.map(d => (
                <tr
                  key={d.id}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <td className="px-5 py-3 font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                        style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981' }}
                      >
                        {d.name.charAt(0)}
                      </div>
                      {d.name}
                    </div>
                  </td>
                  <td className="px-5 py-3" style={{ color: 'rgba(255,255,255,0.5)' }}>{d.vehicleModel}</td>
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {d.vehicleNumber}
                  </td>
                  <td className="px-5 py-3" style={{ color: 'rgba(255,255,255,0.7)' }}>{d.totalRides}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} fill="#fbbf24" style={{ color: '#fbbf24' }} />
                      <span style={{ color: 'rgba(255,255,255,0.8)' }}>{d.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={d.available ? 'available' : 'unavailable'} />
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
