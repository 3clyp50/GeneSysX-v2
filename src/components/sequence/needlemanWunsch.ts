import { AlignmentResult } from './types';

export function needlemanWunsch(seq1: string, seq2: string): AlignmentResult {
  const match = 1;
  const mismatch = -1;
  const gap = -2;

  const m = seq1.length;
  const n = seq2.length;
  const matrix: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  const traceback: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  // Initialization
  for (let i = 0; i <= m; i++) {
    matrix[i][0] = gap * i;
    traceback[i][0] = 2; // Upward move
  }
  for (let j = 0; j <= n; j++) {
    matrix[0][j] = gap * j;
    traceback[0][j] = 3; // Leftward move
  }
  traceback[0][0] = 0; // Start position

  // Matrix Filling
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const match_score = matrix[i - 1][j - 1] + (seq1[i - 1] === seq2[j - 1] ? match : mismatch);
      const delete_score = matrix[i - 1][j] + gap;
      const insert_score = matrix[i][j - 1] + gap;

      matrix[i][j] = Math.max(match_score, delete_score, insert_score);

      if (matrix[i][j] === match_score) traceback[i][j] = 1;
      else if (matrix[i][j] === delete_score) traceback[i][j] = 2;
      else traceback[i][j] = 3;
    }
  }

  // Traceback
  let align1 = '';
  let align2 = '';
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (traceback[i][j] === 1) {
      align1 = seq1[i - 1] + align1;
      align2 = seq2[j - 1] + align2;
      i--;
      j--;
    } else if (traceback[i][j] === 2) {
      align1 = seq1[i - 1] + align1;
      align2 = '-' + align2;
      i--;
    } else {
      align1 = '-' + align1;
      align2 = seq2[j - 1] + align2;
      j--;
    }
  }

  const score = matrix[m][n];
  return { score: score, alignment1: align1, alignment2: align2 };
}