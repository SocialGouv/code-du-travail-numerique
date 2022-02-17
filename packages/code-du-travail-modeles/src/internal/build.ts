/* Générateur des modèles sociales */
import fs from "fs";
import fse from "fs-extra";
import path from "path";
import Engine from "publicodes";

import { extractSupportedCc } from "./extractSupportedCc";
import { mergeModels } from "./merger";

const inDir = path.resolve(__dirname, "../../bin");
const outDir = path.resolve(__dirname, "../../lib");

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
  fse.copySync(`${inDir}/utils`, `${outDir}/utils`);
}

function writeSupportedCCFile() {
  const ccn = extractSupportedCc(new Engine(mergeModels()));
  const jsString =
    '"use strict";\n' +
    'Object.defineProperty(exports, "__esModule", { value: true });\n' +
    "exports.supportedCcn = void 0;\n" +
    `exports.supportedCcn = ${JSON.stringify(ccn, null, 2)};`;
  fs.writeFileSync(path.resolve(outDir, "utils/constants.js"), jsString);
}

copyJSFile();
writeSupportedCCFile();
writeJsonModel();
