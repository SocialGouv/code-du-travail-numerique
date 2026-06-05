// check-events.ts
// ----------------------------------------------------------------------------
// Relance l'extraction en mémoire et la compare au fichier committé
// `events/events.extracted.json`. Si un event a été ajouté / supprimé / modifié
// sans régénérer le fichier → exit 1 avec un message explicite.
//
// Utilisé en CI (workflow `Stats events`) pour bloquer une PR désynchronisée.
// La comparaison est une égalité stricte de chaîne : l'extraction est
// déterministe (events triés, aucun timestamp).
// ----------------------------------------------------------------------------

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import {
  extractEvents,
  serializeExtraction,
  OUTPUT_PATH,
} from "./extract-events";

const REGEN_HINT =
  "=> Lance `pnpm -F @socialgouv/cdtn-stats events:extract` puis commit le fichier.";

function main(): void {
  const fresh = serializeExtraction(extractEvents());

  if (!fs.existsSync(OUTPUT_PATH)) {
    console.error(
      `[check-events] ${path.basename(OUTPUT_PATH)} est ABSENT alors que des events existent dans le code.`
    );
    console.error(REGEN_HINT);
    process.exit(1);
  }

  const committed = fs.readFileSync(OUTPUT_PATH, "utf8");

  if (committed !== fresh) {
    console.error(
      "[check-events] events/events.extracted.json est DÉSYNCHRONISÉ avec le code (event ajouté, supprimé ou modifié)."
    );
    console.error(REGEN_HINT);
    process.exit(1);
  }

  console.log(
    "[check-events] OK — events/events.extracted.json est à jour avec le code."
  );
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  main();
}
