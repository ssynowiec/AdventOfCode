import { asyncReadFile } from '../helpers/readFile';

export const partTwo = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	const times = data[0]
		.slice(data[0].indexOf(':'), data[0].length)
		.split(' ')
		.filter(element => !isNaN(parseInt(element)))
		.join('');
	const distances = data[1]
		.slice(data[1].indexOf(':'), data[1].length)
		.split(' ')
		.filter(element => !isNaN(parseInt(element)))
		.join('');

	const raceTime = parseInt(times);
	const recordDistance = parseInt(distances);

	for (let i = 0; i < raceTime; i++) {
		const holdingTime = i;
		const racingTime = raceTime - holdingTime;
		const speed = holdingTime;
		const distance = speed * racingTime;
		if (distance > recordDistance) {
			result += 1;
		}
	}

	return result;
};
