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
      for (let seed = seeds[i]; seed < seeds[i] + seeds[i + 1]; seed++) {
        let seed2 = seed;
        for (let map of maps) {
          for (let rule of map) {
            let [dest, source, len] = rule;
            if (seed >= source && seed <= source + len) {
              seed2 = seed + dest - source
              min = Math.min(min, seed2);
              break;
            }
          }
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
