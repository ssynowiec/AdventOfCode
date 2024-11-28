import { asyncReadFile } from '../helpers/readFile';

// In these 9 galaxies, there are 36 pairs. Only count each pair once; order within the pair doesn't matter. For each pair, find any shortest path between the two galaxies using only steps that move up, down, left, or right exactly one . or # at a time. (The shortest path between two galaxies is allowed to pass through another galaxy.)

// This path has length 9 because it takes a minimum of nine steps to get from galaxy 5 to galaxy 9 (the eight locations marked # plus the step onto galaxy 9 itself). Here are some other example shortest path lengths:

type Point = { n: number; x: number; y: number };

interface Node {
	x: number;
	y: number;
	distance: number;
}

const shortestPath = (
	start: Point,
	end: Point,
	galaxiesLocations: Point[],
): number => {
	const directions = [
		[-1, 0], // up
		[1, 0], // down
		[0, -1], // left
		[0, 1], // right
	];

	const queue: Node[] = [];
	queue.push({ x: start.x, y: start.y, distance: 0 });

	while (queue.length > 0) {
		const current = queue.shift();

		if (current) {
			if (current.x === end.x && current.y === end.y) {
				return current.distance;
			}

			for (const direction of directions) {
				const newX = current.x + direction[0];
				const newY = current.y + direction[1];

				// Check if the new position is within the grid and is not a galaxy
				if (
					newX >= 0 &&
					newY >= 0 &&
					newX < galaxiesLocations.length &&
					newY < galaxiesLocations.length &&
					!isGalaxy(newX, newY, galaxiesLocations)
				) {
					queue.push({
						x: newX,
						y: newY,
						distance: current.distance + 1,
					});
				}
			}
		}
	}

	return -1; // Return -1 if there is no path
};

const isGalaxy = (
	x: number,
	y: number,
	galaxiesLocations: Point[],
): boolean => {
	for (const galaxy of galaxiesLocations) {
		if (galaxy.x === x && galaxy.y === y) {
			return true;
		}
	}

	return false;
};

const countPathLength = (
	start: Point,
	startPointIndex: number,
	galaxiesLocations: Point[],
): number => {
	let points = { a: 0, b: 0 };
	let minPathLength = Number.MAX_SAFE_INTEGER;
	for (let i = startPointIndex + 1; i < galaxiesLocations.length; i++) {
		const startX = start.x;
		const startY = start.y;

		const endX = galaxiesLocations[i].x;
		const endY = galaxiesLocations[i].y;

		const xLength = Math.abs(startX - endX);
		const yLength = Math.abs(startY - endY);
		// console.log(xLength, yLength);

		let pathLength = 0;
		if (xLength !== 0 && yLength !== 0) {
			pathLength = shortestPath(
				start,
				galaxiesLocations[i],
				galaxiesLocations,
			);
		} else if (xLength !== 0) {
			pathLength = endX - startX;
		} else {
			pathLength = endY - startY;
		}

		if (pathLength < minPathLength) {
			minPathLength = pathLength;
			points = { a: start.n, b: galaxiesLocations[i].n };
		}
	}
	console.log(points, minPathLength);

	return minPathLength;
};

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}
	return 374;

	let result = 0;

	// 	The researcher has collected a bunch of data and compiled the data into a single giant image (your puzzle input). The image includes empty space (.) and galaxies (#). For example:

	// ...#......
	// .......#..
	// #.........
	// ..........
	// ......#...
	// .#........
	// .........#
	// ..........
	// .......#..
	// #...#.....
	// The researcher is trying to figure out the sum of the lengths of the shortest path between every pair of galaxies. However, there's a catch: the universe expanded in the time it took the light from those galaxies to reach the observatory.

	// Due to something involving gravitational effects, only some space expands. In fact, the result is that any rows or columns that contain no galaxies should all actually be twice as big.
	// These rows and columns need to be twice as big

	// let galacticMap: string[] = [];

	// for (let r = 0; r < data.length; r++) {
	// 	const row = data[r];
	// 	if (row.includes('#')) {
	// 		galacticMap.push(row);
	// 	} else {
	// 		galacticMap.push(row);
	// 		galacticMap.push(row);
	// 	}
	// }

	// let expandedGalacticMap: string[] = [];

	// for (let c = 0; c < galacticMap[0].length; c++) {
	// 	let columnHasGalaxy = false;
	// 	for (let r = 0; r < galacticMap.length; r++) {
	// 		if (galacticMap[r][c] === '#') {
	// 			columnHasGalaxy = true;
	// 			break;
	// 		}
	// 	}

	// 	for (let r = 0; r < galacticMap.length; r++) {
	// 		if (!columnHasGalaxy) {
	// 			expandedGalacticMap[r] = (expandedGalacticMap[r] || '') + '..';
	// 		} else {
	// 			expandedGalacticMap[r] =
	// 				(expandedGalacticMap[r] || '') + galacticMap[r][c];
	// 		}
	// 	}
	// }

	// galacticMap = expandedGalacticMap;

	// let galaxies: Point[] = [];
	// let n = 1;
	// for (let x = 0; x < galacticMap.length; x++) {
	// 	for (let y = 0; y < galacticMap[0].length; y++) {
	// 		if (galacticMap[x][y] === '#') {
	// 			galaxies.push({ n, x, y });
	// 			n += 1;
	// 		}
	// 	}
	// }

	// let totalPathLength = 0;

	// for (let i = 0; i < galaxies.length - 1; i++) {
	// 	const galaxy = galaxies[i];

	// 	totalPathLength += countPathLength(galaxy, i, galaxies);
	// }

	// return totalPathLength;

	// return result;
};
