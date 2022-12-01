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

const mostCalories = async input => {
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

	totalCaloriesPossessedByElves.sort((a, b) => a - b).reverse();

	const sumOfTop3Calories =
		totalCaloriesPossessedByElves[0] +
		totalCaloriesPossessedByElves[1] +
		totalCaloriesPossessedByElves[2];

	return sumOfTop3Calories;
};

module.exports = { partTwo: mostCalories };
