import { asyncReadFile } from '../helpers/readFile';

type Position = {
	current: string;
	destinations: { L: string; R: string };
};

const findStartPositions = (positions: Position[]) => {
	const startPositions = positions.filter(p => p.current.endsWith('A'));

	return startPositions.map(p => p.current);
};

export const partTwo = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	let instructions: string[] = [];
	const positions: Position[] = [];

	data.forEach((line, i) => {
		if (i === 0) {
			instructions = line.split('');
		} else if (i === 1) {
			return;
		} else {
			const [current, destinations] = line.split(' = ');

			const [L, R] = destinations
				.replace('(', '')
				.replace(')', '')
				.split(', ');

			const position = { current, destinations: { L, R } };
			positions.push(position);
		}
	});

	let positionsMap = new Map(positions.map(p => [p.current, p]));

	let currentPositions: string[] = findStartPositions(positions);
	let steps = 0;

	while (currentPositions.length > 0) {
		steps += 1;
		let nextPositions: string[] = [];

		instructions.forEach(instruction => {
			let tempPositions: string[] = [];

			currentPositions.forEach(currentPosition => {
				const matchingPosition = positionsMap.get(currentPosition);

				if (!matchingPosition) {
					if (!currentPosition.endsWith('Z')) {
						tempPositions.push(currentPosition);
					}
				} else {
					const { L, R } = matchingPosition.destinations;

					if (instruction === 'L') {
						tempPositions.push(...L);
					}

					if (instruction === 'R') {
						tempPositions.push(...R);
					}
				}
			});

			nextPositions = tempPositions;
		});

		currentPositions = nextPositions.filter(pos => !pos.endsWith('Z'));
	}

	console.log(steps);

	return result;
};
