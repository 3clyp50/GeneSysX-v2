import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline';
  fullWidth?: boolean;
  className?: string;
  onChange?: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  variant = 'default',
  fullWidth = false,
  className = '',
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const variants = {
    default: {
      container: 'border-b border-slate-200 dark:border-slate-700',
      tab: `
        px-4 py-2 text-sm font-medium
        hover:text-slate-700 dark:hover:text-slate-200
        focus:outline-none focus:text-slate-700 dark:focus:text-slate-200
      `,
      active: `
        text-indigo-600 dark:text-indigo-400
        border-b-2 border-indigo-600 dark:border-indigo-400
      `,
      inactive: 'text-slate-500 dark:text-slate-400',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    pills: {
      container: 'space-x-2',
      tab: `
        px-4 py-2 text-sm font-medium rounded-full
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800
      `,
      active: `
        bg-indigo-600 dark:bg-indigo-500
        text-white
      `,
      inactive: `
        text-slate-700 dark:text-slate-300
        hover:bg-slate-100 dark:hover:bg-slate-700
      `,
      disabled: 'opacity-50 cursor-not-allowed',
    },
    underline: {
      container: '',
      tab: `
        px-4 py-2 text-sm font-medium
        border-b-2 border-transparent
        hover:border-slate-300 dark:hover:border-slate-600
        focus:outline-none
      `,
      active: `
        text-indigo-600 dark:text-indigo-400
        border-indigo-600 dark:border-indigo-400
      `,
      inactive: 'text-slate-500 dark:text-slate-400',
      disabled: 'opacity-50 cursor-not-allowed',
    },
  };

  return (
    <div className={className}>
      <div className={`flex ${fullWidth ? 'w-full' : ''} ${variants[variant].container}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            className={`
              ${variants[variant].tab}
              ${activeTab === tab.id ? variants[variant].active : variants[variant].inactive}
              ${tab.disabled ? variants[variant].disabled : ''}
              ${fullWidth ? 'flex-1' : ''}
              transition-colors duration-200
            `}
            disabled={tab.disabled}
          >
            <div className="flex items-center justify-center space-x-2">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;