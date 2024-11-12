import React, { useState, useEffect } from 'react';
import { 
  BookOpenIcon, 
  CommandLineIcon,
  ChartBarIcon,
  BeakerIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  ArrowPathIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from '@heroicons/react/24/outline';

interface ExampleNotebook {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category: 'general' | 'bioinformatics' | 'machine-learning';
}

const MarimoPad: React.FC = () => {
  const [currentNotebook, setCurrentNotebook] = useState<string>("https://marimo.app/l/aojjhb?embed=true");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle fullscreen with F11 or Cmd/Ctrl + Enter
      if (e.key === 'F11' || ((e.metaKey || e.ctrlKey) && e.key === 'Enter')) {
        e.preventDefault();
        setIsFullscreen(prev => !prev);
      }
      // Show/hide shortcuts with ?
      if (e.key === '?') {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }
      // Category navigation with number keys
      if (e.key >= '1' && e.key <= '3' && !e.metaKey && !e.ctrlKey) {
        const categories = ['general', 'bioinformatics', 'machine-learning'];
        const index = parseInt(e.key) - 1;
        if (index < categories.length) {
          setSelectedCategory(categories[index]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const exampleNotebooks: ExampleNotebook[] = [
    {
      title: "Blank Notebook",
      description: "Start with a clean notebook",
      url: "https://marimo.app/l/aojjhb?embed=true",
      icon: <BookOpenIcon className="h-5 w-5" />,
      category: 'general'
    },
    {
      title: "DNA Sequence Analysis",
      description: "Analyze DNA sequences with Biopython",
      url: "https://marimo.app/l/83qamt?embed=true",
      icon: <BeakerIcon className="h-5 w-5" />,
      category: 'bioinformatics'
    },
    {
      title: "Protein Structure",
      description: "Protein structure visualization",
      url: "https://marimo.app/l/aojjhb?embed=true",
      icon: <DocumentDuplicateIcon className="h-5 w-5" />,
      category: 'bioinformatics'
    },
    {
      title: "Phylogenetic Tree",
      description: "Build and visualize phylogenetic trees",
      url: "https://marimo.app/l/aojjhb?embed=true",
      icon: <ChartPieIcon className="h-5 w-5" />,
      category: 'bioinformatics'
    },
    {
      title: "ML Pipeline",
      description: "Machine learning with scikit-learn",
      url: "https://marimo.app/l/83qamt?embed=true",
      icon: <ChartBarIcon className="h-5 w-5" />,
      category: 'machine-learning'
    },
  ];

  const handleNotebookChange = (url: string) => {
    setIsLoading(true);
    setCurrentNotebook(url);
    // Reset loading state after iframe loads
    setTimeout(() => setIsLoading(false), 1000);
  };

  const filteredNotebooks = selectedCategory === 'all' 
    ? exampleNotebooks
    : exampleNotebooks.filter(n => n.category === selectedCategory);

  const ShortcutsModal = () => (
    <div className={`
      fixed inset-0 bg-black/50 z-50 flex items-center justify-center
      ${showShortcuts ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      transition-opacity duration-200
    `}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 max-w-md">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
          Keyboard Shortcuts
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">F11</kbd>
            <span className="text-slate-600 dark:text-slate-300">Toggle fullscreen</span>
          </div>
          <div className="flex justify-between text-sm">
            <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">?</kbd>
            <span className="text-slate-600 dark:text-slate-300">Show/hide shortcuts</span>
          </div>
          <div className="flex justify-between text-sm">
            <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">1-3</kbd>
            <span className="text-slate-600 dark:text-slate-300">Switch categories</span>
          </div>
          <div className="flex justify-between text-sm">
            <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">Esc</kbd>
            <span className="text-slate-600 dark:text-slate-300">Exit fullscreen/close modal</span>
          </div>
        </div>
        <button
          onClick={() => setShowShortcuts(false)}
          className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg
            hover:bg-indigo-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className={`
      flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm
      ${isFullscreen ? 'fixed inset-0 z-40' : 'h-full'}
    `}>
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <CommandLineIcon className="h-5 w-5" />
            Marimo Notebook
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Interactive Python notebook with pre-installed scientific packages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowShortcuts(true)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700
              text-slate-500 dark:text-slate-400"
            title="Keyboard shortcuts (?)"
          >
            <span className="text-sm">?</span>
          </button>
          <button
            onClick={() => setIsFullscreen(prev => !prev)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700
              text-slate-500 dark:text-slate-400"
            title="Toggle fullscreen (F11)"
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="h-5 w-5" />
            ) : (
              <ArrowsPointingOutIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar with examples */}
        <div className="w-64 border-r border-slate-200 dark:border-slate-700 p-4">
          {/* Category Filter */}
          <div className="mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border-slate-200 dark:border-slate-600 
                bg-white dark:bg-slate-700 text-sm
                text-slate-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="bioinformatics">Bioinformatics</option>
              <option value="machine-learning">Machine Learning</option>
            </select>
          </div>

          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
            Example Notebooks
          </h3>
          <div className="space-y-2">
            {filteredNotebooks.map((notebook) => (
              <button
                key={notebook.url}
                onClick={() => handleNotebookChange(notebook.url)}
                className={`
                  w-full text-left p-2 rounded-lg text-sm
                  ${currentNotebook === notebook.url
                    ? 'bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300'
                  }
                  transition-colors duration-200
                `}
              >
                <div className="flex items-center gap-2">
                  {notebook.icon}
                  <div>
                    <div className="font-medium">{notebook.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {notebook.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
              Quick Start
            </h3>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <p>To install packages:</p>
              <pre className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg overflow-x-auto">
                {`import micropip\nawait micropip.install("package_name")`}
              </pre>
              <p>Pre-installed packages:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>NumPy</li>
                <li>SciPy</li>
                <li>scikit-learn</li>
                <li>pandas</li>
                <li>matplotlib</li>
                <li>Biopython</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Notebook container */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-slate-800/50 z-10">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-700 shadow-lg">
                  <ArrowPathIcon className="h-5 w-5 animate-spin text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">Loading notebook...</span>
                </div>
              </div>
            )}
            <iframe
              src={currentNotebook}
              className="w-full h-full rounded-lg shadow-lg"
              title="Marimo Notebook"
            />
          </div>
        </div>
      </div>
      <ShortcutsModal />
    </div>
  );
};

export default MarimoPad;
