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

  const login = ({ email, password, role }) => {
    const cred = MOCK_CREDENTIALS[email.toLowerCase()];
    if (!cred) return { success: false, error: 'Account not found.' };
    if (cred.password !== password) return { success: false, error: 'Incorrect password.' };
    if (role && cred.role !== role) return { success: false, error: `This account is not a ${role} account.` };

    const userData = {
      id: cred.id,
      email,
      role: cred.role,
      name: email === 'rajesh@example.com' ? 'Rajesh Kumar'
          : email === 'admin@ridesphere.in' ? 'Admin User'
          : 'Abhay Prasad',
    };
    setUser(userData);
    localStorage.setItem('ridesphere_user', JSON.stringify(userData));
    return { success: true, role: cred.role, dashboard: ROLE_DASHBOARDS[cred.role] };
  };

  const register = ({ name, email, phone, password, role }) => {
    // Mock registration — always succeeds in demo
    const userData = { id: 'new_' + Date.now(), email, name, role: role || 'customer' };
    setUser(userData);
    localStorage.setItem('ridesphere_user', JSON.stringify(userData));
    return { success: true, role: userData.role, dashboard: ROLE_DASHBOARDS[userData.role] };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ridesphere_user');
  };

  const value = { user, loading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
