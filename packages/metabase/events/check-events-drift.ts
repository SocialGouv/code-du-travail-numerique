// check-events-drift.ts
// ----------------------------------------------------------------------------
// Re-lance extract + generate en memoire et compare le resultat avec les
// fichiers actuellement committes (docs/events.md et events/events.extracted.json).
// Si un diff existe → exit 1 avec un message explicite.
//
// Utilise en CI et dans precommit pour garantir que docs/events.md reste
// synchronise avec l'etat du code.
// ----------------------------------------------------------------------------

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const METABASE_DIR = path.resolve(__dirname, "..");
const DOCS_EVENTS = path.join(METABASE_DIR, "docs/events.md");
const EXTRACTED = path.join(METABASE_DIR, "events/events.extracted.json");

function snapshot(file: string): string | null {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

const beforeDocs = snapshot(DOCS_EVENTS);
const beforeExtracted = snapshot(EXTRACTED);

// Les timestamps `generated_at` et "Genere le ..." changent a chaque run
// meme si rien d'autre n'a bouge. On les neutralise avant comparaison.
function normalize(content: string): string {
  return content
    .replace(/"generated_at":\s*"[^"]+"/g, '"generated_at":"__NORMALIZED__"')
    .replace(/Genere le \*\*[^*]+\*\*/g, "Genere le **__NORMALIZED__**");
}

const TSX_BIN = path.resolve(METABASE_DIR, "node_modules/.bin/tsx");

function run(script: string) {
  const r = spawnSync(TSX_BIN, [path.join(__dirname, script)], {
    cwd: METABASE_DIR,
    stdio: "inherit",
    env: process.env,
  });
  if (r.status !== 0) {
    console.error(`[check-events-drift] ${script} a echoue`);
    process.exit(r.status ?? 1);
  }
}

run("extract-events.ts");
run("generate-events-doc.ts");

const afterDocs = snapshot(DOCS_EVENTS);
const afterExtracted = snapshot(EXTRACTED);

let drift = false;
if (normalize(beforeDocs ?? "") !== normalize(afterDocs ?? "")) {
  console.error(
    "[check-events-drift] docs/events.md est DESYNCHRONISE avec le code."
  );
  drift = true;
}
if (normalize(beforeExtracted ?? "") !== normalize(afterExtracted ?? "")) {
  console.error(
    "[check-events-drift] events/events.extracted.json est DESYNCHRONISE avec le code."
  );
  drift = true;
}

if (drift) {
  // Restaurer l'etat avant pour laisser le dev decider quand regenerer
  // (evite un 'files modified' surprise en CI). Si le fichier n'existait
  // pas avant (null), on le supprime au lieu de laisser l'artefact genere.
  if (beforeDocs !== null) fs.writeFileSync(DOCS_EVENTS, beforeDocs);
  else if (fs.existsSync(DOCS_EVENTS)) fs.unlinkSync(DOCS_EVENTS);
  if (beforeExtracted !== null) fs.writeFileSync(EXTRACTED, beforeExtracted);
  else if (fs.existsSync(EXTRACTED)) fs.unlinkSync(EXTRACTED);
  console.error("");
  console.error(
    "=> Lance `pnpm -F @cdt/metabase events:docs` pour regenerer, puis commit."
  );
  process.exit(1);
}

console.log("[check-events-drift] OK, docs/events.md et events.extracted.json sont a jour.");
