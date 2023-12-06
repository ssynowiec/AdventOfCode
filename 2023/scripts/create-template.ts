import fs from 'fs';

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');

const folderName = `Day ${day}`;

if (!fs.existsSync(folderName)) {
	fs.mkdirSync(folderName);

	const partOneTemplatePath = 'templates/part-one.ts';

	fs.copyFile(partOneTemplatePath, `${folderName}/part-one.ts`, err => {
		if (err) throw err;
	});

	const partTwoTemplatePath = 'templates/part-two.ts';

	fs.copyFile(partTwoTemplatePath, `${folderName}/part-two.ts`, err => {
		if (err) throw err;
	});

	const testsTemplatePath = 'templates/index.test.ts';

	fs.copyFile(testsTemplatePath, `${folderName}/index.test.ts`, err => {
		if (err) throw err;
	});

	fs.writeFileSync(`${folderName}/input.data.txt`, 'Insert your input here!');
	fs.writeFileSync(
		`${folderName}/test.data.txt`,
		'Insert your test input here!',
	);

	const readmeTemplatePath = 'templates/README.md';

	fs.copyFile(readmeTemplatePath, `${folderName}/README.md`, err => {
		if (err) throw err;
	});

	console.log('Folder with template created!');
} else {
	console.log('Folder already exists!');
}
