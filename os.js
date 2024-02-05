import os from "os";

function EOL() {
  console.log(`EOL: '${os.EOL}'`);
}

function cpus() {
  const cpus = os.cpus();
  console.log("CPU Information: ");
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}:`);
    console.log(`Model: ${cpu.model}`);
    console.log(`Clock Rate: ${cpu.speed / 1000} GHz`);
  });
}

function homedir() {
  console.log(`Home Directory: ${os.homedir()}`);
}

function sysUsername() {
  console.log(`System Username: ${os.userInfo().username}`);
}

function architecture() {
  console.log(`CPU Architecture: ${os.arch()}`);
}

export { EOL, cpus, homedir, sysUsername, architecture };