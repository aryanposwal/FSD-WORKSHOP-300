// File Creating , Reading , Writing , Delting , Updating
import fs from "node:fs/promises";
const filePath = "userData.txt";

async function createFile(content) {
  try {
    await fs.writeFile(filePath, content, "utf8");
    console.log("File created successfully!");
  } catch (err) {
    console.error("Error creating file:", err);
  }
}

async function readFile() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    console.log("File Content:\n", data);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}


async function appendFile(content) {
  try {
    await fs.appendFile(filePath, content, "utf8");
    console.log("File updated successfully!");
  } catch (err) {
    console.error("Error updating file:", err);
  }
}


async function deleteFile() {
  try {
    await fs.unlink(filePath);
    console.log("File deleted successfully!");
  } catch (err) {
    console.error("Error deleting file:", err);
  }
}

async function runDemo() {
  await createFile("Hello World!\n");
  await appendFile("Appending a new line.\n");
  await readFile();
  // await deleteFile();
}

runDemo();