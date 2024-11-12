import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast, { ToastProps } from './Toast';

interface ToastContextType {
  showToast: (props: Omit<ToastProps, 'id' | 'onClose'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = useCallback((props: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((currentToasts) => [...currentToasts, { ...props, id, onClose: removeToast }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 min-w-[320px] max-w-[420px]">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Utility function to create preset toast types
export const createToastPresets = (showToast: ToastContextType['showToast']) => ({
  success: (message: string, duration?: number) => 
    showToast({ type: 'success', message, duration }),
  
  error: (message: string, duration?: number) => 
    showToast({ type: 'error', message, duration }),
  
  info: (message: string, duration?: number) => 
    showToast({ type: 'info', message, duration }),
});

// Example usage:
// const { showToast } = useToast();
// const toast = createToastPresets(showToast);
// toast.success('Operation completed successfully');
// toast.error('An error occurred');
// toast.info('New updates available');