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
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#e4e8f0] safe-area-bottom">
      <ul className="flex items-center justify-around h-16 px-2">
        {links.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition-all duration-150 w-full',
                  isActive ? 'text-[#3b6ef8]' : 'text-[#9ca3af] hover:text-[#4b5563]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={clsx(
                      'w-10 h-7 flex items-center justify-center rounded-xl transition-all duration-150',
                      isActive && 'bg-[#3b6ef8]/10'
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
