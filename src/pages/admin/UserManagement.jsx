import { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import { Search, Users } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  overflow: 'hidden',
};

export default function UserManagement() {
  const [query, setQuery] = useState('');
  const users = mockUsers.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
          User Management
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {mockUsers.length} registered users
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
        <input
          type="search"
          placeholder="Search users..."
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

      {users.length === 0 ? (
        <EmptyState icon={Users} title="No users found" message="Try adjusting your search." />
      ) : (
        <div style={glass}>
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                {['Name', 'Email', 'Phone', 'Rides', 'SafeRide'].map(h => (
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
              {users.map(u => (
                <tr
                  key={u.id}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <td className="px-5 py-3 font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                        style={{ background: 'rgba(79,126,255,0.35)' }}
                      >
                        {u.name.charAt(0)}
                      </div>
                      {u.name}
                    </div>
                  </td>
                  <td className="px-5 py-3" style={{ color: 'rgba(255,255,255,0.45)' }}>{u.email}</td>
                  <td className="px-5 py-3" style={{ color: 'rgba(255,255,255,0.45)' }}>{u.phone}</td>
                  <td className="px-5 py-3" style={{ color: 'rgba(255,255,255,0.7)' }}>{u.totalRides}</td>
                  <td className="px-5 py-3">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-md"
                      style={
                        u.safeRideEnabled
                          ? { background: 'rgba(16,185,129,0.12)', color: '#10b981' }
                          : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.25)' }
                      }
                    >
                      {u.safeRideEnabled ? 'On' : 'Off'}
                    </span>
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
