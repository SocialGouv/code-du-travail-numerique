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
import { findPayloadIncoherences } from "./payload-coherence";

const REGEN_HINT =
  "=> Lance `pnpm -F @socialgouv/cdtn-stats events:extract` puis commit le fichier.";

function main(): void {
  const extraction = extractEvents();
  const fresh = serializeExtraction(extraction);

  // Cohérence du vocabulaire : deux émetteurs de la même action doivent envoyer
  // le même contexte. Vérifié AVANT le drift-check — régénérer le catalogue ne
  // corrigerait pas une incohérence, ça la figerait.
  const incoherences = findPayloadIncoherences(extraction.events);
  if (incoherences.length > 0) {
    console.error(
      "[check-events] Payloads INCOHÉRENTS : une même action envoie des contextes différents selon l'émetteur."
    );
    for (const { action, shapes, unexpectedKeys } of incoherences) {
      console.error(
        `  ${action} — clés divergentes : ${unexpectedKeys.join(", ")}`
      );
      shapes.forEach((shape) => console.error(`      ${shape}`));
    }
    console.error(
      "=> Aligne les émetteurs, ou déclare la clé comme optionnelle dans src/payload-coherence.ts en expliquant pourquoi."
    );
    process.exit(1);
  }

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
