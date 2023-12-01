export default {
  // Tries: 1
  // Time: 5 min
  // Result: 54159
  part1: (_input: string): number => {
    let input = _input.split('\n');
    let sum = 0;
    for (let line of input) {
      let first: string = '';
      let last: string = '';
      for (let char of line) {
        if (isNaN(+char)) continue;
        if (!first) first = char;
        last = char;
      }
      sum += +(first + last);
    }
    return sum;
  },
  // Tries: 4
  // Time: 30 min
  // Try: 53201 too low
  // Try: 52517 too low
  // Try: 53831 too low
  // Result: 53866
  part2: (_input: string): number => {
    let input = _input.split('\n');
    let sum = 0;

    for (let line of input) {
      line = line
        .replaceAll('one', 'one1one')
        .replaceAll('two', 'two2two')
        .replaceAll('three', 'three3three')
        .replaceAll('four', 'four4four')
        .replaceAll('five', 'five5five')
        .replaceAll('six', 'six6six')
        .replaceAll('seven', 'seven7seven')
        .replaceAll('eight', 'eight8eight')
        .replaceAll('nine', 'nine9nine');
      let first: string = '';
      let last: string = '';
      for (let char of line) {
        if (isNaN(+char)) continue;
        if (!first) first = char;
        last = char;
      }
      console.log(first, last, line);
      sum += +(first + last);
    }
    return sum;
  },
};
