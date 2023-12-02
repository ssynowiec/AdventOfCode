import { log } from 'console';
import { asyncReadFile } from '../helpers/readFile';

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	const maxColors = [
		{ color: 'red', max: 12 },
		{ color: 'green', max: 13 },
		{ color: 'blue', max: 14 },
	];

	data.forEach(line => {
		const games = line.split(':');
		const gameId = parseInt(games[0].split(' ')[1]);
		const sets = games[1].split(';');

		let isPossible = true;

		sets.forEach(set => {
			if (isPossible) {
				const cubes = set.split(',');

				cubes.forEach(cubeData => {
					const cubes = cubeData.split(' ');
					cubes.shift();
					const cubesColor = cubes[1];
					const numberOfCubes = parseInt(cubes[0]);

					const max = maxColors.find(
						color => color.color === cubesColor,
					);

					if (!(max && max.max >= numberOfCubes)) {
						isPossible = false;
					}
				});
			}
		});

		if (isPossible) {
			result += gameId;
		}
	});

	return result;
};
