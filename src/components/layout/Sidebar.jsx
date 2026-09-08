import { NavLink, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard, Car, ShieldCheck, MapPin, History,
  User, LogOut, AlertTriangle, Users, Activity, Navigation,
  ChevronLeft, ChevronRight, List,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const customerLinks = [
  { to: '/customer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/customer/book', label: 'Book Ride', icon: Car },
  { to: '/customer/saferide', label: 'SafeRide', icon: ShieldCheck },
  { to: '/customer/ride/r5', label: 'Active Ride', icon: Navigation },
  { to: '/customer/history', label: 'Ride History', icon: History },
  { to: '/customer/profile', label: 'Profile', icon: User },
];

const driverLinks = [
  { to: '/driver/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/driver/requests', label: 'Ride Requests', icon: List },
  { to: '/driver/ride/r5', label: 'Current Ride', icon: Navigation },
  { to: '/driver/history', label: 'Ride History', icon: History },
  { to: '/driver/profile', label: 'Profile', icon: User },
];

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/drivers', label: 'Drivers', icon: Car },
  { to: '/admin/rides', label: 'Rides', icon: MapPin },
  { to: '/admin/sos-alerts', label: 'SOS Alerts', icon: AlertTriangle },
  { to: '/admin/activity', label: 'System Activity', icon: Activity },
];

const linksByRole = { customer: customerLinks, driver: driverLinks, admin: adminLinks };

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = linksByRole[user?.role] || customerLinks;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside
      className={clsx(
        'hidden md:flex flex-col h-screen bg-[#0a0d14] border-r border-[#1f2937] transition-all duration-300 shrink-0',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-[#1f2937]">
        {!collapsed ? (
          <span className="text-xl font-bold text-white tracking-tight">
            GoCab
          </span>
        ) : (
          <span className="text-xl font-bold text-white tracking-tight mx-auto">
            G
          </span>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="flex flex-col gap-2 px-2">
          {links.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-[#2563eb] text-white'
                      : 'text-[#6b7280] hover:text-[#f9fafb] hover:bg-[#1f2937]',
                    collapsed && 'justify-center'
                  )
                }
                title={collapsed ? label : undefined}
              >
                <Icon size={18} />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User + Logout */}
      <div className="border-t border-[#1f2937] p-3 space-y-1">
        {!collapsed && user && (
          <div className="px-3 py-2 mb-1">
            <p className="text-xs font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-[#9ca3af] truncate capitalize">{user.role}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={clsx(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-sm text-sm font-medium text-[#6b7280] hover:text-[#f9fafb] hover:bg-[#1f2937] transition-all duration-150',
            collapsed && 'justify-center'
          )}
          title="Sign out"
        >
          <LogOut size={18} />
          {!collapsed && 'Sign out'}
        </button>
        <button
          onClick={onToggle}
          className={clsx(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-sm text-sm font-medium text-[#6b7280] hover:text-[#f9fafb] hover:bg-[#1f2937] transition-all duration-150',
            collapsed && 'justify-center'
          )}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={18} /> : (
            <>
              <ChevronLeft size={18} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
