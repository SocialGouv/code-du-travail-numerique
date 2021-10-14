/* Générateur des modèles sociales */
import fs from "fs";
import fse from "fs-extra";
import path from "path";
import Engine from "publicodes";

import { extractImplementedCc } from "./internal/ExtractSupportedCc";
import { mergeModels } from "./internal/merger";

const inDir = path.resolve(__dirname, "../bin");
const outDir = path.resolve(__dirname, "../lib");

function writeJsonModel() {
  const modeles = mergeModels();
  fs.mkdirSync(`${outDir}/modeles`, { recursive: true });
  fs.writeFileSync(
    path.resolve(outDir, "modeles/modeles.json"),
    JSON.stringify(modeles, null, 2)
  );
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

function copyJSFile() {
  fs.copyFileSync(
    path.resolve(inDir, "index.js"),
    path.resolve(outDir, "index.js")
  );
  fs.copyFileSync(
    path.resolve(inDir, "index.d.ts"),
    path.resolve(outDir, "index.d.ts")
  );
  fse.copy(`${inDir}/utils`, `${outDir}/utils`);
}

function writeSupportedCCFile() {
  const modeles = mergeModels();
  const ccn = extractImplementedCc(new Engine(modeles));
  const jsString =
    '"use strict";\n' +
    'Object.defineProperty(exports, "__esModule", { value: true });\n' +
    "exports.supportedCcn = void 0;\n" +
    `exports.supportedCcn = ${JSON.stringify(ccn, null, 2)};`;
  fs.writeFileSync(path.resolve(outDir, "constants.js"), jsString);
  fs.writeFileSync(
    path.resolve(outDir, "constants.d.ts"),
    "export declare const supportedCcn: number[];"
  );
}

writeSupportedCCFile();
copyJSFile();
writeJsonModel();
