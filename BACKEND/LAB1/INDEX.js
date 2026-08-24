import { EventEmitter } from "node:events";
const task = new EventEmitter();

task.on("greet", (name) => {
  console.log("hello, ${name}! welcome to the session");
});

task.on("exit", (reason) => {
  console.log("session ending. reason: ${reason}");
});

task.on("greet", () => {
  console.log("class is started");
});

task.on("start", () => {
  console.log("class is ended");
});

task.emit("greet", "students");
task.emit("exit", "class completed");
