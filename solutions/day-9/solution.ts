export default {
	// Tries: 1
	// Result: 1647269739
	part1: (input: string): number => {
		console.time('parseHistory');
		let lines = input.split('\n').map((v) => v.split(' ').map((v) => +v));
		let history: number[][] = [];
		for (let line of lines) {
			history.push(line);
			let last = history.last();
			while (!last.every((v) => v == 0)) {
				let arr = [];
				for (let i = 0; i < last.length - 1; i++) {
					arr.push(last[i + 1] - last[i]);
				}
				history.push(arr);
				last = arr;
			}
		}
		console.timeEnd('parseHistory');

		console.time('calculateHistory');
		history.reverse();
		let sums = 0;
		for (let hist of history) {
			let curr = 0;
			if (hist.last() == 0) curr = 0;
			else curr += hist.last();
			sums += curr;
		}
		console.timeEnd('calculateHistory');

		return sums;
	},
	part2: (input: string): number => {
		console.time('parseHistory');
		let lines = input.split('\n').map((v) => v.split(' ').map((v) => +v));
		let history: number[][] = [];
		for (let line of lines) {
			history.push(line);
			let last = history.last();
			while (!last.every((v) => v == 0)) {
				let arr = [];
				for (let i = 0; i < last.length - 1; i++) {
					arr.push(last[i + 1] - last[i]);
				}
				history.push(arr);
				last = arr;
			}
		}
		console.timeEnd('parseHistory');

		console.time('calculateHistory');
		// history.reverse();
		let sums = 0;
		let curr = 0;
		for (let hist of history) {
			
			if (hist[0] == 0 && hist[1] == 0) curr = 0;
			else curr = hist[0] - curr;
			console.log(curr,hist);
		}
		sums += curr;
		console.timeEnd('calculateHistory');

		return sums;
	},
};

declare global {
	interface Array<T> {
		last(): T;
	}
}

if (!Array.prototype.last) {
	Object.defineProperty(Array.prototype, 'last', {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function <T>(this: T[]) {
			return this[this.length - 1];
		},
	});
}
