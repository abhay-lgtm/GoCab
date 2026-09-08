import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { Search, Users } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';

const glass = {
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 4,
  overflow: 'hidden',
};

export default function UserManagement() {
  const [query, setQuery] = useState('');
  const { data: allData, loading } = useApi('/api/data');
  const usersList = allData?.users || [];

  const users = usersList.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  );

  if (loading && !allData) return <div style={{color:'#9ca3af',padding:'40px',textAlign:'center'}}>Loading...</div>;

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
          User Management
        </h1>
        <p className="text-sm mt-0.5" style={{ color: '#9ca3af' }}>
          {usersList.length} registered users
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#6b7280' }} />
        <input
          type="search"
          placeholder="Search users..."
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

      {users.length === 0 ? (
        <EmptyState icon={Users} title="No users found" message="Try adjusting your search." />
      ) : (
        <div style={glass}>
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr style={{ borderBottom: '1px solid #1f2937', background: '#111827' }}>
                {['Name', 'Email', 'Phone', 'Rides', 'SafeRide'].map(h => (
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
              {users.map(u => (
                <tr
                  key={u.id}
                  style={{ borderBottom: '1px solid #111827', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#111827'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <td className="px-5 py-3 font-medium" style={{ color: '#f9fafb' }}>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                        style={{ background: '#111827' }}
                      >
                        {u.name.charAt(0)}
                      </div>
                      {u.name}
                    </div>
                  </td>
                  <td className="px-5 py-3" style={{ color: '#9ca3af' }}>{u.email}</td>
                  <td className="px-5 py-3" style={{ color: '#9ca3af' }}>{u.phone}</td>
                  <td className="px-5 py-3" style={{ color: 'rgba(255,255,255,0.7)' }}>{u.totalRides}</td>
                  <td className="px-5 py-3">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-md"
                      style={
                        u.safeRideEnabled
                          ? { background: '#111827', color: '#16a34a' }
                          : { background: '#111827', color: '#6b7280' }
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
