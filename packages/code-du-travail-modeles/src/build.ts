/* Générateur des modèles sociales */
import { mergeModels } from "./internal/merger";

import path from "path";
import fs from "fs";
import fse from "fs-extra";

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

copyJSFile();
writeJsonModel();
