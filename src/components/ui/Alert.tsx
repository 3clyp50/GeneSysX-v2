import React from 'react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  title,
  children,
  variant = 'info',
  onClose,
  className = '',
}) => {
  const variants = {
    info: {
      container: 'bg-blue-50 dark:bg-slate-800 border-blue-200 dark:border-blue-800',
      icon: <InformationCircleIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
      title: 'text-blue-800 dark:text-blue-300',
      content: 'text-blue-700 dark:text-blue-200',
    },
    success: {
      container: 'bg-green-50 dark:bg-slate-800 border-green-200 dark:border-green-800',
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />,
      title: 'text-green-800 dark:text-green-300',
      content: 'text-green-700 dark:text-green-200',
    },
    warning: {
      container: 'bg-yellow-50 dark:bg-slate-800 border-yellow-200 dark:border-yellow-800',
      icon: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />,
      title: 'text-yellow-800 dark:text-yellow-300',
      content: 'text-yellow-700 dark:text-yellow-200',
    },
    error: {
      container: 'bg-red-50 dark:bg-slate-800 border-red-200 dark:border-red-800',
      icon: <XCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" />,
      title: 'text-red-800 dark:text-red-300',
      content: 'text-red-700 dark:text-red-200',
    },
  };

  return (
    <div
      className={`
        relative rounded-lg border p-4
        ${variants[variant].container}
        ${className}
      `}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {variants[variant].icon}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${variants[variant].title}`}>
              {title}
            </h3>
          )}
          <div className={`text-sm mt-1 ${variants[variant].content}`}>
            {children}
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              className={`
                inline-flex rounded-md p-1.5
                ${variants[variant].content}
                hover:bg-white dark:hover:bg-slate-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-offset-${variant}-50 focus:ring-${variant}-600
              `}
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;