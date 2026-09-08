import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Car, Navigation, IndianRupee, Activity, ShieldAlert,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatRelativeDate } from '../../utils/formatDate';
import StatCard from '../../components/admin/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { useApi } from '../../hooks/useApi';

// Tiny bar chart using CSS
function MiniBarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-sm transition-all duration-300"
            style={{
              height: `${max > 0 ? (d.value / max) * 52 : 0}px`,
              background: '#111827',
            }}
            title={`${d.label}: ${formatCurrency(d.value)}`}
          />
          <span className="text-[9px]" style={{ color: '#6b7280' }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

const revenueData = [
  { label: 'Mon', value: 12000 },
  { label: 'Tue', value: 18500 },
  { label: 'Wed', value: 14200 },
  { label: 'Thu', value: 21000 },
  { label: 'Fri', value: 25000 },
  { label: 'Sat', value: 31000 },
  { label: 'Sun', value: 19800 },
];

const glass = {
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 4,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data: allData, loading } = useApi('/api/data');

  if (loading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const activeAlerts = allData?.sosAlerts?.filter(a => a.status === 'active') || [];
  const recentRides = (allData?.bookings || []).slice(-5).reverse();
  
  const totalUsers = allData?.users?.length || 0;
  const activeDrivers = allData?.drivers?.filter(d => d.available).length || 0;
  const activeRidesCount = allData?.bookings?.filter(b => b.status === 'in_progress' || b.status === 'accepted').length || 0;
  const todayRevenue = allData?.bookings?.filter(b => b.status === 'completed').reduce((sum, b) => sum + (b.total || 0), 0) || 0;
  const totalRides = allData?.bookings?.length || 0;
  const activeSOS = activeAlerts.length;

  const activityList = allData?.systemActivity || recentRides.map(r => ({
    id: `act_${r.id}`,
    type: 'booking',
    message: `Ride ${r.id} was ${r.status}`,
    time: 'Recently',
    date: 'Today',
  }));

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 sm:px-6 py-6 gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
          Operations Dashboard
        </h1>
        <p className="text-sm mt-0.5" style={{ color: '#9ca3af' }}>
          RideSphere Platform · Live Overview
        </p>
      </div>

      {/* Active SOS alert banner */}
      {activeAlerts.length > 0 && (
        <button
          onClick={() => navigate('/admin/sos-alerts')}
          className="w-full flex items-center gap-3 rounded px-4 py-3 hover:opacity-90 transition-opacity"
          style={{
            background: '#111827',
            border: '1px solid rgba(239,68,68,0.25)',
          }}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#dc2626]" />
          </span>
          <p className="text-sm font-semibold flex-1 text-left" style={{ color: '#ef4444' }}>
            {activeAlerts.length} Active SOS Alert{activeAlerts.length > 1 ? 's' : ''} · Click to respond
          </p>
          <ShieldAlert size={18} style={{ color: '#dc2626' }} />
        </button>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Users" value={totalUsers.toLocaleString()} icon={Users} color="blue" trend={8} />
        <StatCard label="Active Drivers" value={activeDrivers} icon={Car} color="green" trend={3} />
        <StatCard label="Active Rides" value={activeRidesCount} icon={Navigation} color="indigo" trend={12} />
        <StatCard label="Today's Revenue" value={formatCurrency(todayRevenue)} icon={IndianRupee} color="navy" trend={15} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Revenue chart */}
        <div style={{ ...glass, padding: 20 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: '#f9fafb' }}>Weekly Revenue</h2>
            <span className="text-xs" style={{ color: '#6b7280' }}>This week</span>
          </div>
          <p className="text-2xl font-bold mb-4" style={{ color: '#f9fafb' }}>
            {formatCurrency(revenueData.reduce((a, d) => a + d.value, 0))}
          </p>
          <MiniBarChart data={revenueData} />
        </div>

        {/* Platform health */}
        <div style={{ ...glass, padding: 20 }}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: '#f9fafb' }}>Platform Health</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Total Rides (All time)', value: totalRides.toLocaleString() },
              { label: 'Avg. Driver Rating', value: `4.8 ★` },
              { label: 'SOS Alerts Resolved', value: allData?.sosAlerts?.filter(a => a.status === 'resolved')?.length || 0 },
              { label: 'Active SOS Alerts', value: activeSOS, alert: true },
            ].map(({ label, value, alert }) => (
              <div
                key={label}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: '1px solid #1f2937' }}
              >
                <span className="text-sm" style={{ color: '#9ca3af' }}>{label}</span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: alert && value > 0 ? '#ef4444' : '#f9fafb' }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent rides table */}
      <div style={{ ...glass, overflow: 'hidden' }}>
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid #1f2937' }}
        >
          <h2 className="text-sm font-semibold" style={{ color: '#f9fafb' }}>Recent Rides</h2>
          <button
            onClick={() => navigate('/admin/rides')}
            className="text-xs font-medium hover:underline"
            style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #1f2937', background: '#111827' }}>
                {['Ride ID', 'Customer', 'Driver', 'Route', 'Fare', 'Status'].map(h => (
                  <th
                    key={h}
                    className="text-left px-5 py-2.5 text-xs font-medium uppercase tracking-wide"
                    style={{ color: '#6b7280' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentRides.map(ride => (
                <tr
                  key={ride.id}
                  style={{ borderBottom: '1px solid #111827' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#111827'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: '#6b7280' }}>
                    {ride.id.toUpperCase()}
                  </td>
                  <td className="px-5 py-3 font-medium" style={{ color: '#f9fafb' }}>{ride.customerName}</td>
                  <td className="px-5 py-3" style={{ color: '#9ca3af' }}>{ride.driverName}</td>
                  <td className="px-5 py-3 max-w-[160px] truncate" style={{ color: '#9ca3af' }}>
                    {ride.pickup} → {ride.destination}
                  </td>
                  <td className="px-5 py-3 font-medium" style={{ color: '#f9fafb' }}>
                    {formatCurrency(ride.total)}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={ride.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System activity */}
      <div style={{ ...glass, padding: 20 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity size={16} style={{ color: '#2563eb' }} />
            <h2 className="text-sm font-semibold" style={{ color: '#f9fafb' }}>Recent Activity</h2>
          </div>
          <button
            onClick={() => navigate('/admin/activity')}
            style={{ fontSize: 12, fontWeight: 600, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            View all
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {activityList.slice(0, 5).map(act => (
            <div key={act.id} className="flex items-start gap-3">
              <div
                className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                style={{
                  background:
                    act.type === 'sos' ? '#dc2626' :
                    act.type === 'booking' ? '#2563eb' :
                    act.type === 'payment' ? '#16a34a' :
                    '#4b5563',
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: '#e5e7eb' }}>{act.message}</p>
                <p className="text-xs" style={{ color: '#6b7280' }}>{act.time} · {act.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
