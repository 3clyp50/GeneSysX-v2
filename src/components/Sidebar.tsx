import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BeakerIcon,
  ChartBarIcon,
  CpuChipIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  XMarkIcon,
  Bars3Icon,
  LockOpenIcon,
  LockClosedIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isDarkMode: boolean;
}

interface NavItem {
  name: string;
  to: string;
  icon: React.ReactNode;
  category?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, isDarkMode }) => {
  const location = useLocation();
  const [isLocked, setIsLocked] = useState(false);

  const handleToggle = () => {
    if (!isLocked) {
      toggleSidebar();
    }
  };

  const toggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLocked(!isLocked);
  };

  // Floating button when sidebar is closed
  const SidebarToggleButton = () => (
    <button
      onClick={toggleSidebar}
      className={`
        fixed top-4 left-4 z-50
        rounded-lg p-2
        bg-white dark:bg-slate-800
        shadow-lg
        text-slate-600 dark:text-slate-300
        hover:bg-slate-100 dark:hover:bg-slate-700
        transition-all duration-200
        ${isOpen ? 'hidden' : 'flex'}
      `}
    >
      <Bars3Icon className="h-6 w-6" />
    </button>
  );

  const navigation: NavItem[] = [
    { name: 'Home', to: '/', icon: <HomeIcon className="h-5 w-5" /> },
    { 
      name: 'Sequence Analysis', 
      to: '/sequence-analysis', 
      icon: <BeakerIcon className="h-5 w-5" />,
      category: 'Bioinformatics'
    },
    { 
      name: 'Phylogenetic Analysis', 
      to: '/phylogenetic-analysis', 
      icon: <BeakerIcon className="h-5 w-5" />,
      category: 'Bioinformatics'
    },
    { 
      name: 'Protein Analysis', 
      to: '/protein-analysis', 
      icon: <BeakerIcon className="h-5 w-5" />,
      category: 'Bioinformatics'
    },
    { 
      name: 'GymSysX', 
      to: '/gym-sysx', 
      icon: <ChartBarIcon className="h-5 w-5" />,
      category: 'Machine Learning'
    },
    { 
      name: 'BioPrompt', 
      to: '/bio-prompt', 
      icon: <ChartBarIcon className="h-5 w-5" />,
      category: 'Machine Learning'
    },
    { 
      name: 'Genetic Constructor', 
      to: '/genetic-constructor', 
      icon: <CpuChipIcon className="h-5 w-5" />,
      category: 'Synthetic Biology'
    },
    { 
      name: 'Marimo Notebook',
      icon: <BookOpenIcon className="h-4 w-4" />,
      to: '/marimo-notebook',
      category: 'General Tools & APIs'
    },
    { name: 'Chat',
      to: '/dna-chat',
      icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />,
      category: 'General Tools & APIs'
    },
    {
      name: 'Documentation', 
      to: '/documentation', 
      icon: <DocumentTextIcon className="h-5 w-5" />,
      category: 'General Tools & APIs' 
    },
  ];

  const categories = ['Bioinformatics', 'Machine Learning', 'Synthetic Biology', 'General Tools & APIs'];

  return (
    <>
      <SidebarToggleButton />
      <div
        className={`
          fixed inset-y-0 left-0 z-40
          w-64 bg-white dark:bg-slate-800
          border-r border-slate-200 dark:border-slate-700
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isLocked ? 'shadow-xl' : 'shadow-lg hover:shadow-xl'}
        `}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center">
            <img src="/helix-matrix-dark.png" alt="Logo" className="h-15 w-15" />
            <span className="ml-2 text-xl font-semibold text-slate-900 dark:text-white">
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLock}
              className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
              title={isLocked ? "Unlock Sidebar" : "Lock Sidebar"}
            >
              {isLocked ? (
                <LockClosedIcon className="h-5 w-5" />
              ) : (
                <LockOpenIcon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={handleToggle}
              className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <nav className="mt-4 px-2 space-y-4">
          {/* Main navigation items */}
          {navigation
            .filter(item => !item.category)
            .map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.to
                    ? 'bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}

          {/* Categorized items */}
          {categories.map((category) => (
            <div key={category} className="space-y-1">
              <h3 className="px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {category}
              </h3>
              {navigation
                .filter(item => item.category === category)
                .map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === item.to
                        ? 'bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                ))}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
