import { test, expect } from '@playwright/test';
import { partOne } from './part-one';
import { partTwo } from './part-two';

test.describe('Day 05', () => {
	const expectedResult1 = 143;
	test(`Part 1 should return ${expectedResult1}`, async () => {
		const result = await partOne(__dirname + '/test.data.txt');

		expect(result).toBe(expectedResult1);

		if (result === expectedResult1) {
			const value = await partOne(__dirname + '/input.data.txt');
			console.log('Part 1:', value);
		}
	});

	const expectedResult2 = 123;
	test(`Part 2 should return ${expectedResult2}`, async () => {
		const result = await partTwo(__dirname + '/test.data.txt');

		expect(result).toBe(expectedResult2);

		if (result === expectedResult2) {
			const value = await partTwo(__dirname + '/input.data.txt');
			console.log('Part 2:', value);
		}
	});
});
