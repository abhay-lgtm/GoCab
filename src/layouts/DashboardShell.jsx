import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import MobileNavigation from '../components/layout/MobileNavigation';
import { ToastContainer } from '../components/common/Toast';
import { useToast } from '../hooks/useToast';
import { createContext, useContext } from 'react';

const ToastContext = createContext(null);
export const useAppToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useAppToast must be used inside a layout');
  return ctx;
};

function DashboardShell() {
  const [collapsed, setCollapsed] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  return (
    <ToastContext.Provider value={addToast}>
      <div className="flex h-screen overflow-hidden" style={{ background: '#05091a' }}>
        {/* Subtle background glows */}
        <div style={{
          position: 'fixed', top: -300, left: -200, width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(79,126,255,0.07) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'fixed', bottom: -200, right: -150, width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        }} />
        {/* Subtle grid overlay */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(79,126,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(79,126,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <div className="flex-1 flex flex-col overflow-hidden" style={{ position: 'relative', zIndex: 1 }}>
          {/* Main content */}
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
            <div className="page-enter flex justify-center min-h-full p-4 sm:p-6 lg:p-10 lg:pt-16 xl:pt-24">
              <div className="w-full max-w-[900px]">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
      <MobileNavigation />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export default DashboardShell;
