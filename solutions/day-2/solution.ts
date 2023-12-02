export default {
  // Tries: 1
  // Time: 20 min
  // Result: 2101
  part1: (_input: string): number => {
    let input = _input.split('\n');
    let sum = 0;
    let maxRed = 12;
    let maxGreen = 13;
    let maxBlue = 14;
    main: for (let id = 1; id <= input.length; id++) {
      let line = input[id - 1].split(/Game \d+: /)[1];
      let games = line.split('; ');
      for (let game of games) {
        let red = /(\d+) red/.exec(game);
        let green = /(\d+) green/.exec(game);
        let blue = /(\d+) blue/.exec(game);
        if (red && +red[1] > maxRed) {
          console.log(`Invalid game by red: ${game}`);
          continue main;
        }
        if (green && +green[1] > maxGreen) {
          console.log(`Invalid game by green: ${game}`);
          continue main;
        }
        if (blue && +blue[1] > maxBlue) {
          console.log(`Invalid game by blue: ${game}`);
          continue main;
        }
      }
      sum += id;
    }
    return sum;
  },
  // Tries: 2
  // Time: 12
  // Try: 2012 close (was using min instead of max lol)
  // Result: 58269
  part2: (_input: string): number => {
    let input = _input.split('\n');
    let sum = 0;
    for (let line of input) {
      let games = line.split('; ');
      let minRed = 0,
        minGreen = 0,
        minBlue = 0;
      for (let game of games) {
        let red = /(\d+) red/.exec(game);
        let green = /(\d+) green/.exec(game);
        let blue = /(\d+) blue/.exec(game);
        if (red) minRed = Math.max(+red[1], minRed);
        if (green) minGreen = Math.max(+green[1], minGreen);
        if (blue) minBlue = Math.max(+blue[1], minBlue);
      }
      console.log(minRed, minGreen, minBlue, line);
      sum += minRed * minGreen * minBlue;
    }
    return sum;
  },
};
