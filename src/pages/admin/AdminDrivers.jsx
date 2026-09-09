import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { useApi, apiPost } from '../../hooks/useApi';

export default function AdminDrivers() {
  const [search, setSearch] = useState('');
  const { data: allData, loading, refetch } = useApi('/api/data');
  const [updatingId, setUpdatingId] = useState(null);

  const handleToggleVerify = async (driverId, currentVerified) => {
    setUpdatingId(driverId);
    try {
      await apiPost(`/api/drivers/${driverId}/verify`, { verified: !currentVerified });
      refetch();
    } catch (err) {
      console.error('Failed to toggle verification:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const drivers = allData?.drivers || [];
  
  const filtered = drivers.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.vehicleNumber?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 sm:px-6 py-6 gap-5">
      <div>
        <h1 className="text-2xl font-bold text-[#f9fafb] tracking-tight">Drivers</h1>
        <p className="text-sm text-[#9ca3af]">{drivers.length} registered drivers</p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
        <input
          type="text"
          placeholder="Search drivers or vehicle number..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded text-sm bg-[#111827] border border-[#1f2937] text-[#f9fafb] placeholder-[#6b7280] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(driver => (
          <div key={driver.id} className="bg-[#111827] rounded border border-[#1f2937] p-4 hover:border-[#374151] transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#1f2937] border border-[#374151] flex items-center justify-center">
                    <span className="text-sm font-bold text-[#f9fafb]">{driver.name?.charAt(0) || '?'}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#f9fafb]">{driver.name}</p>
                    <p className="text-xs text-[#9ca3af]">{driver.vehicleModel}</p>
                  </div>
                </div>
                <StatusBadge status={driver.available ? 'available' : 'unavailable'} />
              </div>
              <div className="flex flex-col gap-2 text-xs text-[#9ca3af]">
                <div className="flex justify-between">
                  <span>Vehicle</span>
                  <span className="font-medium text-[#f9fafb]">{driver.vehicleNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating</span>
                  <span className="flex items-center gap-1 font-medium text-[#f9fafb]">
                    <Star size={11} className="text-amber-400" fill="currentColor" />
                    {driver.rating || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Today's Earnings</span>
                  <span className="font-medium text-[#f9fafb]">—</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Rides</span>
                  <span className="font-medium text-[#f9fafb]">{driver.totalRides?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className={`font-medium ${driver.verified ? 'text-[#16a34a]' : 'text-amber-500'}`}>
                    {driver.verified ? '✓ Verified' : 'Pending Verification'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-[#1f2937] flex items-center justify-between">
              <span className="text-xs text-[#9ca3af]">
                {driver.verified ? 'Can accept SafeRides' : 'Standard rides only'}
              </span>
              <Button
                variant={driver.verified ? 'secondary' : 'primary'}
                size="sm"
                loading={updatingId === driver.id}
                onClick={() => handleToggleVerify(driver.id, driver.verified)}
              >
                {driver.verified ? 'Unverify' : 'Verify Driver'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
