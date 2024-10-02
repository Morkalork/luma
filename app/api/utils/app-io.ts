import fs from "fs";
import path from "path";

export function readFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log("Looking for file at path:", filePath);
    if (!fs.existsSync(filePath)) {
      console.log(`File ${filePath} does not exist, creating...`);
      try {
        const folderPath = path.dirname(filePath);
        fs.mkdirSync(folderPath, { recursive: true, mode: 0o755 });
        fs.writeFileSync(filePath, "");
      } catch (e) {
        console.error("Error creating file", e);
      }
      console.log("File created!");
    }

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file ${filePath}:\n`, err);
        return reject();
      } else {
        resolve(data);
      }
    });
  });
}

export async function readJsonFile<T>(filePath: string): Promise<T> {
  return new Promise(async (resolve) => {
    const data = await readFile(filePath);
    if (data) {
      try {
        const cache = JSON.parse(data);
        if (cache) {
          return resolve(cache as T);
        }
      } catch (e) {
        console.error("Error parsing cache file", e);
      }
    }

    resolve({} as T);
  });
}

export async function writeJsonFile<T>(
  filePath: string,
  data: T
): Promise<void> {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
