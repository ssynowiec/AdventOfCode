import { partOne } from './part-one';
import { partTwo } from './part-two';

test('part 1 should return 19114', async () => {
	const result = await partOne(__dirname + '/test.data.txt');
	const expectedResult = 19114;

	expect(result).toBe(expectedResult);

	if (result === expectedResult) {
		const value = await partOne(__dirname + '/input.data.txt');
		console.log('Part 1:', value);
	}
});

test('part 2 should return 167409079868000', async () => {
	const result = await partTwo(__dirname + '/test.data.txt');
	const expectedResult = 167409079868000;

	expect(result).toBe(expectedResult);

	if (result === expectedResult) {
		const value = await partTwo(__dirname + '/input.data.txt');
		console.log('Part 2:', value);
	}
});
