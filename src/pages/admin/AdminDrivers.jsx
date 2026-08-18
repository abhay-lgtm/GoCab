import { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { mockDrivers } from '../../data/mockData';
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';
import StatusBadge from '../../components/common/StatusBadge';

export default function AdminDrivers() {
  const [search, setSearch] = useState('');
  const filtered = mockDrivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.vehicleNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0a0f1e]">Drivers</h1>
        <p className="text-sm text-[#9ca3af]">{mockDrivers.length} registered drivers</p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
        <input
          type="text"
          placeholder="Search drivers or vehicle number..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded-xl border border-[#e4e8f0] text-sm focus:outline-none focus:border-[#3b6ef8] focus:ring-2 focus:ring-[#3b6ef8]/10 bg-white"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(driver => (
          <div key={driver.id} className="bg-white rounded-2xl border border-[#e4e8f0] p-4 hover:border-[#3b6ef8]/30 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0a0f1e] flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{driver.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0a0f1e]">{driver.name}</p>
                  <p className="text-xs text-[#9ca3af]">{driver.vehicleModel}</p>
                </div>
              </div>
              <StatusBadge status={driver.available ? 'available' : 'unavailable'} />
            </div>
            <div className="flex flex-col gap-1.5 text-xs text-[#4b5563]">
              <div className="flex justify-between">
                <span>Vehicle</span>
                <span className="font-medium text-[#0a0f1e]">{driver.vehicleNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Rating</span>
                <span className="flex items-center gap-1 font-medium text-[#0a0f1e]">
                  <Star size={11} className="text-amber-400" fill="currentColor" />
                  {driver.rating}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Today's Earnings</span>
                <span className="font-medium text-[#0a0f1e]">{formatCurrency(driver.todayEarnings)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Rides</span>
                <span className="font-medium text-[#0a0f1e]">{driver.totalRides.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Verified</span>
                <span className={`font-medium ${driver.verified ? 'text-[#10b981]' : 'text-amber-600'}`}>
                  {driver.verified ? '✓ Yes' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
