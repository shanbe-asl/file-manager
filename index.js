import readline from "readline";
import { up, pathToDir, listDir } from "./cli.js";
import { cat, add, rn, cp, mv, rm } from './f-ops.js';


const username =
  process.argv
    .slice(2)
    .find((arg) => arg.startsWith("--username="))
    ?.split("=")[1] || "User";

console.log(`Welcome to the File Manager, ${username}!`);
console.log("Please enter your command or Ctrl+C/type .exit to exit.");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ">",
});

rl.prompt();

rl.on("line", (input) => {
  const [command, ...args] = input.trim().split(" ");

  switch (command) {
    case "up":
      up();
      break;
    case "cd":
      if (args.length > 0) {
        pathToDir(args[0]);
      } else {
        console.log("Please specify a directory path.");
      }
      break;
    case "ls":
      listDir();
      break;
    case "cat":
      if (args.length > 0) {
        cat(args[0]);
      } else {
        console.log("Please specify a file path.");
      }
      break;

    case "add":
      if (args.length > 0) {
        add(args[0]);
      } else {
        console.log("Please specify a file name.");
      }
      break;

    case "rn":
      if (args.length >= 2) {
        rn(args[0], args[1]);
      } else {
        console.log("Please specify the old and new file names.");
      }
      break;

    case "cp":
      if (args.length >= 2) {
        cp(args[0], args[1]);
      } else {
        console.log("Please specify the source and destination paths.");
      }
      break;

    case "mv":
      if (args.length >= 2) {
        mv(args[0], args[1]);
      } else {
        console.log("Please specify the source and destination paths.");
      }
      break;

    case "rm":
      if (args.length > 0) {
        rm(args[0]);
      } else {
        console.log("Please specify a file path.");
      }
      break;

    case ".exit":
      rl.close();
      break;
    default:
      console.log(`Invalid input: ${command}`);
  }

  rl.prompt();
}).on("close", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

process.on("SIGINT", () => {
  rl.close();
});
