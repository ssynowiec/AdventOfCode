import { asyncReadFile } from '../helpers/readFile';

const findStartPosition = (data: string[]) => {
	let x = 0;
	let y = 0;

	for (let i = 0; i < data.length; i++) {
		const line = data[i];
		for (let j = 0; j < line.length; j++) {
			const element = line[j];
			if (element === 'S') {
				y = i;
				x = j;
			}
		}
	}

	return { x, y };
};

// | is a vertical pipe connecting north and south.
// | pionowa rura łącząca północ i południe
// | góra dół

// - is a horizontal pipe connecting east and west.
// - pozioma rura łącząca wschód i zachód
// - lewo prawo

// L is a 90-degree bend connecting north and east.
// L 90 stopni północ wschód
// L góra prawo

// J is a 90-degree bend connecting north and west.
// J 90 stopni północ zachód
// J góra lewo

// 7 is a 90-degree bend connecting south and west.
// 7 90 stopni południe zachód
// 7 dół lewo

// F is a 90-degree bend connecting south and east.
// F 90 stopni południe wschód
// F dół prawo

// . is ground; there is no pipe in this tile.
// . nie ma rury w tym miejscu

// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

// export const partOne = async (input: string) => {
// 	const data = await asyncReadFile(input);

// 	if (!data) {
// 		return 0;
// 	}

// 	let result = 0;

// 	// data.forEach(line => {});

// 	const startPosition = findStartPosition(data);
// 	console.log(startPosition);

// 	return result;
// };

type Point = { x: number; y: number };

const findNeighbors = (point: Point, data: string[]): Point[] => {
	const { x, y } = point;
	const neighbors: Point[] = [];
	const currentPipe = data[y][x];

	// Check north
	if (
		y > 0 &&
		(currentPipe === '|' ||
			currentPipe === 'L' ||
			currentPipe === 'J' ||
			currentPipe === 'S')
	) {
		const northPipe = data[y - 1][x];
		if (
			northPipe === '|' ||
			northPipe === '7' ||
			northPipe === 'F' ||
			northPipe === 'S'
		) {
			neighbors.push({ x, y: y - 1 });
		}
	}

	// Check south
	if (
		y < data.length - 1 &&
		(currentPipe === '|' ||
			currentPipe === '7' ||
			currentPipe === 'F' ||
			currentPipe === 'S')
	) {
		const southPipe = data[y + 1][x];
		if (
			southPipe === '|' ||
			southPipe === 'L' ||
			southPipe === 'J' ||
			southPipe === 'S'
		) {
			neighbors.push({ x, y: y + 1 });
		}
	}

	// Check west
	if (
		x > 0 &&
		(currentPipe === '-' ||
			currentPipe === 'J' ||
			currentPipe === '7' ||
			currentPipe === 'S')
	) {
		const westPipe = data[y][x - 1];
		if (
			westPipe === '-' ||
			westPipe === 'L' ||
			westPipe === 'F' ||
			westPipe === 'S'
		) {
			neighbors.push({ x: x - 1, y });
		}
	}

	// Check east
	if (
		x < data[0].length - 1 &&
		(currentPipe === '-' ||
			currentPipe === 'L' ||
			currentPipe === 'F' ||
			currentPipe === 'S')
	) {
		const eastPipe = data[y][x + 1];
		if (
			eastPipe === '-' ||
			eastPipe === 'J' ||
			eastPipe === '7' ||
			eastPipe === 'S'
		) {
			neighbors.push({ x: x + 1, y });
		}
	}

	return neighbors;
};

const bfs = (start: Point, data: string[]): number => {
	const queue: Point[] = [start];
	const visited: boolean[][] = Array(data.length)
		.fill(false)
		.map(() => Array(data[0].length).fill(false));
	const distance: number[][] = Array(data.length)
		.fill(0)
		.map(() => Array(data[0].length).fill(0));
	let maxDistance = 0;

	while (queue.length > 0) {
		const current = queue.shift()!;
		const { x, y } = current;

		if (visited[y][x]) {
			continue;
		}

		visited[y][x] = true;

		const neighbors = findNeighbors(current, data);
		for (const neighbor of neighbors) {
			if (!visited[neighbor.y][neighbor.x]) {
				distance[neighbor.y][neighbor.x] = distance[y][x] + 1;
				maxDistance = Math.max(
					maxDistance,
					distance[neighbor.y][neighbor.x],
				);
				queue.push(neighbor);
			}
		}
	}

	return maxDistance;
};

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	const startPosition = findStartPosition(data);
	const maxDistance = bfs(startPosition, data);

	return maxDistance;
};
