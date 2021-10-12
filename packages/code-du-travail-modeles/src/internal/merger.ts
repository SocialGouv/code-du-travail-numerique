import fs from "fs";
import path from "path";
import yaml from "yaml";

const publicodesDir = path.resolve(__dirname, "../../src/modeles");

export function mergeModels(
  includedCcFiles: string[] | undefined = undefined
): any {
  return yaml.parse(concatenateFilesInDir(publicodesDir, includedCcFiles));
}

function concatenateFilesInDir(
  dirPath: string,
  includedCcFiles: string[] | undefined = undefined
): string {
  return fs
    .readdirSync(dirPath)
    .map((filename) => {
      const fullpath = path.join(dirPath, filename);
      if (fs.statSync(fullpath).isDirectory()) {
        return concatenateFilesInDir(fullpath, includedCcFiles);
      } else {
        return filename.endsWith(".yaml") &&
          (filename === "contrat-salarie.yaml" ||
            includedCcFiles === undefined ||
            includedCcFiles.includes(filename))
          ? fs.readFileSync(fullpath).toString()
          : "";
      }
    })
    .join("\n");
}
