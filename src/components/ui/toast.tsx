'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  } | null>(null);

  const showToast = (message: string, type: ToastType = 'default', duration = 3000) => {
    setToast({ message, type, isVisible: true });
    
    setTimeout(() => {
      setToast(prev => prev ? { ...prev, isVisible: false } : null);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={cn(
            'fixed bottom-4 right-4 z-50 p-4 rounded-md shadow-lg transition-opacity duration-300',
            {
              'bg-white text-gray-900': toast.type === 'default',
              'bg-green-500 text-white': toast.type === 'success',
              'bg-red-500 text-white': toast.type === 'error',
              'bg-yellow-500 text-white': toast.type === 'warning',
              'bg-blue-500 text-white': toast.type === 'info',
              'opacity-100': toast.isVisible,
              'opacity-0': !toast.isVisible,
            }
          )}
          role="alert"
        >
          <div className="flex items-center">
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-4 text-white/70 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
