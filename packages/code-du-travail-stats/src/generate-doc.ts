// generate-doc.ts
// ----------------------------------------------------------------------------
// Génère le plan de tracking markdown lisible par le métier À PARTIR DU FICHIER
// JSON `events/events.extracted.json` (et non du code) : le JSON est la source
// intermédiaire, déjà dérivée du code par extract-events.ts.
//
// `buildDoc()` renvoie le markdown en mémoire (réutilisé par check-doc.ts).
// Lancé directement (tsx src/generate-doc.ts), le script écrit DOC_PATH.
// ----------------------------------------------------------------------------

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { EventsExtraction } from "./events.schema";
import { renderTrackingPlan } from "./render-doc";
import {
  OUTPUT_PATH,
  DOC_PATH,
  REPO_URL,
  REPO_REF,
  REPO_ROOT,
} from "./project";

// Lit l'extraction JSON committée et la rend en markdown déterministe.
export function buildDoc(): string {
  if (!fs.existsSync(OUTPUT_PATH)) {
    throw new Error(
      `[generate-doc] ${path.basename(OUTPUT_PATH)} introuvable. Lance d'abord \`pnpm -F @socialgouv/cdtn-stats events:extract\`.`
    );
  }
  const extraction = JSON.parse(
    fs.readFileSync(OUTPUT_PATH, "utf8")
  ) as EventsExtraction;
  return renderTrackingPlan(extraction, { repoUrl: REPO_URL, ref: REPO_REF });
}

export { DOC_PATH };

function main(): void {
  const markdown = buildDoc();
  fs.mkdirSync(path.dirname(DOC_PATH), { recursive: true });
  fs.writeFileSync(DOC_PATH, markdown);
  console.log(`[generate-doc] Écrit : ${path.relative(REPO_ROOT, DOC_PATH)}`);
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  main();
}
