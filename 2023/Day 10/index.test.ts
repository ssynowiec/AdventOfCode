import { partOne } from './part-one';
import { partTwo } from './part-two';

test('part 1 test 1 should return 4', async () => {
	const result = await partOne(__dirname + '/test.data.txt');
	const expectedResult = 4;

	expect(result).toBe(expectedResult);
});

test('part 1 test 2 should return 8', async () => {
	const result = await partOne(__dirname + '/test2.data.txt');
	const expectedResult = 8;

	expect(result).toBe(expectedResult);

	if (result === expectedResult) {
		const value = await partOne(__dirname + '/input.data.txt');
		console.log('Part 1:', value);
	}
});

// test('part 2 test 1 should return 4', async () => {
// 	const result = await partTwo(__dirname + '/test3.data.txt');
// 	const expectedResult = 4;

// 	expect(result).toBe(expectedResult);

// 	if (result === expectedResult) {
// 		const value = await partTwo(__dirname + '/input.data.txt');
// 		console.log('Part 2:', value);
// 	}
// });

// test('part 2 test 2 should return 8', async () => {
// 	const result = await partTwo(__dirname + '/test4.data.txt');
// 	const expectedResult = 8;

// 	expect(result).toBe(expectedResult);

// 	if (result === expectedResult) {
// 		const value = await partTwo(__dirname + '/input.data.txt');
// 		console.log('Part 2:', value);
// 	}
// });

// test('part 2 test 3 should return 10', async () => {
// 	const result = await partTwo(__dirname + '/test5.data.txt');
// 	const expectedResult = 10;

// 	expect(result).toBe(expectedResult);

// 	if (result === expectedResult) {
// 		const value = await partTwo(__dirname + '/input.data.txt');
// 		console.log('Part 2:', value);
// 	}
// });
