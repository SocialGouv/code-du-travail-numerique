import path from "path";
import fs from "fs";

export class MergeModeles {
  merge(): string {
    const publicodesDir = path.resolve(__dirname, "../modeles");
    return this.concatenateFilesInDir(publicodesDir);
  }

  concatenateFilesInDir(dirPath: string): string {
    return fs
      .readdirSync(dirPath)
      .map((filename) => {
        const fullpath = path.join(dirPath, filename);
        if (fs.statSync(fullpath).isDirectory()) {
          return this.concatenateFilesInDir(fullpath);
        } else {
          return filename.endsWith(".yaml")
            ? fs.readFileSync(fullpath).toString()
            : "";
        }
      })
      .reduce((acc, cur) => acc + "\n" + cur, "");
  }
}
