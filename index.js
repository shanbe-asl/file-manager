import readline from 'readline';
import { up, pathToDir, listDir } from './cli.js';

const username =
  process.argv
    .slice(2)
    .find((arg) => arg.startsWith("--username="))
    ?.split("=")[1] || "User";

console.log(`Welcome to the File Manager, ${username}!`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Please enter your command >'
});

rl.prompt();

rl.on('line', (input) => {
  const [command, ...args] = input.trim().split(' ');

  switch (command) {
    case 'up':
      up();
      break;
    case 'cd':
      if (args.length > 0) {
        pathToDir(args[0]);
      } else {
        console.log('Please specify a directory path.');
      }
      break;
    case 'ls':
      listDir();
      break;
    case '.exit':
      rl.close();
      break;
    default:
      console.log(`Invalid input: ${command}`);
  }

}).on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

process.on('SIGINT', () => {
  rl.close();
});

