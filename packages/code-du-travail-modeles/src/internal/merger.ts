import fs from "fs";
import path from "path";
import yaml from "yaml";

const publicodesDir = path.resolve(__dirname, "../../src/modeles");

export function mergeModels(): any {
  return yaml.parse(concatenateFilesInDir(publicodesDir));
}

function concatenateFilesInDir(dirPath: string): string {
  return fs
    .readdirSync(dirPath)
    .map((filename) => {
      const fullpath = path.join(dirPath, filename);
      if (fs.statSync(fullpath).isDirectory()) {
        return concatenateFilesInDir(fullpath);
      } else {
        return filename.endsWith(".yaml")
          ? fs.readFileSync(fullpath).toString()
          : "";
      }
    })
    .join("\n");
}
