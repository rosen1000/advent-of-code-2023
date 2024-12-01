export default {
	part1: (input: string): number => {
		let map = input.split('\n').map((v) => v.trim().split('')) as Tile[][];

		let start: Vec = [0, 0];
		start[0] = map.findIndex((v) => v.includes('S'));
		start[1] = map[start[0]].indexOf('S');
		console.log(start);

		let tile: Tile = 'S';
		let pos = start;
		let dir = Dir.up;
		map[pos[0]][pos[1]];

		console.log(canEnter('7', Dir.right), canEnter('7', Dir.up));
		console.log(canEnter('7', Dir.left), canEnter('7', Dir.down));
		
		

		return 0;
	},
	part2: (input: string): number => {
		return 0;
	},
};

function canEnter(tile: Tile, dir: Vec): boolean {
	if (tile == 'S') return true;
	let def = Path[tile];
	return (def[0][0] != dir[0] && def[0][1] != dir[1]) || (def[0][0] != dir[0] && def[0][1] != dir[1]);
}

type Vec = [number, number];
type Tile = '|' | '-' | 'L' | 'F' | 'J' | '7' | 'S';
const Dir = {
	down: [1, 0] as Vec,
	up: [-1, 0] as Vec,
	right: [0, 1] as Vec,
	left: [0, -1] as Vec,
} as const;
const Path = {
	'|': [Dir.up, Dir.down],
	'-': [Dir.left, Dir.right],
	L: [Dir.up, Dir.right],
	F: [Dir.down, Dir.right],
	J: [Dir.up, Dir.left],
	'7': [Dir.down, Dir.left],
	S: [Dir.up, Dir.right, Dir.down, Dir.left],
} as const;
