import chalk from 'chalk';
import { inspect } from 'util';

export default {
  // Result: 486613012
  part1: (input: string): number => {
    let [_seeds, ..._maps] = input.split('\n\n');
    let seeds = _seeds.slice('seeds: '.length).split(' ').map(Number);
    let maps = _maps.map((m) =>
      m
        .split('\n')
        .toSpliced(0, 1)
        .map((v) => v.split(' ').map(Number))
    );

    for (let i in seeds) {
      let seed = seeds[i];
      for (let map of maps) {
        for (let rule of map) {
          let [dest, source, len] = rule;
          if (seed >= source && seed <= source + len) {
            seed += dest - source;
            break;
          }
        }
      }
      seeds[i] = seed;
    }
    return seeds.reduce((a, b) => Math.min(a, b));
  },
  // Try: 56931770
  part2: (input: string): number => {
    let [_seeds, ..._maps] = input.split('\n\n');
    let seeds = _seeds.slice('seeds: '.length).split(' ').map(Number);
    let maps = _maps.map((m) =>
      m
        .split('\n')
        .toSpliced(0, 1)
        .map((v) => v.split(' ').map(Number))
    );

    let min = Infinity;
    for (let i = 0; i < seeds.length; i += 2) {
      console.log(`${chalk.blue(`[${i / 2 + 1}/${seeds.length / 2}]`)} ${seeds[i + 1]} seeds`);

      for (let seed = seeds[i]; seed < seeds[i] + seeds[i + 1]; seed++) {
        // console.log(seed);
        let seed2 = seed;
        for (let j in maps) {
          let map = maps[j];
          for (let rule of map) {
            let [dest, source, len] = rule;
            if (seed2 >= source && seed2 <= source + len) {
              seed2 += dest - source;
              break;
            }
          }
          if (j == '6') min = Math.min(min, seed2);
          // console.log(`  ${+j+1} ${seed2}`);
        }
      }
    }

    // console.log(seeds.reduce((a, b) => Math.min(a, b)));

    return min;
  },
};

declare global {
  interface Array<T> {
    group(parity: number): T[][];
  }
}

if (!Array.prototype.group) {
  Object.defineProperty(Array.prototype, 'group', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function <T>(this: T[], parity: number) {
      let arr = [];
      for (let i = 0; i < this.length; i += parity) {
        arr.push(this.toSpliced(i, parity));
      }
      return arr.reverse();
    },
  });
  // Array.prototype.group = function <T>(this: T[], parity: number) {
  //   let arr = [];
  //   for (let i = 0; i < this.length; i += parity) {
  //     arr.push(this.toSpliced(i, parity));
  //   }
  //   return arr.reverse();
  // };
}
