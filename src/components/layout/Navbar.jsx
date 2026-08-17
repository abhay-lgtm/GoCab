import { Link, useNavigate } from 'react-router-dom';
import { MapPin, LogIn, UserPlus, LogOut, User, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

// Logo mark component reused across nav & landing
export function RideSphereLogoMark({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      {/* Road */}
      <rect x="14" y="6" width="4" height="20" rx="2" fill="#3b6ef8" opacity="0.15" />
      {/* Pin body */}
      <path
        d="M16 3C12.134 3 9 6.134 9 10c0 5.25 7 14 7 14s7-8.75 7-14c0-3.866-3.134-7-7-7Z"
        fill="#3b6ef8"
      />
      {/* Pin hole */}
      <circle cx="16" cy="10" r="2.5" fill="white" />
      {/* Subtle road lines */}
      <rect x="15.25" y="20" width="1.5" height="3" rx="0.75" fill="#3b6ef8" opacity="0.4" />
      <rect x="15.25" y="25" width="1.5" height="3" rx="0.75" fill="#3b6ef8" opacity="0.2" />
    </svg>
  );
}

export function RideSphereLogo({ dark = false }) {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 group focus-visible:outline-none"
      aria-label="RideSphere home"
    >
      <RideSphereLogoMark size={30} />
      <span
        className={`text-lg font-bold tracking-tight ${
          dark ? 'text-white' : 'text-[#0a0f1e]'
        } group-hover:opacity-80 transition-opacity`}
      >
        Ride<span className="text-[#3b6ef8]">Sphere</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const dashboardLink =
    user?.role === 'driver' ? '/driver/dashboard' :
    user?.role === 'admin' ? '/admin/dashboard' :
    '/customer/dashboard';

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#e4e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <RideSphereLogo />

        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Link to={dashboardLink}>
                <Button variant="ghost" size="sm">
                  <User size={15} />
                  Dashboard
                </Button>
              </Link>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                <LogOut size={15} />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <LogIn size={15} />
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  <UserPlus size={15} />
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
