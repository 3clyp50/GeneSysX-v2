import React, { useState } from 'react';
import { Upload, Download, Play, AlignLeft, Settings } from 'lucide-react';

export default function MultipleSequenceAlignment() {
  const [sequences, setSequences] = useState('');
  const [algorithm, setAlgorithm] = useState('clustalw');
  const [gapOpenPenalty, setGapOpenPenalty] = useState(-10);
  const [gapExtendPenalty, setGapExtendPenalty] = useState(-0.5);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Multiple Sequence Alignment</h2>
          <div className="flex space-x-2">
            <button className="btn-secondary">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </button>
            <button className="btn-secondary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="btn-primary">
              <Play className="h-4 w-4 mr-2" />
              Align
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input Sequences (FASTA format)
            </label>
            <textarea
              value={sequences}
              onChange={(e) => setSequences(e.target.value)}
              className="w-full h-64 rounded-lg border border-gray-300 dark:border-gray-600 p-3 font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder=">Sequence1&#10;ATGCTAGCTAGCT&#10;>Sequence2&#10;ATGCTAGCTAGCT"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Algorithm
              </label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="form-select"
              >
                <option value="clustalw">ClustalW</option>
                <option value="muscle">MUSCLE</option>
                <option value="mafft">MAFFT</option>
                <option value="kalign">Kalign</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gap Open Penalty
              </label>
              <input
                type="number"
                value={gapOpenPenalty}
                onChange={(e) => setGapOpenPenalty(Number(e.target.value))}
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gap Extension Penalty
              </label>
              <input
                type="number"
                value={gapExtendPenalty}
                onChange={(e) => setGapExtendPenalty(Number(e.target.value))}
                step="0.1"
                className="form-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <AlignLeft className="h-5 w-5 mr-2" />
          Alignment Viewer
        </h3>
        <div className="h-96 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-auto font-mono">
          <div className="p-4">
            <p className="text-gray-500 dark:text-gray-400">Alignment results will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}