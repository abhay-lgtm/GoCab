import { useState } from 'react';
import { Search } from 'lucide-react';
import { mockRides } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';
import StatusBadge from '../../components/common/StatusBadge';

const filters = ['All', 'Completed', 'Cancelled', 'In Progress', 'Driver Assigned'];

export default function AdminRides() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = mockRides.filter(r => {
    const matchFilter = filter === 'All' || r.status === filter.toLowerCase().replace(' ', '_');
    const matchSearch =
      !search ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.driverName.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0a0f1e]">All Rides</h1>
        <p className="text-sm text-[#9ca3af]">{mockRides.length} total rides</p>
      </div>

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search by customer, driver, or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-[#e4e8f0] text-sm focus:outline-none focus:border-[#3b6ef8] focus:ring-2 focus:ring-[#3b6ef8]/10 bg-white"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0
                ${filter === f ? 'bg-[#0a0f1e] text-white' : 'bg-white border border-[#e4e8f0] text-[#4b5563] hover:border-[#0a0f1e]/30'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e4e8f0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f0f2f8] bg-[#f8f9fc]">
                {['ID', 'Customer', 'Driver', 'Pickup', 'Destination', 'Fare', 'SafeRide', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#9ca3af] uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(ride => (
                <tr key={ride.id} className="border-b border-[#f0f2f8] last:border-0 hover:bg-[#f8f9fc] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-[#9ca3af]">{ride.id.toUpperCase()}</td>
                  <td className="px-4 py-3 font-medium text-[#0a0f1e]">{ride.customerName}</td>
                  <td className="px-4 py-3 text-[#4b5563]">{ride.driverName}</td>
                  <td className="px-4 py-3 text-[#4b5563] max-w-[120px] truncate">{ride.pickup}</td>
                  <td className="px-4 py-3 text-[#4b5563] max-w-[120px] truncate">{ride.destination}</td>
                  <td className="px-4 py-3 font-medium text-[#0a0f1e]">{formatCurrency(ride.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${ride.safeRideEnabled ? 'text-[#10b981]' : 'text-[#9ca3af]'}`}>
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
