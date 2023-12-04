const regex = /\d+/g;

export default {
  // Try: 519861 wrong
  // Try: 581251 wrong
  // Result: 520019
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
          if (scanAround(input, start, j - 1, i)) {
            sum += +number;
          }
          number = '';
          start = -1;
        }
      }
      if (number != '') {
        if (scanAround(input, start, line.length - 1, i)) {
          sum += +number;
        }
      }
    }
    return sum;
  },
  // Result: 75519888
  part2: (_input: string): number => {
    let lines = _input.split('\n');
    let gears = new Map<string, number[]>();
    for (let i in lines) {
      let line = lines[i];
      let found: ReturnType<typeof regex.exec>;
      while ((found = regex.exec(line))) {
        let { index, '0': num } = found;
        let gear: ReturnType<typeof scanAroundGear>;
        if ((gear = scanAroundGear(lines, index, index + num.length - 1, +i))) {
          let f = gears.get(gear.toString());
          if (f) gears.set(gear.toString(), [...f, +num]);
          else gears.set(gear.toString(), [+num]);
        }
      }
    }

    let rations = 0;
    for (let gear of gears) {
      if (gear[1].length == 2) rations += gear[1][0] * gear[1][1];
    }

    return rations;
  },
};

function scanAround(input: string[], start: number, end: number, row: number) {
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

function scanAroundGear(input: string[], start: number, end: number, row: number) {
  for (let i = row - 1; i <= row + 1; i++) {
    // Anti out-of-bounds
    if (i == -1 || i >= input.length) continue;
    for (let j = start - 1; j <= end + 1; j++) {
      // Anti out-of-bounds
      if (j == -1 || j >= input[i].length) continue;
      // Skip number itself
      if (i == row && j >= start && j <= end) continue;
      if (!isNaN(+input[i][j])) throw new Error(input[i][j]);
      if (input[i][j] == '*') return [i, j];
    }
  }
  return false;
}
