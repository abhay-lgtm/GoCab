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
      <div className="flex h-screen overflow-hidden bg-[#0a0d14]">
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
