export default {
  // Result: 608902
  part1: (input: string): number => {
    let [times, records] = input
      .split('\n')
      .map(parse)
      .map((v) => v.map(Number));
    let product = 1;
    for (let i = 0; i < times.length; i++) {
      let time = times[i];
      let record = records[i];
      let ways = 0;
      for (let j = 1; j < time; j++) {
        let traveled = j * (time - j);
        if (traveled > record) ways++;
      }
      product *= ways;
    }
    return product;
  },
  part2: (input: string): number => {
    let [time, record] = input
      .split('\n')
      .map(parse)
      .map((v) => +v.join(''));
    let ways = 0;
    for (let i = 1; i < time; i++) {
      let traveled = i * (time - i);
      if (traveled > record) ways++;
    }
    return ways;
  },
};

function parse(input: string) {
  let nums: string[] = [];
  let regex = /\d+/g;
  let found: ReturnType<typeof regex.exec>;
  while ((found = regex.exec(input))) {
    nums.push(found[0]);
  }
  return nums;
}
