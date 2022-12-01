const { promises: fsPromises } = require('fs');
const { dirname } = require('path');

const asyncReadFile = async filename => {
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
};

const partOne = async input => {
	const data = await asyncReadFile(input);

	const totalCaloriesPossessedByElves = [];

	let caloriesPossessedByElf = 0;
	data.forEach((calories, i) => {
		if (calories !== '') {
			caloriesPossessedByElf += parseInt(calories);
		} else {
			totalCaloriesPossessedByElves.push(caloriesPossessedByElf);
			caloriesPossessedByElf = 0;
		}
		if (i === data.length - 1) {
			totalCaloriesPossessedByElves.push(caloriesPossessedByElf);
		}
	});

	return Math.max(...totalCaloriesPossessedByElves);
};

module.exports = { partOne };
