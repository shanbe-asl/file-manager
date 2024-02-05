import fs from "fs";
import path from "path";
import os from "os";

function up() {
  const currentDir = process.cwd();
  let isRoot;
  if (os.platform() === "win32") {
    // Windows: Check if the current directory matches 'X:\' format
    isRoot = /^[A-Za-z]:\\$/.test(currentDir);
  } else {
    // Unix-like: Check if the current directory is '/'
    isRoot = currentDir === "/";
  }

  if (isRoot) {
    console.log("You are already at the root directory.");
  } else {
    process.chdir(path.dirname(currentDir));
    console.log(`You are currently in: ${process.cwd()}`);
  }
}

function pathToDir(newDir) {
  try {
    process.chdir(newDir);
    console.log(`New directory: ${process.cwd()}`);
  } catch (error) {
    console.error(`chdir: ${error}`);
  }
}

function listDir() {
  fs.readdir(process.cwd(), { withFileTypes: true }, (error, entries) => {
    if (error) {
      console.error(`Failed to list the directory: ${error.message}`);
      return;
    }
    const contents = [];
    entries.forEach((entry, index) => {
      contents.push({
        Index: index + 1,
        Name: entry.name,
        Type: entry.isDirectory() ? "Directory" : "File",
      });
    });

    console.log("Index\tName\t\tType");
    console.log("-----------------------------------------");
    contents.forEach((item) => {
      console.log(`${item.Index}\t${item.Name}\t${item.Type}`);
    });
  });
}

export { up, pathToDir, listDir };
