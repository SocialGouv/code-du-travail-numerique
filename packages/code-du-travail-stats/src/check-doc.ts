// check-doc.ts
// ----------------------------------------------------------------------------
// Régénère le plan de tracking markdown depuis le JSON committé et le compare au
// fichier `events/TRACKING_PLAN.md` committé. Si le markdown a été modifié à la
// main, ou si le JSON a changé sans régénérer le markdown → exit 1.
//
// Utilisé en CI (workflow `Stats events`) pour bloquer une PR désynchronisée.
// Comparaison = égalité stricte de chaîne (rendu déterministe, sans timestamp).
// Combiné à `events:check` (JSON vs code), il garantit : code → JSON → markdown.
// ----------------------------------------------------------------------------

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { buildDoc, DOC_PATH } from "./generate-doc";

const REGEN_HINT =
  "=> Lance `pnpm -F @socialgouv/cdtn-stats doc:generate` puis commit le fichier.";

function main(): void {
  const fresh = buildDoc();

  if (!fs.existsSync(DOC_PATH)) {
    console.error(
      `[check-doc] ${path.basename(DOC_PATH)} est ABSENT alors que des events existent.`
    );
    console.error(REGEN_HINT);
    process.exit(1);
  }

  const committed = fs.readFileSync(DOC_PATH, "utf8");

  if (committed !== fresh) {
    console.error(
      "[check-doc] events/TRACKING_PLAN.md est DÉSYNCHRONISÉ avec events.extracted.json."
    );
    console.error(REGEN_HINT);
    process.exit(1);
  }

  console.log(
    "[check-doc] OK — events/TRACKING_PLAN.md est à jour avec le JSON."
  );
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  main();
}
