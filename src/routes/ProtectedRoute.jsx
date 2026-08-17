import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * ProtectedRoute
 *
 * Wraps routes that require authentication. Optionally restricts to a specific role.
 * In a production app, replace the mock auth check with a real token/session validation.
 */
export default function ProtectedRoute({ requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to user's own dashboard if they try to access another role's area
    const dashboards = {
      customer: '/customer/dashboard',
      driver: '/driver/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={dashboards[user.role] || '/'} replace />;
  }

  return <Outlet />;
}
