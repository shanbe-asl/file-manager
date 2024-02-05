import { error } from "console";
import fs from "fs";

function handleError(error) {
  if (error) {
    console.error("Operation failed:", error.message);
  }
}

function cat(pathToFile) {
  const stream = fs.createReadStream(pathToFile, { encoding: "utf-8" });
  stream.on("data", (chunk) => {
    console.log(chunk);
  });

  stream.on("error", handleError);
}

function add(fileName) {
  fs.writeFile(fileName, "", (error) => {
    handleError(error);
    if (!error) {
      console.log(`File ${fileName} created.`);
    }
  });
}

function rn(oldName, newName) {
  fs.rename(oldName, newName, (error) => {
    if (error) {
      handleError(error);
    } else {
      console.log(`${oldName} renamed to ${newName}`);
    }
  });
}

function cp(source, destination) {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);

    readStream.on('error', handleError);
    writeStream.on('error', handleError);
    readStream.on('close', () => console.log(`Copied from ${source} to ${destination}`));

    readStream.pipe(writeStream);
}

function mv(source, destination) {
    cp(source, destination);
    fs.unlink(source, error => {
        if (error) {
            handleError(error);
            return;
        }
        console.log(`Moved from ${source} to ${destination}`);
    });
}

function rm(filePath) {
    fs.unlink(filePath, error => {
        if (error) {
            handleError(error);
            return;
        }
        console.log(`${filePath} is deleted.`);
    });
}

export { cat, add, rn, cp, mv, rm };
