import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Car, Navigation, IndianRupee, AlertTriangle,
  TrendingUp, Activity, ShieldAlert,
} from 'lucide-react';
import { mockAdminStats, mockRides, mockSystemActivity, mockSOSAlerts } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';
import StatCard from '../../components/admin/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { formatRelativeDate } from '../../utils/formatDate';

// Tiny bar chart using CSS
function MiniBarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-sm bg-[#3b6ef8]/80 transition-all duration-300"
            style={{ height: `${(d.value / max) * 52}px` }}
            title={`${d.label}: ${formatCurrency(d.value)}`}
          />
          <span className="text-[9px] text-[#9ca3af]">{d.label}</span>
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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const activeAlerts = mockSOSAlerts.filter(a => a.status === 'active');
  const recentRides = mockRides.slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0a0f1e]">Operations Dashboard</h1>
        <p className="text-sm text-[#9ca3af] mt-0.5">RideSphere Platform · Live Overview</p>
      </div>

      {/* Active SOS alert banner */}
      {activeAlerts.length > 0 && (
        <button
          onClick={() => navigate('/admin/sos-alerts')}
          className="w-full flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 hover:bg-red-100 transition-colors"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ef4444]" />
          </span>
          <p className="text-sm font-semibold text-red-800 flex-1 text-left">
            {activeAlerts.length} Active SOS Alert{activeAlerts.length > 1 ? 's' : ''} — Click to respond
          </p>
          <ShieldAlert size={18} className="text-[#ef4444]" />
        </button>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Total Users"
          value={mockAdminStats.totalUsers.toLocaleString()}
          icon={Users}
          color="blue"
          trend={8}
        />
        <StatCard
          label="Active Drivers"
          value={mockAdminStats.activeDrivers}
          icon={Car}
          color="green"
          trend={3}
        />
        <StatCard
          label="Active Rides"
          value={mockAdminStats.activeRides}
          icon={Navigation}
          color="indigo"
          trend={12}
        />
        <StatCard
          label="Today's Revenue"
          value={formatCurrency(mockAdminStats.todayRevenue)}
          icon={IndianRupee}
          color="navy"
          trend={15}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Revenue chart */}
        <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[#0a0f1e]">Weekly Revenue</h2>
            <span className="text-xs text-[#9ca3af]">This week</span>
          </div>
          <p className="text-2xl font-bold text-[#0a0f1e] mb-4">
            {formatCurrency(revenueData.reduce((a, d) => a + d.value, 0))}
          </p>
          <MiniBarChart data={revenueData} />
        </div>

        {/* System stats */}
        <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5">
          <h2 className="text-sm font-semibold text-[#0a0f1e] mb-4">Platform Health</h2>
          <div className="space-y-3">
            {[
              { label: 'Total Rides (All time)', value: mockAdminStats.totalRides.toLocaleString() },
              { label: 'Avg. Driver Rating', value: `${mockAdminStats.avgRating} ★` },
              { label: 'SOS Alerts Resolved', value: mockAdminStats.resolvedSOS },
              { label: 'Active SOS Alerts', value: mockAdminStats.activeSOS, alert: true },
            ].map(({ label, value, alert }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[#f0f2f8] last:border-0">
                <span className="text-sm text-[#4b5563]">{label}</span>
                <span className={`text-sm font-semibold ${alert && value > 0 ? 'text-[#ef4444]' : 'text-[#0a0f1e]'}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent rides table */}
      <div className="bg-white rounded-2xl border border-[#e4e8f0] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f2f8]">
          <h2 className="text-sm font-semibold text-[#0a0f1e]">Recent Rides</h2>
          <button
            onClick={() => navigate('/admin/rides')}
            className="text-xs text-[#3b6ef8] font-medium hover:underline"
          >
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f0f2f8] bg-[#f8f9fc]">
                {['Ride ID', 'Customer', 'Driver', 'Route', 'Fare', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-2.5 text-xs font-medium text-[#9ca3af] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentRides.map(ride => (
                <tr key={ride.id} className="border-b border-[#f0f2f8] last:border-0 hover:bg-[#f8f9fc] transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-[#9ca3af]">{ride.id.toUpperCase()}</td>
                  <td className="px-5 py-3 text-[#0a0f1e] font-medium">{ride.customerName}</td>
                  <td className="px-5 py-3 text-[#4b5563]">{ride.driverName}</td>
                  <td className="px-5 py-3 text-[#4b5563] max-w-[160px] truncate">
                    {ride.pickup} → {ride.destination}
                  </td>
                  <td className="px-5 py-3 font-medium text-[#0a0f1e]">{formatCurrency(ride.total)}</td>
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
      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-[#3b6ef8]" />
            <h2 className="text-sm font-semibold text-[#0a0f1e]">Recent Activity</h2>
          </div>
          <button onClick={() => navigate('/admin/activity')} className="text-xs text-[#3b6ef8] font-medium hover:underline">
            View all
          </button>
        </div>
        <div className="space-y-3">
          {mockSystemActivity.slice(0, 5).map(act => (
            <div key={act.id} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                act.type === 'sos' ? 'bg-[#ef4444]' :
                act.type === 'booking' ? 'bg-[#3b6ef8]' :
                act.type === 'payment' ? 'bg-[#10b981]' : 'bg-[#9ca3af]'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#0a0f1e]">{act.message}</p>
                <p className="text-xs text-[#9ca3af]">{act.time} · {act.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
