import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <nav className="h-14 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 shadow-sm">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-auto">
            {/* 
               properly commented out as this is managed by Sidebar.tsx
                {isDarkMode ? (
              <img 
                src="/helix-matrix-dark.png" 
                alt="GeneSysX Logo" 
                className="h-full w-auto"
              />
            ) : (
              <img 
                src="/helix-matrix-light.png" 
                alt="GeneSysX Logo" 
                className="h-full w-auto"
              />
            )} */}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg 
              bg-gray-100 dark:bg-slate-700
              text-gray-700 dark:text-gray-200
              hover:bg-gray-200 dark:hover:bg-slate-600
              border border-gray-200 dark:border-slate-600
              shadow-sm hover:shadow
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
          
          <div 
          className="h-8 w-8 rounded-full 
            bg-gray-100 dark:bg-slate-700
            border border-gray-200 dark:border-slate-600
            shadow-sm
            flex items-center justify-center">
            <span className="text-sm font-medium 
              text-indigo-600 dark:text-indigo-400">
              GX
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
