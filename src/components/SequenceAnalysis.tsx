import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import SequenceInput from './sequence/SequenceInput';
import AnalysisResult from './sequence/AnalysisResult';
import AlignmentResultView from './sequence/AlignmentResult';
import { analyzeSequence } from './sequence/analyzeSequence';
import { smithWaterman } from './sequence/smithWaterman';
import { needlemanWunsch } from './sequence/needlemanWunsch';
import type { AlignmentResult, AlignmentAlgorithm } from './sequence/types';

export default function SequenceAnalysis() {
  const [sequence1, setSequence1] = useState('');
  const [sequence2, setSequence2] = useState('');
  const [algorithm, setAlgorithm] = useState<AlignmentAlgorithm>('smith-waterman');
  const [basicResult, setBasicResult] = useState<string | null>(null);
  const [alignmentResult, setAlignmentResult] = useState<AlignmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isDarkMode = document.documentElement.classList.contains('dark');

  const handleBasicAnalysis = () => {
    if (!sequence1) return;
    const analysis = analyzeSequence(sequence1);
    setBasicResult(analysis);
  };

  const handleAlignment = async () => {
    setLoading(true);
    setError(null);
    setAlignmentResult(null);

    if (!sequence1 || !sequence2) {
      setError("Please enter both sequences");
      setLoading(false);
      return;
    }

    try {
      const alignmentFunction = algorithm === 'smith-waterman' ? smithWaterman : needlemanWunsch;
      const result = alignmentFunction(sequence1.toUpperCase(), sequence2.toUpperCase());
      setAlignmentResult(result);
    } catch (error) {
      console.error("Alignment error:", error);
      setError("An error occurred during sequence alignment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Sequence Analysis</h2>
        
        <div className="space-y-6">
          <div>
            <SequenceInput 
              sequence={sequence1}
              onChange={setSequence1}
              label="First Sequence"
            />
          </div>
          
          <div>
            <SequenceInput 
              sequence={sequence2}
              onChange={setSequence2}
              label="Second Sequence (for alignment)"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alignment Algorithm
              </label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value as AlignmentAlgorithm)}
                className="form-select w-full"
              >
                <option value="smith-waterman">Smith-Waterman (Local Alignment)</option>
                <option value="needleman-wunsch">Needleman-Wunsch (Global Alignment)</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleBasicAnalysis}
                className="flex-1 sm:flex-none inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-gray-900"
              >
                Basic Analysis
              </button>
              
              <button
                onClick={handleAlignment}
                disabled={loading}
                className="flex-1 sm:flex-none inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:ring-offset-gray-900 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Aligning...
                  </>
                ) : (
                  "Align Sequences"
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {basicResult && <AnalysisResult result={basicResult} />}
          
          {alignmentResult && (
            <AlignmentResultView 
              result={alignmentResult}
              isDarkMode={isDarkMode}
              algorithm={algorithm}
            />
          )}
        </div>
      </div>
    </div>
  );
}