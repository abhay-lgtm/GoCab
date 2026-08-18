import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardShell from '../layouts/DashboardShell';

// Public pages
import Landing from '../pages/public/Landing';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

// Customer pages
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import BookRide from '../pages/customer/BookRide';
import VoiceBooking from '../pages/customer/VoiceBooking';
import SafeRide from '../pages/customer/SafeRide';
import RideConfirmation from '../pages/customer/RideConfirmation';
import TrackRide from '../pages/customer/TrackRide';
import SOSScreen from '../pages/customer/SOSScreen';
import Payment from '../pages/customer/Payment';
import RideHistory from '../pages/customer/RideHistory';
import CustomerProfile from '../pages/customer/Profile';

// Driver pages
import DriverDashboard from '../pages/driver/DriverDashboard';
import RideRequests from '../pages/driver/RideRequests';
import CurrentRide from '../pages/driver/CurrentRide';
import DriverRideHistory from '../pages/driver/DriverRideHistory';
import DriverProfile from '../pages/driver/DriverProfile';

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminDrivers from '../pages/admin/AdminDrivers';
import AdminRides from '../pages/admin/AdminRides';
import AdminSOSAlerts from '../pages/admin/AdminSOSAlerts';
import SystemActivity from '../pages/admin/SystemActivity';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer routes */}
      <Route element={<DashboardShell />}>
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/book" element={<BookRide />} />
        <Route path="/customer/voice-booking" element={<VoiceBooking />} />
        <Route path="/customer/saferide" element={<SafeRide />} />
        <Route path="/customer/confirm" element={<RideConfirmation />} />
        <Route path="/customer/ride/:rideId" element={<TrackRide />} />
        <Route path="/customer/sos" element={<SOSScreen />} />
        <Route path="/customer/payment/:rideId" element={<Payment />} />
        <Route path="/customer/history" element={<RideHistory />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
      </Route>

      {/* Driver routes */}
      <Route element={<DashboardShell />}>
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/requests" element={<RideRequests />} />
        <Route path="/driver/ride/:rideId" element={<CurrentRide />} />
        <Route path="/driver/history" element={<DriverRideHistory />} />
        <Route path="/driver/profile" element={<DriverProfile />} />
      </Route>

      {/* Admin routes */}
      <Route element={<DashboardShell />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/drivers" element={<AdminDrivers />} />
        <Route path="/admin/rides" element={<AdminRides />} />
        <Route path="/admin/sos-alerts" element={<AdminSOSAlerts />} />
        <Route path="/admin/activity" element={<SystemActivity />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
