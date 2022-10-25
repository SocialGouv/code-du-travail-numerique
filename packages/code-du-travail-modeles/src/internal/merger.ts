import fs from "fs";
import path from "path";
import yaml from "yaml";

import {
  commonFilenameFilter,
  indemniteLicenciementFilenameFilter,
  preavisRetraiteFilenameFilter,
} from "./constants";

export const publicodesDir = path.resolve(__dirname, "../../src/modeles");

export function mergePreavisRetraiteModels(): any {
  return mergeModels(preavisRetraiteFilenameFilter);
}

export function mergeIndemniteLicenciementModels(): any {
  return mergeModels(indemniteLicenciementFilenameFilter);
}

export function mergeCommonModels(): any {
  return mergeModels(commonFilenameFilter);
}

function mergeModels(filenameFilter: string[]): any {
  return yaml.parse(concatenateFilesInDir(publicodesDir, filenameFilter));
}

function concatenateFilesInDir(
  dirPath: string,
  filenameFilter: string[]
): string {
  return fs
    .readdirSync(dirPath)
    .map((filename) => {
      const fullpath = path.join(dirPath, filename);
      if (fs.statSync(fullpath).isDirectory()) {
        return concatenateFilesInDir(fullpath, filenameFilter);
      } else {
        return filename.endsWith(".yaml") && filenameFilter.includes(filename)
          ? fs.readFileSync(fullpath).toString()
          : "";
      }
    })
    .join("\n");
}
