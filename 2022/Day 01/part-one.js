const { promises: fsPromises } = require('fs');
const { dirname } = require('path');

async function asyncReadFile(filename) {
	try {
		const contents = await fsPromises.readFile(
			dirname(__filename) + filename,
			'utf-8',
		);

		const arr = contents.split(/\r?\n/);

		return arr;
	} catch (err) {
		console.log(err);
	}
}

const mostCalories = async () => {
	const data = await asyncReadFile('/data.txt');

	const totalCaloriesPossessedByElves = [];

	let caloriesPossessedByElf = 0;
	data.forEach(calories => {
		if (calories !== '') {
			caloriesPossessedByElf += parseInt(calories);
		} else {
			totalCaloriesPossessedByElves.push(caloriesPossessedByElf);
			caloriesPossessedByElf = 0;
		}
	});

	return Math.max(...totalCaloriesPossessedByElves);
};

mostCalories().then(result => console.log(result));
