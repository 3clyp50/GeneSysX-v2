import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showValue?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showValue = false,
  label,
  className = '',
  animated = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variants = {
    default: {
      bar: 'bg-indigo-600 dark:bg-indigo-500',
      text: 'text-indigo-600 dark:text-indigo-400',
    },
    success: {
      bar: 'bg-green-600 dark:bg-green-500',
      text: 'text-green-600 dark:text-green-400',
    },
    warning: {
      bar: 'bg-yellow-600 dark:bg-yellow-500',
      text: 'text-yellow-600 dark:text-yellow-400',
    },
    error: {
      bar: 'bg-red-600 dark:bg-red-500',
      text: 'text-red-600 dark:text-red-400',
    },
  };

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {label}
            </span>
          )}
          {showValue && (
            <span className={`text-sm font-medium ${variants[variant].text}`}>
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className={`
        w-full bg-slate-200 dark:bg-slate-700 
        rounded-full overflow-hidden
        ${sizes[size]}
      `}>
        <div
          className={`
            ${variants[variant].bar}
            ${animated ? 'transition-all duration-500 ease-in-out' : ''}
            rounded-full
            ${sizes[size]}
          `}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {/* Add shimmer effect for animated progress bars */}
          {animated && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;