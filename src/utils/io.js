import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { cwd } from "process";

class Io {
  constructor(parameters) {
    this.baseRoot = cwd();
  }
  async readFile(fileName) {
    try {
      const path = join(this.baseRoot, "src", "data", fileName);
      const data = await readFile(path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error(error.message);
    }
  }
  async writeFile(fileName, data) {
    try {
      const path = join(this.baseRoot, "src", "data", fileName);
      await writeFile(path, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default Io;
