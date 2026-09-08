import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import StatusBadge from '../../components/common/StatusBadge';
import { useApi } from '../../hooks/useApi';

const filters = ['All', 'Completed', 'Cancelled', 'In Progress', 'Accepted', 'Pending'];

export default function AdminRides() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { data: bookings, loading } = useApi('/api/bookings');

  if (loading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const allRides = bookings || [];

  const filtered = allRides.filter(r => {
    const matchFilter = filter === 'All' || r.status === filter.toLowerCase().replace(' ', '_');
    const matchSearch =
      !search ||
      r.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      r.driverName?.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#f9fafb] tracking-tight">All Rides</h1>
        <p className="text-sm text-[#9ca3af]">{allRides.length} total rides</p>
      </div>

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
          <input
            type="text"
            placeholder="Search by customer, driver, or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded text-sm bg-[#111827] border border-[#1f2937] text-[#f9fafb] placeholder-[#6b7280] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all shrink-0
                ${filter === f ? 'bg-[#2563eb] text-white' : 'bg-[#111827] border border-[#1f2937] text-[#9ca3af] hover:text-[#f9fafb] hover:bg-[#1f2937]'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#111827] rounded border border-[#1f2937] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1f2937] bg-[#1f2937]/50">
                {['ID', 'Customer', 'Driver', 'Pickup', 'Destination', 'Fare', 'SafeRide', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2937]">
              {filtered.map(ride => (
                <tr key={ride.id} className="hover:bg-[#1f2937]/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-[#9ca3af]">{ride.id.toUpperCase()}</td>
                  <td className="px-4 py-3 font-medium text-[#f9fafb]">{ride.customerName || '-'}</td>
                  <td className="px-4 py-3 text-[#9ca3af]">{ride.driverName || '-'}</td>
                  <td className="px-4 py-3 text-[#9ca3af] max-w-[120px] truncate">{ride.pickup}</td>
                  <td className="px-4 py-3 text-[#9ca3af] max-w-[120px] truncate">{ride.destination}</td>
                  <td className="px-4 py-3 font-medium text-[#f9fafb]">{formatCurrency(ride.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${ride.safeRideEnabled ? 'text-[#16a34a]' : 'text-[#9ca3af]'}`}>
                      {ride.safeRideEnabled ? '✓' : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={ride.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
