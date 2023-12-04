export default {
  // Try: 519861 wrong
  // Try: 581251 wrong
  part1: (_input: string): number => {
    let input = _input.split('\n');
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
      let line = input[i];
      let start = -1;
      let number = '';
      for (let j = 0; j < line.length; j++) {
        let char = line[j];
        if (!isNaN(+char)) {
          // char is number
          number += char;
          if (start == -1) start = j;
        } else if (number != '') {
          if (scanAround(input, start, j - 1, i, number)) {
            sum += +number;
          }
          number = '';
          start = -1;
        }
      }
    }
    return sum;
  },
  part2: (_input: string): number => {
    return 0;
  },
};

function scanAround(input: string[], start: number, end: number, row: number, num: string) {
  for (let i = row - 1; i <= row + 1; i++) {
    // Anti out-of-bounds
    if (i == -1 || i >= input.length) continue;
    for (let j = start - 1; j <= end + 1; j++) {
      // Anti out-of-bounds
      if (j == -1 || j >= input[i].length) continue;
      // Skip number itself
      if (i == row && j >= start && j <= end) continue;
      if (!isNaN(+input[i][j])) throw new Error(input[i][j]);
      if (input[i][j] != '.') return true;
    }
  }
  return false;
}
