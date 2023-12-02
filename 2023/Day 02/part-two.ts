import { asyncReadFile } from '../helpers/readFile';

export const partTwo = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	data.forEach(line => {
		const games = line.split(':');
		const gameId = parseInt(games[0].split(' ')[1]);
		const sets = games[1].split(';');

		const possible = { red: 0, green: 0, blue: 0 };

		sets.forEach(set => {
			const cubes = set.split(',');

			cubes.forEach(cubeData => {
				const cubes = cubeData.split(' ');
				cubes.shift();
				const cubesColor: string = cubes[1];
				const numberOfCubes = parseInt(cubes[0]);

				switch (cubesColor) {
					case 'red':
						if (numberOfCubes > possible['red']) {
							possible['red'] = numberOfCubes;
						}
						break;

					case 'green':
						if (numberOfCubes > possible['green']) {
							possible['green'] = numberOfCubes;
						}
						break;

					case 'blue':
						if (numberOfCubes > possible['blue']) {
							possible['blue'] = numberOfCubes;
						}
						break;

					default:
						break;
				}
			});
		});

		const gameValue = possible.red * possible.blue * possible.green;
		result += gameValue;
	});

	return result;
};
