import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BeakerIcon,
  ChartBarIcon,
  CpuChipIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  DocumentMagnifyingGlassIcon,
  CircleStackIcon,
  CommandLineIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BookOpenIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

const Toolbox: React.FC = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Bioinformatics': true,
    'Machine Learning': true,
    'Synthetic Biology': true,
  });

  const toolboxes = [
    {
      title: 'Bioinformatics',
      icon: <BeakerIcon className="h-5 w-5" />,
      tools: [
        {
          name: 'Sequence Analysis',
          icon: <DocumentMagnifyingGlassIcon className="h-4 w-4" />,
          path: '/sequence-analysis',
          description: 'Analyze DNA, RNA, and protein sequences'
        },
        {
          name: 'Phylogenetic Analysis',
          icon: <ChartPieIcon className="h-4 w-4" />,
          path: '/phylogenetic-analysis',
          description: 'Build and analyze evolutionary trees'
        },
        {
          name: 'Protein Analysis',
          icon: <DocumentDuplicateIcon className="h-4 w-4" />,
          path: '/protein-analysis',
          description: 'Protein structure and function prediction'
        },
      ]
    },
    {
      title: 'Machine Learning',
      icon: <ChartBarIcon className="h-5 w-5" />,
      tools: [
        {
          name: 'GymSysX',
          icon: <CircleStackIcon className="h-4 w-4" />,
          path: '/gym-sysx',
          description: 'ML environment for biological systems'
        },
        {
          name: 'BioPrompt',
          icon: <CommandLineIcon className="h-4 w-4" />,
          path: '/bio-prompt',
          description: 'AI-powered sequence analysis'
        },
      ]
    },
    {
      title: 'Synthetic Biology',
      icon: <CpuChipIcon className="h-5 w-5" />,
      tools: [
        {
          name: 'Genetic Constructor',
          icon: <DocumentDuplicateIcon className="h-4 w-4" />,
          path: '/genetic-constructor',
          description: 'Design and optimize genetic circuits'
        },
      ]
    },
    {
        title: 'General Tools & APIs',
        icon: <BoltIcon className="h-5 w-5" />,
        tools: [
        {
            name: 'Marimo Notebook',
            icon: <BookOpenIcon className="h-4 w-4" />,
            path: '/marimo-notebook',
            description: 'Interactive Python notebook environment'
        },
        ]
      },
  ];

  const handleToolClick = (path: string) => {
    navigate(path);
  };

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-200 dark:border-slate-700 p-4">
      <div className="flex flex-wrap gap-6 justify-center">
        {toolboxes.map((toolbox) => (
          <div key={toolbox.title} className="flex-1 min-w-[250px] max-w-[400px]">
            <button
              onClick={() => toggleSection(toolbox.title)}
              className="w-full flex items-center justify-between gap-2 mb-3 p-2 rounded-lg 
                bg-gray-50 dark:bg-slate-700/50
                hover:bg-gray-100 dark:hover:bg-slate-700 
                border border-gray-200 dark:border-slate-600
                text-gray-900 dark:text-white
                shadow-sm hover:shadow
                transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg 
                  bg-white dark:bg-slate-800
                  border border-gray-200 dark:border-slate-600
                  text-gray-700 dark:text-gray-200
                  shadow-sm">
                  {toolbox.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {toolbox.title}
                </h3>
              </div>
              {expandedSections[toolbox.title] ? (
                <ChevronUpIcon className="h-4 w-4 text-gray-500 dark:text-slate-400" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-slate-400" />
              )}
            </button>
            
            <div className={`
              grid grid-cols-1 gap-2 transition-all duration-300
              ${expandedSections[toolbox.title] 
                ? 'opacity-100 max-h-[500px]' 
                : 'opacity-0 max-h-0 overflow-hidden'}
            `}>
              {toolbox.tools.map((tool) => (
                <button
                  key={tool.name}
                  onClick={() => handleToolClick(tool.path)}
                  className="flex items-center gap-3 p-2 rounded-lg 
                    bg-white dark:bg-slate-800
                    hover:bg-gray-50 dark:hover:bg-slate-700 
                    border border-gray-200 dark:border-slate-600
                    text-gray-900 dark:text-white
                    shadow-sm hover:shadow
                    transition-all duration-200
                    text-left
                    group"
                >
                  <div className="p-1.5 rounded-lg 
                    bg-gray-50 dark:bg-slate-700
                    border border-gray-200 dark:border-slate-600
                    text-gray-700 dark:text-gray-200
                    group-hover:bg-gray-100 dark:group-hover:bg-slate-600
                    transition-colors">
                    {tool.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {tool.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">
                      {tool.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbox;
