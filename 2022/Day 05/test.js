const { partOne } = require('./part-one');
const { partTwo } = require('./part-two');

const testTheSoulution = (
	fun,
	testData,
	data,
	testName,
	testStackFile,
	stackFile,
	result,
) => {
	fun(testData, testStackFile).then(res => {
		if (res === result) {
			console.log(`${testName}: Test passed`);
			fun(data, stackFile).then(res =>
				console.log(`Soulution of ${testName}: ${res}`),
			);
		} else {
			console.error(
				`${testName}: Test failed, expected ${result} but got ${res}`,
			);
		}
	});
};

testTheSoulution(
	partOne,
	'/test.data.txt',
	'/data.txt',
	'Part one',
	'/test.array.js',
	'/array.js',
	'CMZ',
);

testTheSoulution(
	partTwo,
	'/test.data.txt',
	'/data.txt',
	'Part two',
	'/test.array.js',
	'/array.js',
	'MCD',
);
