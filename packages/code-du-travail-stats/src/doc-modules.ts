// Dérivation du "module" frontend d'un event à partir de son chemin de fichier.
// Sert à regrouper le plan de tracking par module/feature produit (cf.
// render-doc.ts). Fonction pure, testable sans IO.

const MODULES_SEGMENT = "src/modules/";
const FALLBACK_MODULE = "divers";

// Renvoie le premier segment de chemin après `src/modules/`. Si l'event vit dans
// un fichier à plat directement sous modules/ (ex: modules/glossary.tsx),
// l'extension est retirée. Tout chemin hors de src/modules/ retombe sur
// `divers`.
export function moduleOf(file: string): string {
  const idx = file.indexOf(MODULES_SEGMENT);
  if (idx === -1) return FALLBACK_MODULE;

  const rest = file.slice(idx + MODULES_SEGMENT.length);
  const first = rest.split("/")[0];
  if (!first) return FALLBACK_MODULE;

  return first.replace(/\.(ts|tsx)$/, "");
}
