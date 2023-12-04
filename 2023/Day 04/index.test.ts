import { partOne } from './part-one';
import { partTwo } from './part-two';

test('part 1 should return 13', async () => {
	const result = await partOne(__dirname + '/test.data.txt');
	const expectedResult = 13;

	expect(result).toBe(expectedResult);

	if (result === expectedResult) {
		const value = await partOne(__dirname + '/input.data.txt');
		console.log('Part 1:', value);
	}
});
