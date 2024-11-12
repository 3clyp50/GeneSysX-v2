import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: {
      switch: 'w-8 h-4',
      dot: 'h-3 w-3',
      translate: 'translate-x-4',
    },
    md: {
      switch: 'w-11 h-6',
      dot: 'h-5 w-5',
      translate: 'translate-x-5',
    },
    lg: {
      switch: 'w-14 h-7',
      dot: 'h-6 w-6',
      translate: 'translate-x-7',
    },
  };

  return (
    <label className={`inline-flex items-center ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`
            ${sizes[size].switch}
            bg-slate-200 dark:bg-slate-700
            rounded-full
            ${checked ? 'bg-indigo-600 dark:bg-indigo-400' : ''}
            transition-colors duration-200
          `}
        />
        <div
          className={`
            ${sizes[size].dot}
            absolute left-0.5 top-0.5
            bg-white rounded-full
            transition-transform duration-200 ease-in-out
            ${checked ? sizes[size].translate : 'translate-x-0'}
          `}
        />
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-slate-900 dark:text-slate-100">
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch;