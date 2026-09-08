import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// Mock credentials for demo login
const MOCK_CREDENTIALS = {
  'abhay@example.com': { password: 'password123', role: 'customer', id: 'u1' },
  'rajesh@example.com': { password: 'password123', role: 'driver', id: 'd1' },
  'admin@ridesphere.in': { password: 'admin123', role: 'admin', id: 'a1' },
};

const ROLE_DASHBOARDS = {
  customer: '/customer/dashboard',
  driver: '/driver/dashboard',
  admin: '/admin/dashboard',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ridesphere_user');
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password, role }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) return { success: false, error: data.message || 'Login failed' };
      
      if (role && data.role !== role) {
        return { success: false, error: `This account is not a ${role} account.` };
      }

      const userData = {
        id: data.userId,
        email,
        role: data.role,
        name: data.role === 'admin' ? 'Admin User' : (data.role === 'driver' ? 'Rajesh Kumar' : 'Abhay Prasad'),
        token: data.token
      };
      
      setUser(userData);
      localStorage.setItem('ridesphere_user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
      return { success: true, role: data.role, dashboard: ROLE_DASHBOARDS[data.role] };
    } catch (error) {
      return { success: false, error: 'Network error. Backend might not be running.' };
    }
  };

  const register = async ({ name, email, phone, password, role }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: role || 'customer' })
      });
      const data = await response.json();
      if (!response.ok) return { success: false, error: data.message || 'Registration failed' };

      // After register, you typically want to login automatically, or return success to prompt login.
      // We'll log them in directly
      return await login({ email, password, role: role || 'customer' });
    } catch (error) {
      return { success: false, error: 'Network error. Backend might not be running.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ridesphere_user');
    localStorage.removeItem('token');
  };

  const value = { user, loading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
