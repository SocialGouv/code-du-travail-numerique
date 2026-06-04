// Couche IO/configuration : chemins, patterns de glob et chargement des fichiers
// source dans un projet ts-morph. SEUL module à dépendre de `import.meta` / `fs`,
// pour que le reste du pipeline reste testable sans toucher au disque.

import { Project, ts } from "ts-morph";
import type { SourceFile } from "ts-morph";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATS_DIR = path.resolve(__dirname, "..");
export const REPO_ROOT = path.resolve(STATS_DIR, "..", "..");
export const FRONTEND_SRC = path.resolve(
  REPO_ROOT,
  "packages/code-du-travail-frontend/src"
);
export const OUTPUT_PATH = path.join(
  STATS_DIR,
  "events",
  "events.extracted.json"
);

// On scanne TOUT src/modules/**/*.{ts,tsx} (hors tests) : sendEvent peut être
// appelé depuis n'importe quel module (stores zustand, composants inline...),
// pas seulement dans les fichiers `tracking.ts`.
const GLOB_PATTERNS = [
  path.join(FRONTEND_SRC, "modules/**/*.ts"),
  path.join(FRONTEND_SRC, "modules/**/*.tsx"),
  `!${path.join(FRONTEND_SRC, "modules/**/__tests__/**")}`,
  `!${path.join(FRONTEND_SRC, "modules/**/*.test.ts")}`,
  `!${path.join(FRONTEND_SRC, "modules/**/*.test.tsx")}`,
  `!${path.join(FRONTEND_SRC, "modules/**/*.spec.ts")}`,
  `!${path.join(FRONTEND_SRC, "modules/**/*.spec.tsx")}`,
  `!${path.join(FRONTEND_SRC, "modules/**/*.stories.ts")}`,
  `!${path.join(FRONTEND_SRC, "modules/**/*.stories.tsx")}`,
];

// Enums externes référencés par le tracking (ex: PublicodesSimulator de
// @socialgouv/modeles-social) — chargés UNIQUEMENT pour résoudre des valeurs,
// pas scannés pour des events.
const MODELES_ENUM_GLOB = path.join(
  REPO_ROOT,
  "packages/code-du-travail-modeles/src/publicodes/**/*.ts"
);

export function createProject(): Project {
  return new Project({
    compilerOptions: {
      allowJs: false,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      esModuleInterop: true,
      skipLibCheck: true,
    },
    skipFileDependencyResolution: true,
    skipAddingFilesFromTsConfig: true,
  });
}

// Charge les fichiers frontend à scanner pour les events. Lève si aucun fichier
// n'est trouvé (glob ou chemin cassé). Renvoie ce sous-ensemble (frontend seul).
export function loadEventSourceFiles(project: Project): SourceFile[] {
  for (const pattern of GLOB_PATTERNS) {
    project.addSourceFilesAtPaths(pattern);
  }
  const eventFiles = project.getSourceFiles();
  if (eventFiles.length === 0) {
    throw new Error(
      "[extract-events] Aucun fichier trouvé. Vérifier les patterns de glob et FRONTEND_SRC."
    );
  }
  return eventFiles;
}

// Ajoute les enums de modeles-social au projet (pour résolution de valeurs) et
// renvoie TOUS les fichiers (frontend + enums) servant à l'index des enums.
export function loadModelesEnumFiles(project: Project): SourceFile[] {
  project.addSourceFilesAtPaths(MODELES_ENUM_GLOB);
  return project.getSourceFiles();
}
