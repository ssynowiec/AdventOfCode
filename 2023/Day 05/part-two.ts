import { asyncReadFile } from '../helpers/readFile';

interface Seed {
	seed?: number;
	soil?: number;
	fertilizer?: number;
	water?: number;
	light?: number;
	temperature?: number;
	humidity?: number;
	location?: number;
	[key: string]: any;
}

const separateArrays: (array: string[]) => string[][] = array => {
	const separetedArray: string[][] = [];

	let aktualnaPodtablica: string[] = [];

	for (const element of array) {
		if (element === '') {
			if (aktualnaPodtablica.length > 0) {
				separetedArray.push(aktualnaPodtablica);
				aktualnaPodtablica = [];
			}
		} else {
			aktualnaPodtablica.push(element);
		}
	}

	if (aktualnaPodtablica.length > 0) {
		separetedArray.push(aktualnaPodtablica);
	}

	return separetedArray;
};

const count = (
	maps: string[][],
	seedsData: Seed[],
	prev: keyof Seed,
	what: keyof Seed,
) => {
	seedsData.forEach(seed => {
		let value = seed[prev];

		for (const map of maps) {
			const range = parseInt(map[map.length - 1]);
			const destinationRange = parseInt(map[0]);
			const sourceRange = parseInt(map[1]);

			if (
				seed[prev] >= sourceRange &&
				seed[prev] <= sourceRange + range - 1
			) {
				value = destinationRange + (seed[prev] - sourceRange);
				break;
			}
		}

		// Remove the old seed from the set
		// seedsData.delete(seed);

		// Add the new seed to the set
		seed[what] = value;
		// seedsData.add(newSeed);
	});
};

export const partTwo = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	const seedsData: Seed[] = [];

	const parsedData = separateArrays(data);

	parsedData.forEach((data, i) => {
		data.splice(0, 1);
		const maps = data.map(el => {
			return el.split(' ');
		});

		if (i !== 0) {
			switch (i) {
				case 1:
					count(maps, seedsData, 'seed', 'soil');
					break;
				case 2:
					count(maps, seedsData, 'soil', 'fertilizer');
					break;
				case 3:
					count(maps, seedsData, 'fertilizer', 'water');
					break;
				case 4:
					count(maps, seedsData, 'water', 'light');
					break;
				case 5:
					count(maps, seedsData, 'light', 'temperature');
					break;
				case 6:
					count(maps, seedsData, 'temperature', 'humidity');
					break;
				case 7:
					count(maps, seedsData, 'humidity', 'location');
					break;

				default:
					break;
			}
		} else {
			maps.forEach(seedData => {
				for (let i = 0; i < seedData.length; i += 2) {
					const start = parseInt(seedData[i]);
					const end = start + parseInt(seedData[i + 1]);

					for (let s = start; s < end; s++) {
						seedsData.push({ seed: s });
					}
				}
			});
		}
	});

	const locations = Array.from(seedsData).map(
		seed => seed.location,
	) as number[];

	const closestLocation = Math.min(...locations);

	return closestLocation;
};
