import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'default' | 'light';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const variantClasses = {
    default: 'text-indigo-600 dark:text-indigo-400',
    light: 'text-white'
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      <div className={`animate-spin ${sizeClasses[size]}`}>
        <svg
          className={`${variantClasses[variant]}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`
          h-2 w-2 rounded-full 
          ${variantClasses[variant]} 
          animate-pulse
        `} />
      </div>
    </div>
  );
};

export const LoadingDots: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`
            w-1.5 h-1.5 rounded-full
            bg-gray-600 dark:bg-gray-400
            animate-bounce
          `}
          style={{
            animationDelay: `${i * 150}ms`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;
