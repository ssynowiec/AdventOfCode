import { partOne } from './part-one';
import { partTwo } from './part-two';

test('part 1, test 1 should return 2\npart 1, test 2 should return 6', async () => {
	const result1 = await partOne(__dirname + '/test.data.txt');
	const expectedResult1 = 2;

	expect(result1).toBe(expectedResult1);

	const result2 = await partOne(__dirname + '/test2.data.txt');
	const expectedResult2 = 6;

	expect(result2).toBe(expectedResult2);

	if (result1 === expectedResult1) {
		const value = await partOne(__dirname + '/input.data.txt');
		console.log('Part 1:', value);
	}
});

// test('part 2 should return 6', async () => {
// 	const result = await partTwo(__dirname + '/test3.data.txt');
// 	const expectedResult = 6;

// 	expect(result).toBe(expectedResult);

// 	// if (result === expectedResult) {
// 	// 	const value = await partTwo(__dirname + '/input.data.txt');
// 	// 	console.log('Part 2:', value);
// 	// }
// });
