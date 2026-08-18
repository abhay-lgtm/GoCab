import { useNavigate } from 'react-router-dom';
import {
  Users, Car, Navigation, IndianRupee, Activity, ShieldAlert,
} from 'lucide-react';
import { mockRides, mockAdminStats, mockSOSAlerts, mockSystemActivity } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatRelativeDate } from '../../utils/formatDate';
import StatCard from '../../components/admin/StatCard';
import StatusBadge from '../../components/common/StatusBadge';

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
              height: `${(d.value / max) * 52}px`,
              background: 'linear-gradient(to top, rgba(79,126,255,0.8), rgba(91,142,255,0.5))',
            }}
            title={`${d.label}: ${formatCurrency(d.value)}`}
          />
          <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{d.label}</span>
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
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const activeAlerts = mockSOSAlerts.filter(a => a.status === 'active');
  const recentRides = mockRides.slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
          Operations Dashboard
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
          RideSphere Platform · Live Overview
        </p>
      </div>

      {/* Active SOS alert banner */}
      {activeAlerts.length > 0 && (
        <button
          onClick={() => navigate('/admin/sos-alerts')}
          className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 hover:opacity-90 transition-opacity"
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.25)',
          }}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ef4444]" />
          </span>
          <p className="text-sm font-semibold flex-1 text-left" style={{ color: '#f87171' }}>
            {activeAlerts.length} Active SOS Alert{activeAlerts.length > 1 ? 's' : ''} · Click to respond
          </p>
          <ShieldAlert size={18} style={{ color: '#ef4444' }} />
        </button>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Users" value={mockAdminStats.totalUsers.toLocaleString()} icon={Users} color="blue" trend={8} />
        <StatCard label="Active Drivers" value={mockAdminStats.activeDrivers} icon={Car} color="green" trend={3} />
        <StatCard label="Active Rides" value={mockAdminStats.activeRides} icon={Navigation} color="indigo" trend={12} />
        <StatCard label="Today's Revenue" value={formatCurrency(mockAdminStats.todayRevenue)} icon={IndianRupee} color="navy" trend={15} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Revenue chart */}
        <div style={{ ...glass, padding: 20 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>Weekly Revenue</h2>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>This week</span>
          </div>
          <p className="text-2xl font-bold mb-4" style={{ color: 'rgba(255,255,255,0.92)' }}>
            {formatCurrency(revenueData.reduce((a, d) => a + d.value, 0))}
          </p>
          <MiniBarChart data={revenueData} />
        </div>

        {/* Platform health */}
        <div style={{ ...glass, padding: 20 }}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.85)' }}>Platform Health</h2>
          <div className="space-y-3">
            {[
              { label: 'Total Rides (All time)', value: mockAdminStats.totalRides.toLocaleString() },
              { label: 'Avg. Driver Rating', value: `${mockAdminStats.avgRating} ★` },
              { label: 'SOS Alerts Resolved', value: mockAdminStats.resolvedSOS },
              { label: 'Active SOS Alerts', value: mockAdminStats.activeSOS, alert: true },
            ].map(({ label, value, alert }) => (
              <div
                key={label}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: alert && value > 0 ? '#f87171' : 'rgba(255,255,255,0.85)' }}
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
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h2 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>Recent Rides</h2>
          <button
            onClick={() => navigate('/admin/rides')}
            className="text-xs font-medium hover:underline"
            style={{ color: '#5b8eff', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                {['Ride ID', 'Customer', 'Driver', 'Route', 'Fare', 'Status'].map(h => (
                  <th
                    key={h}
                    className="text-left px-5 py-2.5 text-xs font-medium uppercase tracking-wide"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
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
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {ride.id.toUpperCase()}
                  </td>
                  <td className="px-5 py-3 font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{ride.customerName}</td>
                  <td className="px-5 py-3" style={{ color: 'rgba(255,255,255,0.5)' }}>{ride.driverName}</td>
                  <td className="px-5 py-3 max-w-[160px] truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {ride.pickup} → {ride.destination}
                  </td>
                  <td className="px-5 py-3 font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
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
            <Activity size={16} style={{ color: '#5b8eff' }} />
            <h2 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>Recent Activity</h2>
          </div>
          <button
            onClick={() => navigate('/admin/activity')}
            style={{ fontSize: 12, fontWeight: 600, color: '#5b8eff', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            View all
          </button>
        </div>
        <div className="space-y-3">
          {mockSystemActivity.slice(0, 5).map(act => (
            <div key={act.id} className="flex items-start gap-3">
              <div
                className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                style={{
                  background:
                    act.type === 'sos' ? '#ef4444' :
                    act.type === 'booking' ? '#4f7eff' :
                    act.type === 'payment' ? '#10b981' :
                    'rgba(255,255,255,0.2)',
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{act.message}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{act.time} · {act.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
