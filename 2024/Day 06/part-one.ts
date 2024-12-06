import { asyncReadFile } from '@/helpers/readFile';

export const partOne = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);

	const isOutOfBounds = (x: number, y: number) =>
		x < 0 || x >= data[0].length - 1 || y < 0 || y > data.length - 1;

	let direction: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT' = 'TOP';
	const currentPosition = { x: 0, y: 0, visited: false };
	const points: { x: number; y: number; visited: boolean }[] = [];

	data.forEach((line, row) => {
		line.split('').forEach((char, col) => {
			const point = { x: col, y: row, visited: false };
			if (char === '^') {
				currentPosition.y = row;
				currentPosition.x = col;
				currentPosition.visited = true;
			}
			points.push(point);
		});
	});

	while (!isOutOfBounds(currentPosition.x, currentPosition.y)) {
		points.find(
			point =>
				point.x === currentPosition.x && point.y === currentPosition.y,
		)!.visited = true;

		if (isOutOfBounds(currentPosition.x, currentPosition.y + 1)) {
			break;
		}

		switch (direction) {
			case 'TOP':
				if (data[currentPosition.y - 1][currentPosition.x] === '#') {
					direction = 'RIGHT';
					currentPosition.x++;
				} else {
					currentPosition.y--;
				}
				break;
			case 'BOTTOM':
				if (data[currentPosition.y + 1][currentPosition.x] === '#') {
					direction = 'LEFT';
					currentPosition.x--;
				} else {
					currentPosition.y++;
				}
				break;
			case 'LEFT':
				if (data[currentPosition.y][currentPosition.x - 1] === '#') {
					direction = 'TOP';
					currentPosition.y--;
				} else {
					currentPosition.x--;
				}
				break;
			case 'RIGHT':
				if (data[currentPosition.y][currentPosition.x + 1] === '#') {
					direction = 'BOTTOM';
					currentPosition.y++;
				} else {
					currentPosition.x++;
				}
				break;

			default:
				break;
		}
	}

	result = points.filter(point => point.visited).length;

	return result;
};
