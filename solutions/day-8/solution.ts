export default {
	// Tries: 1
	// Result: 12737
	part1: (input: string): number => {
		let [ops, nodes] = parseInput(input);
		let count = 0;
		let node = nodes.find((n) => n.name == 'AAA');

		console.time('searchNodes');
		while (node?.name != 'ZZZ') {
			if (ops[count % ops.length] == 'L') node = node?.left!;
			else if (ops[count % ops.length] == 'R') node = node?.right!;
			count++;
		}
		console.timeEnd('searchNodes');

		return count;
	},
	// Tries: 1
	// Result: 9064949303801
	part2: (input: string): number => {
		let [ops, nodes] = parseInput(input);
		let paths = nodes.filter((n) => n.name.endsWith('A'));
		let pathSteps: number[] = [];

		console.time('searchNodes');
		paths.forEach((node) => {
			let count = 0;
			while (!node?.name.endsWith('Z')) {
				if (ops[count % ops.length] == 'L') node = node?.left!;
				else if (ops[count % ops.length] == 'R') node = node?.right!;
				count++;
			}
			console.log('Completed', pathSteps.length + 1);
			pathSteps.push(count);
		});
		console.timeEnd('searchNodes');

		let totalCount = pathSteps.reduce((max, v) => (max > v ? max : v));
		console.log(pathSteps, totalCount);
		while (!pathSteps.map((v) => v % totalCount == 0).reduce((a, b) => a && b)) totalCount++;
		// Number was too big to comprehend .-.
		// TODO: Fix LCM algo to be in int range :)

		return totalCount;
	},
};

function parseInput(input: string): [string, Node[]] {
	let lines = input.split('\n');
	let ops = lines[0];
	let nodes = parseNodes(lines.toSpliced(0, 2));
	linkNodes(nodes);
	return [ops, nodes];
}

function parseNodes(lines: string[]): Node[] {
	console.time('parseNodes');
	let rawNodes: Node[] = [];
	for (let line of lines) {
		rawNodes.push(new Node(...[line.slice(0, 3), line.slice(7, 10), line.slice(12, 15)]));
	}
	console.timeEnd('parseNodes');
	return rawNodes;
}

function linkNodes(nodes: Node[]) {
	console.time('linkNodes');
	for (let node of nodes) {
		// @ts-ignore
		node.left = nodes.find((v) => v.name == node.left) ?? null;
		// @ts-ignore
		node.right = nodes.find((v) => v.name == node.right) ?? null;
	}
	console.timeEnd('linkNodes');
}

class Node {
	name: string;
	left: Node | null = null;
	right: Node | null = null;
	constructor(name: string, left?: string, right?: string) {
		this.name = name;
		// @ts-ignore
		if (left) this.left = left;
		// @ts-ignore
		if (right) this.right = right;
	}
}
