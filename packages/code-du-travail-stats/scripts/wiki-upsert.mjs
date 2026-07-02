// wiki-upsert.mjs
// ----------------------------------------------------------------------------
// Injecte le plan de tracking (events/TRACKING_PLAN.md) dans une page wiki
// GitHub SANS écraser la page : seul le bloc délimité par les marqueurs
// `<!-- TRACKING_PLAN:START -->` / `<!-- TRACKING_PLAN:END -->` est mis à jour.
// Le titre et tout contenu manuel ajouté autour du bloc sont préservés.
//
// Utilisé par `.github/workflows/stats-events-wiki.yml`. Zéro dépendance :
// exécuté par le `node` préinstallé du runner (`node scripts/wiki-upsert.mjs`).
//
//   node wiki-upsert.mjs <sourceDoc> <wikiPage> "<titre>"
//
// Comportements :
//   - page + marqueurs présents   → remplace uniquement l'intérieur du bloc.
//   - page présente, sans marqueur → ajoute le bloc à la fin (préserve l'existant).
//   - page absente                → la crée avec `# <titre>` + bloc.
// Idempotent : à contenu source égal, la sortie est identique (aucun diff).
// ----------------------------------------------------------------------------

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

export const START_MARKER = "<!-- TRACKING_PLAN:START -->";
export const END_MARKER = "<!-- TRACKING_PLAN:END -->";

// Retire les lignes vides en tête / fin sans toucher au contenu interne.
function trimBlankEdges(text) {
  return text.replace(/^\s*\n/, "").replace(/\s+$/, "");
}

// Construit le bloc marqueurs + contenu source (une seule ligne vide de marge
// n'est PAS ajoutée : les marqueurs encadrent directement le contenu).
function buildBlock(source) {
  return `${START_MARKER}\n${trimBlankEdges(source)}\n${END_MARKER}`;
}

// Renvoie le nouveau contenu de la page wiki. Fonction pure (testable sans IO).
export function upsertBlock(existing, source, title) {
  const block = buildBlock(source);

  if (existing == null) {
    return `# ${title}\n\n${block}\n`;
  }

  const startIdx = existing.indexOf(START_MARKER);
  const endIdx = existing.indexOf(END_MARKER);

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = existing.slice(0, startIdx);
    const after = existing.slice(endIdx + END_MARKER.length);
    return before + block + after;
  }

  // Page existante sans marqueurs : on préserve tout et on ajoute le bloc.
  return `${trimBlankEdges(existing)}\n\n${block}\n`;
}

function main() {
  const [sourcePath, wikiPath, title] = process.argv.slice(2);

  if (!sourcePath || !wikiPath || !title) {
    console.error(
      'Usage: node wiki-upsert.mjs <sourceDoc> <wikiPage> "<titre>"'
    );
    process.exit(1);
  }

  if (!fs.existsSync(sourcePath)) {
    console.error(`[wiki-upsert] Source introuvable : ${sourcePath}`);
    process.exit(1);
  }

  const source = fs.readFileSync(sourcePath, "utf8");
  const existing = fs.existsSync(wikiPath)
    ? fs.readFileSync(wikiPath, "utf8")
    : null;

  const next = upsertBlock(existing, source, title);

  fs.mkdirSync(path.dirname(path.resolve(wikiPath)), { recursive: true });
  fs.writeFileSync(wikiPath, next);

  const mode =
    existing == null
      ? "page créée"
      : existing.includes(START_MARKER)
        ? "bloc mis à jour"
        : "bloc ajouté (page préservée)";
  console.log(`[wiki-upsert] ${mode} : ${wikiPath}`);
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  main();
}
