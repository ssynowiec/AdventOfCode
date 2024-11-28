import { partOne } from './part-one';
import { partTwo } from './part-two';

test('part 1 test 1 should return 32000000', async () => {
	const result = await partOne(__dirname + '/test.data.txt');
	const expectedResult = 32000000;

	expect(result).toBe(expectedResult);

	// if (result === expectedResult) {
	// 	const value = await partOne(__dirname + '/input.data.txt');
	// 	console.log('Part 1:', value);
	// }
});

test('part 1 test 2 should return 11687500', async () => {
	const result = await partOne(__dirname + '/test.data.txt');
	const expectedResult = 11687500;

	expect(result).toBe(expectedResult);

	if (result === expectedResult) {
		const value = await partOne(__dirname + '/input.data.txt');
		console.log('Part 1:', value);
	}
});

// test('part 2 should return ', async () => {
// 	const result = await partTwo(__dirname + '/test.data.txt');
// 	const expectedResult = ;

// 	expect(result).toBe(expectedResult);

// 	if (result === expectedResult) {
// 		const value = await partTwo(__dirname + '/input.data.txt');
// 		console.log('Part 2:', value);
// 	}
// });
