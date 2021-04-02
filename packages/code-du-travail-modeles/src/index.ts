/* Générateur des modèles sociales */
import { mergeModels } from "./utils/merger";

const path = require("path");
const fs = require("fs");

const outDir = path.resolve(__dirname, "../lib");

function writeJsonModel() {
  const modeles = mergeModels();
  fs.writeFileSync(
    path.resolve(outDir, "modeles.json"),
    JSON.stringify(modeles, null, 2)
  );
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

writeJsonModel();
