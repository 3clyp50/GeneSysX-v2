import { AlignmentResult } from './types';

export function smithWaterman(seq1: string, seq2: string): AlignmentResult {
  const match = 2;
  const mismatch = -1;
  const gap = -1;

  const m = seq1.length;
  const n = seq2.length;
  const matrix: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  const traceback: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  let maxScore = 0;
  let maxI = 0;
  let maxJ = 0;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const match_score = matrix[i-1][j-1] + (seq1[i-1] === seq2[j-1] ? match : mismatch);
      const delete_score = matrix[i-1][j] + gap;
      const insert_score = matrix[i][j-1] + gap;

      matrix[i][j] = Math.max(0, match_score, delete_score, insert_score);

      if (matrix[i][j] === match_score) traceback[i][j] = 1;
      else if (matrix[i][j] === delete_score) traceback[i][j] = 2;
      else if (matrix[i][j] === insert_score) traceback[i][j] = 3;

      if (matrix[i][j] > maxScore) {
        maxScore = matrix[i][j];
        maxI = i;
        maxJ = j;
      }
    }
  }

  let align1 = '';
  let align2 = '';
  let i = maxI;
  let j = maxJ;

  while (i > 0 && j > 0 && matrix[i][j] > 0) {
    if (traceback[i][j] === 1) {
      align1 = seq1[i-1] + align1;
      align2 = seq2[j-1] + align2;
      i--; j--;
    } else if (traceback[i][j] === 2) {
      align1 = seq1[i-1] + align1;
      align2 = '-' + align2;
      i--;
    } else {
      align1 = '-' + align1;
      align2 = seq2[j-1] + align2;
      j--;
    }
  }

  return { score: maxScore, alignment1: align1, alignment2: align2 };
}