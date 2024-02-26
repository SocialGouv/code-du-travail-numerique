/* Générateur des modèles sociales */
import fs from "fs";
import fse from "fs-extra";
import path from "path";
import Engine from "publicodes";

import { extractSupportedCc } from "./extractSupportedCc";
import {
  mergeCommonModels,
  mergeIndemniteLicenciementModels,
  mergePreavisRetraiteModels,
  mergeRuptureConventionnel,
} from "./merger";

const inDir = path.resolve(__dirname, "../../bin");
const outDir = path.resolve(__dirname, "../../lib");

function writeJsonModel({
  merger,
  outputName,
}: {
  merger: () => any;
  outputName: string;
}) {
  const modeles = merger();
  fs.mkdirSync(`${outDir}/modeles`, { recursive: true });
  fs.writeFileSync(
    path.resolve(outDir, `modeles/${outputName}.json`),
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
  try {
    fs.copyFileSync(
      path.resolve(inDir, "index.d.ts"),
      path.resolve(outDir, "index.d.ts")
    );
  } catch {
    console.log("Cannot copy *.d.ts because we are in dev mode 👀");
  }
  fse.copySync(`${inDir}/publicodes`, `${outDir}/publicodes`);
  fse.copySync(`${inDir}/modeles`, `${outDir}/modeles`);
  fse.copySync(`${inDir}/simulators`, `${outDir}/simulators`);
}

function writeSupportedCCFile() {
  const ccn = extractSupportedCc(new Engine(mergeCommonModels()));
  fs.writeFileSync(
    path.resolve(outDir, "modeles/common/utils/ccn-supported.json"),
    JSON.stringify(ccn, null, 2)
  );
}

copyJSFile();
writeSupportedCCFile();
writeJsonModel({
  merger: mergePreavisRetraiteModels,
  outputName: "modeles-preavis-retraite",
});
writeJsonModel({
  merger: () => mergeIndemniteLicenciementModels(),
  outputName: "modeles-indemnite-licenciement",
});
writeJsonModel({
  merger: () => mergeRuptureConventionnel(),
  outputName: "modeles-rupture-conventionnelle",
});
