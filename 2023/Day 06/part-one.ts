import { asyncReadFile } from '../helpers/readFile';

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	const times = data[0]
		.slice(data[0].indexOf(':'), data[0].length)
		.split(' ')
		.filter(element => !isNaN(parseInt(element)));
	const distances = data[1]
		.slice(data[1].indexOf(':'), data[1].length)
		.split(' ')
		.filter(element => !isNaN(parseInt(element)));

	const numberWaysToBeatRecord: number[] = [];
	times.forEach((time, i) => {
		const raceTime = parseInt(time);
		const recordDistance = parseInt(distances[i]);

		let timesToBeatRecrod = 0;

		for (let i = 0; i < raceTime; i++) {
			const holdingTime = i;
			const racingTime = raceTime - holdingTime;
			const speed = holdingTime;
			const distance = speed * racingTime;
			if (distance > recordDistance) {
				timesToBeatRecrod += 1;
			}
		}
		numberWaysToBeatRecord.push(timesToBeatRecrod);
	});

	result = numberWaysToBeatRecord.reduce((a, b) => a * b, 1);

	return result;
};
