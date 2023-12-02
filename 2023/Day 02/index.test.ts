import { partOne } from './part-one';

test('part 1 should return 8', async () => {
	const result = await partOne(__dirname + '/test.data.txt');
	const expectedResult = 8;

	expect(result).toBe(expectedResult);

	if (result === expectedResult) {
		const value = await partOne(__dirname + '/input.data.txt');
		console.log('Part 1:', value);
	}
});
