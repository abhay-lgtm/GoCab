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
      <div className="flex h-screen overflow-hidden bg-[#f8f9fc]">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main content */}
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
            <div className="page-enter">
              <Outlet />
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
