const regex = /\d+/g;

export default {
  // Try: 34 wrong
  // Try: 805 wrong
  // Result: 21821
  part1: (_input: string): number => {
    let lines = _input.split('\n');
    let points = 0;
    for (let line of lines) {
      let [winning, cards] = parse(line);
      let matches = 0;
      for (let a of winning) {
        for (let b of cards) {
          if (a == b) {
            matches++;
          }
        }
      }
      if (matches > 0) points += 1 << (matches - 1);
    }
    return points;
  },
  // Result: 5539496
  part2: (_input: string): number => {
    let lines = _input.split('\n');
    let copies: number[] = new Array(lines.length);
    copies = copies.fill(1, 0, lines.length);
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      let [winning, cards] = parse(line);
      let matches = 0;
      for (let a of winning) {
        for (let b of cards) {
          if (a == b) {
            matches++;
          }
        }
      }
      for (let j = i + 1; j <= i + matches; j++) {
        copies[j] += copies[i]
      }
    }
    console.log(copies);

    return copies.reduce((sum, v) => (sum += v));
  },
};

function parse(line: string): [number[], number[]] {
  line = line.split(': ')[1];
  let [winningText, cardsText] = line.split(' | ');
  let winning: number[] = [];
  let cards: number[] = [];
  let found: RegExpExecArray | null;
  while ((found = regex.exec(winningText))) {
    winning.push(+found[0]);
  }
  // regex = /\d+/g;
  while ((found = regex.exec(cardsText))) {
    cards.push(+found[0]);
  }
  return [[...new Set(winning)], [...new Set(cards)]];
}
