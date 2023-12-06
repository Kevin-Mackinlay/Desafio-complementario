import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const _filename = fileURLToPath(import.meta.url);
export const _dirname = dirname(_filename);

async function readFile(file) {
  try {
    let readfilename = _dirname + "/" + file;
    console.log("readfile", readfilename);
    let result = await fs.promises.readFile(_dirname + "/" + file, "utf-8");
    let data = await JSON.parse(result);
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function writeFile(file, data) {
  try {
    await fs.promises.writeFile(_dirname + "/" + file, JSON.stringify(data));
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function deleteFile(file) {
  try {
    await fs.promises.unlink(_dirname + "/" + file);
    return true;
  } catch (err) {
    console.log(err);
  }
}

export default {
  readFile,
  writeFile,
  deleteFile,
};
