import { partOne } from './part-one';
import { partTwo } from './part-two';

test('part 1 should return 142', async () => {
	const result = await partOne(__dirname + '/test.data.txt');
	const expectedResult = 142;

	expect(result).toBe(expectedResult);

	if (result === expectedResult) {
		const value = await partOne(__dirname + '/input.data.txt');
		console.log(value);
	}
});

test('part 2 should return 281', async () => {
	const result = await partTwo(__dirname + '/test.part2.data.txt');
	const expectedResult = 281;

	expect(result).toBe(expectedResult);

	if (result === expectedResult) {
		const value = await partTwo(__dirname + '/input.data.txt');
		console.log('Part 2:', value);
	}
});
