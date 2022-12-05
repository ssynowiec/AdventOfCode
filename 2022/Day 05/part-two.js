const { promises: fsPromises } = require('fs');
const { dirname } = require('path');

const importStacks = async stacksData => {
	const { stacks } = require(dirname(__filename) + stacksData);

	return stacks;
};

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

const pushToStack = (stack, crates, stacks) => {
	stacks[stack - 1].push(...crates);
};

const removeFromStack = (stack, quantity) => {
	for (let i = 0; i < quantity; i++) {
		stack.pop();
	}
};

const partTwo = async (input, stacksFile) => {
	const data = await asyncReadFile(input);

	const stacks = await importStacks(stacksFile);

	data.forEach(instruction => {
		const instructionArr = instruction.split(' ');
		const quantity = instructionArr[1];
		const stack = instructionArr[3];
		const destinationStack = instructionArr[5];

		const crates = stacks[stack - 1].slice(-quantity);
		pushToStack(destinationStack, crates, stacks);
		removeFromStack(stacks[stack - 1], quantity);
	});

	let result = '';
	stacks.forEach(stack => {
		result += stack[stack.length - 1];
	});

	return result;
};

module.exports = { partTwo };
