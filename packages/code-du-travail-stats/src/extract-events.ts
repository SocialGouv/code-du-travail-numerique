// extract-events.ts
// ----------------------------------------------------------------------------
// Orchestrateur de l'extraction statique des events de tracking émis par le
// frontend CDTN. Câble les étapes (chacune dans son module) :
//
//   project   → chargement des fichiers source (frontend + enums modeles)
//   enum-index / call-index → index syntaxiques pour résoudre les valeurs
//   value-resolver → résolution category/action/name en valeurs concrètes
//   scanner   → détection des callsites (sendEvent, push Matomo natif)
//   aggregate → tri déterministe + comptages
//
// Events détectés :
//   - sendEvent({ category, action, name? })            de @socialgouv/matomo-next
//   - push(["trackEvent" | "trackSiteSearch" | ...])    events Matomo natifs
//   - _paq.push([...]) / paq.push([...])                + commandes de config
//
// `extractEvents()` renvoie le résultat en mémoire (utilisé par check-events.ts).
// Lancé directement, le script écrit `events/events.extracted.json`.
// ----------------------------------------------------------------------------

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { EventsExtraction } from "./events.schema";
import {
  createProject,
  loadEventSourceFiles,
  loadModelesEnumFiles,
  FRONTEND_SRC,
  OUTPUT_PATH,
  REPO_ROOT,
} from "./project";
import { buildEnumIndex } from "./enum-index";
import { buildCallIndex } from "./call-index";
import { createResolver } from "./value-resolver";
import { scanSourceFiles } from "./scanner";
import { buildExtraction, serializeExtraction } from "./aggregate";

export function extractEvents(): EventsExtraction {
  const project = createProject();

  // Fichiers réellement scannés pour les events (frontend modules).
  const eventFiles = loadEventSourceFiles(project);

  // Enums externes ajoutés UNIQUEMENT pour résoudre des valeurs (pas scannés).
  const enumFiles = loadModelesEnumFiles(project);

  const enumIndex = buildEnumIndex(enumFiles);
  // Index des appels/définitions construit sur les fichiers frontend seulement.
  const callIndex = buildCallIndex(eventFiles);

  const resolver = createResolver(enumIndex, callIndex);
  const scan = scanSourceFiles(eventFiles, resolver, REPO_ROOT);

  return buildExtraction(scan, path.relative(REPO_ROOT, FRONTEND_SRC));
}

// Ré-exports pour conserver l'API consommée par check-events.ts.
export { serializeExtraction, OUTPUT_PATH };

function main(): void {
  const extraction = extractEvents();
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, serializeExtraction(extraction));
  console.log(
    `[extract-events] ${extraction.callsites} callsites · ${extraction.total_events} events (${extraction.unique_events} uniques) · ${extraction.unresolved_callsites} non résolus · ${extraction.matomo_config_calls.length} config`
  );
  console.log(
    `[extract-events] Écrit : ${path.relative(REPO_ROOT, OUTPUT_PATH)}`
  );
}

// Lancé directement (tsx src/extract-events.ts) → écrit le fichier.
// Importé (par check-events.ts) → n'exécute rien.
const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  main();
}
