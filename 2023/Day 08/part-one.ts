import { asyncReadFile } from '../helpers/readFile';

type Position = {
	current: string;
	destinations: { L: string; R: string };
};

export const partOne = async (input: string) => {
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

	let currentPosition = 'AAA';

	while (currentPosition !== 'ZZZ') {
		instructions.forEach(instruction => {
			result += 1;
			const position = positions.find(p => p.current === currentPosition);

			if (!position) {
				return;
			}

			if (instruction === 'L') {
				currentPosition = position.destinations.L;
			} else {
				currentPosition = position.destinations.R;
			}
		});
	}

	return result;
};
