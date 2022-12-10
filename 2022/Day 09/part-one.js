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

const move = (direction, step, headPosition, tailPosition) => {
	for (let i = 1; i <= step; i++) {
		const c = Math.sqrt(
			Math.pow(parseInt(headPosition.x) - parseInt(tailPosition.x), 2) +
				Math.pow(
					parseInt(headPosition.y) - parseInt(tailPosition.y),
					2,
				),
		);
		if (c === 1) {
			headPosition[direction] += step;
		}
	}
	// return position;
};

const partOne = async input => {
	const data = await asyncReadFile(input);
	let headPosition = { x: 0, y: 0 };
	let tailPosition = { x: -1, y: 0 };

	data.forEach(movement => {
		const direction = movement.split(' ')[0];
		const step = parseInt(movement.split(' ')[1]);

		switch (direction) {
			case 'R':
				headPosition.x += step;
				tailPosition.x += step;
				move('x', step, headPosition, tailPosition);
				break;
			case 'L':
				headPosition.x -= step;
				tailPosition.x -= step;
				break;
			case 'U':
				headPosition.y += step;
				tailPosition.y += step;
				break;
			case 'D':
				headPosition.y -= step;
				tailPosition.y -= step;
				break;
		}

		console.log(headPosition, tailPosition);
	});

	return tailPosition;
};

partOne('/test.data.txt').then(console.log);

module.exports = { partOne };
