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

const partTwo = async input => {
	const data = await asyncReadFile(input);

	const monkeys = [];

	let monkey = { inspectedItems: 0 };
	for (const dataItem of data) {
		if (dataItem.startsWith('M')) {
			const monkey = dataItem.split(' ')[1].slice(0, -1);
		} else if (dataItem.startsWith('  S')) {
			const items = dataItem.split(': ')[1].split(', ');
			monkey.items = items;
		} else if (dataItem.startsWith('  O')) {
			const operation = dataItem.split(': ')[1];
			monkey.operation = operation;
		} else if (dataItem.startsWith('  T')) {
			const test = dataItem.split(': ')[1];
			monkey.test = test;
		} else if (dataItem.startsWith('    If true')) {
			const testPassed = dataItem.split('throw to monkey ')[1];
			monkey.testPassed = parseInt(testPassed);
		} else if (dataItem.startsWith('    If false')) {
			const testFailed = dataItem.split('throw to monkey ')[1];
			monkey.testFailed = parseInt(testFailed);
		} else {
			monkeys.push(monkey);
			monkey = {
				inspectedItems: 0,
			};
		}
	}

	let mod = 1;
	for (let monkey of monkeys) {
		mod *= monkey.test.split('divisible by ')[1];
	}

	for (let i = 0; i < 10000; i++) {
		for (const monkeyData of monkeys) {
			const operationType = monkeyData.operation.split(' ')[3];
			let operation = monkeyData.operation.split(' ')[4];
			monkeyData.items = monkeyData.items.map(item => {
				let itemOperation;
				if (operation === 'old') {
					itemOperation = parseFloat(item);
				} else {
					itemOperation = parseFloat(operation);
				}

				let newItem;
				switch (operationType) {
					case '*':
						newItem = parseFloat(parseFloat(item) * itemOperation);
						break;
					case '+':
						newItem = parseFloat(parseFloat(item) + itemOperation);
						break;
					case '-':
						newItem = parseFloat(parseFloat(item) - itemOperation);
						break;
					case '/':
						newItem = parseFloat(parseFloat(item) / itemOperation);
						break;
				}

				newItem %= mod;

				const divider = parseInt(
					monkeyData.test.split('divisible by ')[1],
				);
				if (newItem % divider === 0) {
					monkeys[monkeyData.testPassed].items.push(newItem);
				} else {
					monkeys[monkeyData.testFailed].items.push(newItem);
				}
				monkeyData.inspectedItems += 1;
				return;
			});
			monkeyData.items = [];
		}
	}

	const totalsinspectedItems = [];
	for (const monkeyData of monkeys) {
		totalsinspectedItems.push(monkeyData.inspectedItems);
	}

	totalsinspectedItems.sort((a, b) => a - b);

	const result =
		totalsinspectedItems[totalsinspectedItems.length - 1] *
		totalsinspectedItems[totalsinspectedItems.length - 2];
	return result;
};

module.exports = { partTwo };
