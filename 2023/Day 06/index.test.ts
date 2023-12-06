import { partOne } from './part-one';
import { partTwo } from './part-two';

test('part 1 should return 288', async () => {
	const result = await partOne(__dirname + '/test.data.txt');
	const expectedResult = 288;

	expect(result).toBe(expectedResult);

	if (result === expectedResult) {
		const value = await partOne(__dirname + '/input.data.txt');
		console.log('Part 1:', value);
	}
});
