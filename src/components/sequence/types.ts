export interface AlignmentResult {
  score: number;
  alignment1: string;
  alignment2: string;
}

export type AlignmentAlgorithm = 'smith-waterman' | 'needleman-wunsch';

export const colorMap: { [key: string]: { light: string; dark: string } } = {
  A: { light: 'bg-red-200', dark: 'bg-red-800' },
  C: { light: 'bg-blue-200', dark: 'bg-blue-800' },
  G: { light: 'bg-green-200', dark: 'bg-green-800' },
  T: { light: 'bg-yellow-200', dark: 'bg-yellow-800' },
  '-': { light: 'bg-gray-200', dark: 'bg-gray-700' },
};