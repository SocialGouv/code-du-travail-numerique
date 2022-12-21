import Engine from "publicodes";

import fs from "fs";

import {
  mergeIndemniteLicenciementModels,
  mergePreavisRetraiteModels,
} from "./src/internal/merger";

fs.writeFileSync(
  "./src/modeles/modeles-preavis-retraite.json",
  JSON.stringify(mergePreavisRetraiteModels(), null, 2)
);

(global as typeof globalThis).engine = new Engine(
  mergeIndemniteLicenciementModels()
);
