import os from 'os';
import chalk from 'chalk';
import si from 'systeminformation';
const log = console.log;
const blue = chalk.blue;
const green = chalk.green;
const red = chalk.red;
const grey = chalk.grey;
const blueBright = chalk.blueBright;
const greenBright = chalk.greenBright;
const redBright = chalk.redBright;
log(greenBright(`Hello ${os.userInfo().username}\n\n`));
log(grey(`Your system uptime is ${Math.floor(os.uptime() / 60)} mins\n\n`));
log(blueBright(`Stats of your system CPU\n`));
log(blue(`CPU Architecture: ${os.arch()}`));
log(blueBright(`CPU Model: ${os.cpus()[0].model}`));
await si.cpuTemperature().then((data) => {
    os.cpus().forEach((cpu, index) => {
        log(blue(`CPU n. ${index + 1}`));
        log(green(`Speed: ${cpu.speed} MHz`));
        if (data.cores[index]) {
            log(greenBright(`Temperature: ${data.cores[index]}°C`));
        }
    });
});
/*os.cpus().forEach((cpu, index) => {
    log(blue(`CPU n. ${index + 1}`));
    log(green(`Speed: ${cpu.speed} MHz`));
    si.cpuTemperature().then((data) => {
        log(greenBright(`Temperature: ${data.cores[index]}°C`));
    });
});*/
log(blueBright(`\nRAM Stats\n`));
log(blue(`Total: ${Math.floor(os.totalmem() / 1024 / 1024)} MB`));
log(blue(`Free: ${Math.floor(os.freemem() / 1024 / 1024)} MB`));
log(redBright('\nSystem Informations\n'));
si.system().then((data) => {
    log(red(`Manufacturer: ${data.manufacturer}`));
    log(redBright(`Model: ${data.model}`));
    if (data.virtual) {
        log(redBright(`You are running on a virtual machine`));
        log(red(data.virtualHost));
    }
    log('\n\n');
});
si.baseboard().then((data) => {
    log(red(`Motherboard: ${data.manufacturer}`));
    log(redBright(`Model: ${data.model}`));
    log(red(`Version: ${data.version}`));
    log('\n\n');
});
si.cpu().then((data) => {
    log(red(`CPU: ${data.manufacturer}`));
    log(redBright(`Brand: ${data.brand}`));
    log(red(`Governor: ${data.governor}`));
    log(redBright(`Cores: ${data.cores}`));
    log(red(`Physical Cores: ${data.physicalCores}`));
    log(redBright(`Socket type: ${data.socket}`));
    if (data.virtualization) {
        log(redBright(`Virtualization is supported on your system`));
    }
    log('\n\n');
});
si.osInfo().then((data) => {
    if (data.platform === `linux`) {
        log(red(`OS: ${data.distro}`));
        log(redBright(`Kernel: ${data.kernel}`));
        log(red(`${data.logofile}`));
    }
    else {
        log(red(`OS: ${data.distro}`));
        log(redBright(`Kernel: ${data.kernel}`));
        log(red(`${data.logofile}`));
    }
});
