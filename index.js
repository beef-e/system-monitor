import os from 'os';
import chalk from 'chalk';
const log = console.log;
const blue = chalk.blue;
const green = chalk.green;
const red = chalk.red;
const grey = chalk.grey;
const blueBright = chalk.blueBright;
const greenBright = chalk.greenBright;
log(greenBright(`Hello ${os.userInfo().username}`));
log(grey(`Your system uptime is ${Math.floor(os.uptime() / 60)} mins`));
log(blueBright(`Stats of your system CPU`));
log(blue(`CPU Architecture: ${os.arch()}`));
log(blueBright(`CPU Model: ${os.cpus()[0].model}`));
os.cpus().forEach((cpu, index) => {
    log(blue(`CPU n. ${index + 1}`));
    log(green(`Speed: ${cpu.speed} MHz`));
});
