#!/usr/bin/env node

import os from 'os';
import chalk from 'chalk';
import si from 'systeminformation';
import figlet from 'figlet';
import inquirer from 'inquirer';

const log = console.log;

const blue = chalk.blue;
const green = chalk.green;
const red = chalk.red;
const grey = chalk.grey;
const blueBright = chalk.blueBright;
const greenBright = chalk.greenBright;
const redBright = chalk.redBright;

const brown = chalk.hex('#A44A3F');
const azure = chalk.hex('#7776BC');
const lightBrown = chalk.hex('#D1B490');
const lightAzure = chalk.hex('#30C5FF');
const lightGreen = chalk.hex('#157145');

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let initialChoice: string;

function printName() {
	log(grey(`Made with ❤️ by ${greenBright('beef_e')}\n`));

	const msg = `Hello ${os.userInfo().username}\n`;
	figlet(msg, { font: 'Colossal' }, (err, data) => {
		log(greenBright(data));
	});
}

async function askChoice() {
	const question = await inquirer.prompt({
		type: 'list',
		name: 'choice',
		message: 'What do you want to do?',
		choices: [
			{
				name: 'Get system informations',
				value: 'system',
			},
			{
				name: 'Go to System monitoring',
				value: 'monitoring',
			},
		],
	});

	initialChoice = question.choice;
}

async function getSysInfo() {
	log(blueBright('\n\nSystem Informations\n'));

	await si.system().then((data) => {
		log(brown(`Manufacturer: ${data.manufacturer}`));
		log(lightBrown(`Model: ${data.model}`));
		if (data.virtual) {
			log(lightBrown(`You are running on a virtual machine`));
			log(brown(data.virtualHost));
		}

		log('\n');
	});

	await si.baseboard().then((data) => {
		log(brown(`Motherboard manufacturer: ${data.manufacturer}`));
		log(lightBrown(`Model: ${data.model}`));
		log(brown(`Version: ${data.version}`));

		log('\n\n');
	});

	await si.cpu().then((data) => {
		log(greenBright(`CPU Brand: ${data.brand}`));
		log(lightGreen(`Governor: ${data.governor}`));
		log(greenBright(`Cores: ${data.cores}`));
		log(lightGreen(`Physical Cores: ${data.physicalCores}`));
		log(lightGreen(`Socket type: ${data.socket}`));
		if (data.virtualization) {
			log(greenBright(`Virtualization is supported on your system`));
		}

		log('\n\n');
	});

	await si.osInfo().then((data) => {
		log(lightAzure(`OS: ${data.distro}`));
		log(azure(`Kernel Version: ${data.kernel}`));
		log(lightAzure(`${data.logofile}`));
	});
}

async function monitorSys() {
	log(lightBrown(`Your system uptime is ${Math.floor(os.uptime() / 60)} mins\n\n`));

	log(blueBright(`Stats of your system CPU\n`));
	log(azure(`CPU Architecture: ${os.arch()}`));
	log(blueBright(`CPU Model: ${os.cpus()[0].model}\n`));

	await si.cpuTemperature().then((data) => {
		os.cpus().forEach((cpu, index) => {
			log(azure(`CPU n. ${index + 1}`));
			log(lightGreen(`Speed: ${cpu.speed} MHz`));
			if (data.cores[index]) {
				log(greenBright(`Temperature: ${data.cores[index]}°C`));
			}
			log('\n');
		});
	});

	log(blueBright(`RAM Stats\n`));
	log(azure(`Total: ${Math.floor(os.totalmem() / 1024 / 1024)} MB`));
	log(azure(`Currently in use: ${Math.floor((os.totalmem() - os.freemem()) / 1024 / 1024)} MB`));
}

//! Inizio Programma
printName();
await wait(350);

await askChoice().then(() => {
	if (initialChoice === 'system') {
		// System informations
		getSysInfo();
	} else if (initialChoice === 'monitoring') {
		// System monitoring
		monitorSys();
	}
});
