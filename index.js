import readline from 'readline';

const username =
  process.argv
    .slice(2)
    .find((arg) => arg.startsWith("--username="))
    ?.split("=")[1] || "User";

console.log(`Welcome to the File Manager, ${username}!`);



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>'
});

rl.prompt();

rl.on('line', (input) => {
  if (input.trim() === '.exit') {
    rl.close();
  } else {
    console.log(`You entered: ${input}`);
    rl.prompt();
  }
}).on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

process.on('SIGINT', () => {
  rl.close();
});