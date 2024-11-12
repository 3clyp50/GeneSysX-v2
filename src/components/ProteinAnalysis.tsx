import React, { useState } from 'react';
import { Search, BarChart2, Box, Dna, Microscope } from 'lucide-react';

export default function ProteinAnalysis() {
  const [sequence, setSequence] = useState('');
  const [analysisType, setAnalysisType] = useState('structure');

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Protein Analysis</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Protein Sequence
            </label>
            <textarea
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              className="w-full h-48 rounded-lg border border-gray-300 dark:border-gray-600 p-3 font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter protein sequence in FASTA format..."
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Analysis Type
              </label>
              <select
                value={analysisType}
                onChange={(e) => setAnalysisType(e.target.value)}
                className="form-select"
              >
                <option value="structure">Structure Prediction</option>
                <option value="domains">Domain Analysis</option>
                <option value="motifs">Motif Search</option>
                <option value="properties">Physicochemical Properties</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="btn-primary">
                <Search className="h-4 w-4 mr-2" />
                Analyze
              </button>
              <button className="btn-secondary">
                <Box className="h-4 w-4 mr-2" />
                Examples
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Structure Visualization</h3>
          <div className="h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
            <Dna className="h-12 w-12 text-gray-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Analysis Results</h3>
          <div className="h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
            <Microscope className="h-12 w-12 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}