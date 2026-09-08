import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard, Car, ShieldCheck, History, User,
  Navigation, List, AlertTriangle, Users, Activity, MapPin, Mic,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const customerLinks = [
  { to: '/customer/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/customer/book', label: 'Book', icon: Car },
  { to: '/customer/saferide', label: 'Safe', icon: ShieldCheck },
  { to: '/customer/history', label: 'History', icon: History },
  { to: '/customer/profile', label: 'Profile', icon: User },
];

const driverLinks = [
  { to: '/driver/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/driver/requests', label: 'Requests', icon: List },
  { to: '/driver/ride/r5', label: 'Ride', icon: Navigation },
  { to: '/driver/history', label: 'History', icon: History },
  { to: '/driver/profile', label: 'Profile', icon: User },
];

const adminLinks = [
  { to: '/admin/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/drivers', label: 'Drivers', icon: Car },
  { to: '/admin/sos-alerts', label: 'SOS', icon: AlertTriangle },
  { to: '/admin/activity', label: 'Activity', icon: Activity },
];

const linksByRole = { customer: customerLinks, driver: driverLinks, admin: adminLinks };

export default function MobileNavigation() {
  const { user } = useAuth();
  const links = linksByRole[user?.role] || customerLinks;

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 safe-area-bottom bg-[#0a0d14] border-t border-[#1f2937]"
    >
      <ul className="flex items-center justify-around h-16 px-2">
        {links.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex flex-col items-center justify-center gap-0.5 py-1 rounded transition-all duration-150 w-full',
                  isActive ? 'text-[#2563eb]' : 'text-[#6b7280] hover:text-[#9ca3af]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={clsx(
                      'w-10 h-7 flex items-center justify-center rounded transition-all duration-150',
                      isActive && 'bg-[#2563eb]/15'
                    )}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="text-[10px] font-medium">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
