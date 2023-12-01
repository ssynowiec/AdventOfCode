import { partOne } from './part-one';

test('partOne should return 142', async () => {
	const result = await partOne(__dirname + '/test.data.txt');
	const expectedResult = 142;

	expect(result).toBe(expectedResult);

	if (result === expectedResult) {
		const value = await partOne(__dirname + '/input.data.txt');
		console.log(value);
	}
});
