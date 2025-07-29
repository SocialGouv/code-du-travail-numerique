import fs from "fs";
import path from "path";
import { parse } from "yaml";

import {
  commonFile,
  indemniteLicenciementFile,
  preavisRetraiteFile,
  ruptureConventionnelleFile,
  preavisDemissionFile,
  indemnitePrecariteFile,
  preavisLicenciementFile,
  heuresRechercheEmploiFile,
} from "./constants";

export const publicodesDir = path.resolve(__dirname, "../../src/modeles");

export function mergePreavisRetraiteModels(): any {
  return mergeModels([commonFile, preavisRetraiteFile]);
}

export function mergePreavisLicenciementModels(): any {
  return mergeModelsWithKeys([commonFile, preavisLicenciementFile]);
}

export function mergerHeuresRechercheEmploiModels(): any {
  return mergeModelsWithKeys([commonFile, heuresRechercheEmploiFile]);
}

export function mergePreavisDemissionModels(): any {
  return mergeModelsWithKeys([commonFile, preavisDemissionFile]);
}

export function mergeIndemnitePrecariteModels(): any {
  return mergeModelsWithKeys([commonFile, indemnitePrecariteFile]);
}

export function mergeIndemniteLicenciementModels(): any {
  return mergeModelsWithKeys([commonFile, indemniteLicenciementFile]);
}

export function mergeRuptureConventionnelle(): any {
  return mergeModelsWithKeys([
    commonFile,
    indemniteLicenciementFile,
    ruptureConventionnelleFile,
  ]);
}

export function mergeCommonModels(): any {
  return mergeModels([commonFile]);
}

function mergeModels(filenameFilter: string[]): any {
  return parse(concatenateFilesInDir(publicodesDir, filenameFilter));
}

function mergeModelsWithKeys(filenameFilter: string[]): any {
  return concatenateFilesInDirWithKeys(publicodesDir, filenameFilter);
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

function concatenateFilesInDirWithKeys(
  dirPath: string,
  filenameFilter: string[]
): any {
  const dirName = path.basename(dirPath);
  const result = fs
    .readdirSync(dirPath)
    .reduce<Record<string, any>>((obj, filename) => {
      const fullpath = path.join(dirPath, filename);
      if (fs.statSync(fullpath).isDirectory()) {
        const dirData = concatenateFilesInDirWithKeys(fullpath, filenameFilter);
        return { ...obj, ...dirData };
      }
      if (filename.endsWith(".yaml") && filenameFilter.includes(filename)) {
        const data = parse(fs.readFileSync(fullpath).toString());
        const idcc = dirName.split("_")[0];
        return { ...obj, [idcc]: { ...obj[idcc], ...data } };
      }
      return obj;
    }, {});
  return result;
}
