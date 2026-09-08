import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import Button from '../../components/common/Button';
import { useApi } from '../../hooks/useApi';

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const { data: allData, loading } = useApi('/api/data');

  if (loading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const users = allData?.users || [];

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#f9fafb] tracking-tight">Users</h1>
          <p className="text-sm text-[#9ca3af]">{users.length} registered customers</p>
        </div>
        <Button variant="primary" size="md" onClick={() => alert('Add user — connect to backend.')}>
          <UserPlus size={16} />
          Add User
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded text-sm bg-[#111827] border border-[#1f2937] text-[#f9fafb] placeholder-[#6b7280] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
        />
      </div>

      <div className="bg-[#111827] rounded border border-[#1f2937] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1f2937] bg-[#1f2937]/50">
              {['Name', 'Email', 'Phone', 'Total Rides', 'Joined', 'SafeRide'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f2937]">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-[#1f2937]/30 transition-colors">
                <td className="px-5 py-3 font-medium text-[#f9fafb]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded bg-[#1f2937] border border-[#374151] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-[#f9fafb]">{u.name?.charAt(0) || '?'}</span>
                    </div>
                    <span>{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-[#9ca3af]">{u.email}</td>
                <td className="px-5 py-3 text-[#9ca3af]">{u.phone}</td>
                <td className="px-5 py-3 text-[#f9fafb] font-medium">{u.totalRides || 0}</td>
                <td className="px-5 py-3 text-[#9ca3af]">{u.joinedAt ? formatDate(u.joinedAt) : '-'}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${u.safeRideEnabled ? 'text-[#16a34a] bg-[#16a34a]/10 border border-[#16a34a]/20' : 'text-[#9ca3af] bg-[#1f2937] border border-[#374151]'}`}>
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
