import fs from "fs";

import {
  mergeIndemniteLicenciementModels,
  mergePreavisRetraiteModels,
} from "./internal/merger";

module.exports = () => {
  fs.writeFileSync(
    "./src/modeles/modeles-indemnite-licenciement.json",
    JSON.stringify(mergeIndemniteLicenciementModels(), null, 2)
  );

  fs.writeFileSync(
    "./src/modeles/modeles-preavis-retraite.json",
    JSON.stringify(mergePreavisRetraiteModels(), null, 2)
  );
};
