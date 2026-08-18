import { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { formatDate } from '../../utils/formatDate';
import Button from '../../components/common/Button';

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const filtered = mockUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0a0f1e]">Users</h1>
          <p className="text-sm text-[#9ca3af]">{mockUsers.length} registered customers</p>
        </div>
        <Button variant="primary" size="md" onClick={() => alert('Add user — connect to backend.')}>
          <UserPlus size={16} />
          Add User
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded-xl border border-[#e4e8f0] text-sm focus:outline-none focus:border-[#3b6ef8] focus:ring-2 focus:ring-[#3b6ef8]/10 bg-white"
        />
      </div>

      <div className="bg-white rounded-2xl border border-[#e4e8f0] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#f0f2f8] bg-[#f8f9fc]">
              {['Name', 'Email', 'Phone', 'Total Rides', 'Joined', 'SafeRide'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium text-[#9ca3af] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-b border-[#f0f2f8] last:border-0 hover:bg-[#f8f9fc] transition-colors">
                <td className="px-5 py-3 font-medium text-[#0a0f1e]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#0a0f1e] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">{u.name.charAt(0)}</span>
                    </div>
                    {u.name}
                  </div>
                </td>
                <td className="px-5 py-3 text-[#4b5563]">{u.email}</td>
                <td className="px-5 py-3 text-[#4b5563]">{u.phone}</td>
                <td className="px-5 py-3 text-[#0a0f1e] font-medium">{u.totalRides}</td>
                <td className="px-5 py-3 text-[#9ca3af]">{formatDate(u.joinedAt)}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${u.safeRideEnabled ? 'text-emerald-700 bg-emerald-50' : 'text-[#9ca3af] bg-[#f0f2f8]'}`}>
                    {u.safeRideEnabled ? 'Active' : 'Off'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
