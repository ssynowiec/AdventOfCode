const { partOne } = require('./part-one');
const { partTwo } = require('./part-two');

const testTheSoulution = (fun, testData, data, testName, result) => {
	fun(testData).then(res => {
		if (res === result) {
			console.log(`${testName}: Test passed`);
			fun(data).then(res =>
				console.log(`Soulution of ${testName}: ${res}`),
			);
		} else {
			console.error(
				`${testName}: Test failed, expected ${result} but got ${res}`,
			);
		}
	});
};

testTheSoulution(partOne, '/test.data.txt', '/data.txt', 'Part one', 95437);
// testTheSoulution(partTwo, '/test.data.txt', '/data.txt', 'Part two', );
