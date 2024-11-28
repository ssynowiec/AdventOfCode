import { asyncReadFile } from '../helpers/readFile';

interface Module {
	module: string;
	moduleType: string;
	pulseState: string;
	outputs: string[];
}

const parseLine = (line: string) => {
	let [module, output] = line.split(' -> ');

	output = output.replaceAll(',', '');
	const outputs = output.split(' ');

	let moduleType = module.substring(0, 1);

	if (module === 'broadcaster') {
		moduleType = 'broadcaster';
		module = 'broadcaster';
	} else {
		module = module.substring(1);
	}

	return { module, moduleType, pulseState: 'none', outputs };
};

function processSignal(
	modules: Module[],
	module: Module,
	signal: string,
	processed: Set<string> = new Set(),
	signalCount: { [key: string]: number } = { low: 1, high: 1 },
) {
	// console.log('proccessing', module.module, signal);

	let newSignal = signal;

	signalCount[newSignal] += module.outputs.length;

	if (module.pulseState === 'none') {
		module.pulseState = newSignal;
	}

	if (module.moduleType === '%') {
		// newSignal = signal === 'low' ? 'high' : 'low';
		newSignal = module.pulseState === 'low' ? 'high' : 'low';
		module.pulseState = newSignal;
	}

	if (processed.has(module.module)) {
		return signalCount;
	}

	processed.add(module.module);

	module.outputs.forEach(destination => {
		const destinationModule = modules.find(m => m.module === destination);
		if (destinationModule) {
			processSignal(
				modules,
				destinationModule,
				newSignal,
				processed,
				signalCount,
			);
		}
	});

	return signalCount;
}

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	let signal = 'low';

	let countLowSignal = 0;
	let countHighSignal = 0;

	const modules: Module[] = [];
	data.forEach(line => {
		modules.push(parseLine(line));
	});

	const broadcaster = modules.find(module => module.module === 'broadcaster');

	if (!broadcaster) {
		return 0;
	}

	for (let pressButton = 0; pressButton < 1000; pressButton++) {
		const { low, high } = processSignal(modules, broadcaster, signal);
		countLowSignal += low;
		countHighSignal += high;

		// signal = signal === 'low' ? 'high' : 'low';
	}

	result = countLowSignal * countHighSignal;

	return result;
};
