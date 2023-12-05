import { asyncReadFile } from '../helpers/readFile';

interface Seed {
	seed?: string;
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
	prev: string,
	what: string,
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

		seed[what] = value;
	});
};

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	const seedsData: Seed[] = [];

	const parsedData = separateArrays(data);

	parsedData.forEach((data, i) => {
		data.splice(0, 1);
		let seed = {};
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
				seedData.forEach(data => {
					seed = { seed: parseInt(data) };
					seedsData.push(seed);
				});
			});
		}
	});

	const locations = seedsData.map(seed => {
		return seed.location;
	}) as number[];

	const closestLocation = Math.min(...locations);

	// seedsData.sort((a: Seed, b: Seed) => b.location - a.location);

	return closestLocation;
};
