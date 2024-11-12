export function analyzeSequence(sequence: string): string {
  if (!sequence) return '';

  const gc = sequence.toUpperCase().split('').reduce((count, base) => {
    return count + (base === 'G' || base === 'C' ? 1 : 0);
  }, 0);

  const length = sequence.length;
  const gcContent = ((gc / length) * 100).toFixed(2);

  return `
Sequence Length: ${length.toLocaleString()} bp
GC Content: ${gcContent}%
Base Composition:
A: ${((sequence.toUpperCase().match(/A/g) || []).length / length * 100).toFixed(2)}%
T: ${((sequence.toUpperCase().match(/T/g) || []).length / length * 100).toFixed(2)}%
G: ${((sequence.toUpperCase().match(/G/g) || []).length / length * 100).toFixed(2)}%
C: ${((sequence.toUpperCase().match(/C/g) || []).length / length * 100).toFixed(2)}%
  `;
}