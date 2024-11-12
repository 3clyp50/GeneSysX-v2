import React from 'react';
import UsageMetrics from './dashboard/UsageMetrics';
import PublicationCard from './dashboard/PublicationCard';

const recentPublications = [
  {
    title: 'Deep learning approaches for protein structure prediction',
    authors: ['Sarah Chen', 'Michael Rodriguez'],
    journal: 'Nature Biotechnology',
    date: new Date('2024-02-15'),
    doi: '10.1038/s41587-024-0001-2'
  },
  {
    title: 'Novel gene expression patterns in cancer progression',
    authors: ['Emma Watson', 'James Smith'],
    journal: 'Cell',
    date: new Date('2024-02-10'),
    doi: '10.1016/j.cell.2024.02.010'
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Main content area */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Publications
            </h2>
            <div className="space-y-6">
              {recentPublications.map((publication) => (
                <PublicationCard
                  key={publication.doi}
                  publication={publication}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              System Performance
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">CPU Usage</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">42%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Memory Usage</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">68%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Storage</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">85%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar content */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Usage Metrics
            </h2>
            <UsageMetrics />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <button className="w-full btn-primary">New Analysis</button>
              <button className="w-full btn-secondary">View Reports</button>
              <button className="w-full btn-secondary">Manage Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;