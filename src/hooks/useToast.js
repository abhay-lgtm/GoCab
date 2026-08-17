import { useState, useCallback } from 'react';

let toastIdCounter = 0;

/**
 * useToast
 *
 * Returns { toasts, addToast, removeToast }
 * Types: 'success' | 'error' | 'info' | 'warning'
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'info', duration = 3500 }) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
