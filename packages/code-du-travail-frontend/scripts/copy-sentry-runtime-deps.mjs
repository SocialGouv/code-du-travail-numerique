/**
 * Sentry v11 + Turbopack : au build, Sentry matérialise son module d'injection
 * runtime dans `.next/node_modules/@sentry/server-runtime-injection-<hash>` sous
 * forme de symlink relatif vers le store pnpm (valide depuis le workspace de
 * build). Ce symlink ne survit pas à la création de l'image :
 * `pnpm deploy` puis `COPY` déplacent `.next` plus haut dans l'arborescence (le
 * lien relatif devient pendant) et busybox `cp -r` du conteneur d'init le
 * recopie tel quel. Résultat : le module est introuvable au démarrage et le
 * pod crashloop (« Cannot find module
 * '@sentry/server-runtime-injection-<hash>/register' »).
 *
 * Ce script remplace le symlink par une copie réelle du package et y ajoute
 * ses dépendances `@sentry/*` en fichiers réels, pour que tout reste résoluble
 * dans l'image, quel que soit l'endroit où `.next` est déplacé ou recopié.
 *
 * À exécuter après `next build`, avant la création de l'image (cf. Dockerfile).
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const frontend = path.resolve(import.meta.dirname, "..");
// Usage optionnel : node copy-sentry-runtime-deps.mjs <dossier-du-frontend>
// (par défaut : le frontend du workspace, cf. Dockerfile).
const target = process.argv[2] ? path.resolve(process.argv[2]) : frontend;
const sentryDir = path.join(target, ".next/node_modules/@sentry");

if (!fs.existsSync(sentryDir)) {
  console.log(
    "[sentry-runtime-deps] no .next/node_modules/@sentry — nothing to do"
  );
  process.exit(0);
}

const requireFromSentry = createRequire(
  path.join(
    fs.realpathSync(path.join(frontend, "node_modules/@sentry/nextjs")),
    "package.json"
  )
);

function packageDir(name) {
  let resolved;
  try {
    resolved = requireFromSentry.resolve(`@sentry/${name}/package.json`);
  } catch {
    resolved = requireFromSentry.resolve(`@sentry/${name}`);
  }
  let dir = path.dirname(resolved);
  while (!fs.existsSync(path.join(dir, "package.json"))) {
    dir = path.dirname(dir);
  }
  return dir;
}

/**
 * Résout le répertoire réel du module aliasé. Le symlink peut être pendant
 * (copié tel quel vers un endroit où sa cible relative n'existe plus) : on
 * retombe alors sur le package réel via son nom déduit de la cible du lien.
 */
function resolveAliasSource(aliasPath) {
  if (fs.existsSync(aliasPath)) {
    return fs.realpathSync(aliasPath);
  }
  const link = fs.readlinkSync(aliasPath);
  const match = link.match(/\/@sentry\/([a-z0-9-]+)\/?$/);
  if (match) {
    return packageDir(match[1]);
  }
  throw new Error(
    `[sentry-runtime-deps] dangling symlink ${aliasPath} -> ${link} (unknown package)`
  );
}

function copyWithSentryDeps(name, dest) {
  if (fs.existsSync(path.join(dest, name))) return;
  const src = packageDir(name);
  const pkg = JSON.parse(
    fs.readFileSync(path.join(src, "package.json"), "utf8")
  );
  for (const dep of Object.keys(pkg.dependencies ?? {})) {
    if (dep.startsWith("@sentry/")) {
      copyWithSentryDeps(dep.slice("@sentry/".length), dest);
    }
  }
  fs.cpSync(src, path.join(dest, name), { recursive: true });
  console.log(`[sentry-runtime-deps] copied @sentry/${name}`);
}

for (const alias of fs.readdirSync(sentryDir)) {
  const aliasPath = path.join(sentryDir, alias);
  const aliasPkgPath = path.join(aliasPath, "package.json");

  // Sentry crée un symlink ; on le remplace par une copie réelle du package.
  if (fs.lstatSync(aliasPath).isSymbolicLink()) {
    const realPath = resolveAliasSource(aliasPath);
    fs.rmSync(aliasPath);
    fs.cpSync(realPath, aliasPath, {
      recursive: true,
      verbatimSymlinks: false,
    });
    console.log(`[sentry-runtime-deps] materialized ${alias}`);
  }

  if (!fs.existsSync(aliasPkgPath)) continue;
  const aliasPkg = JSON.parse(fs.readFileSync(aliasPkgPath, "utf8"));
  const dest = path.join(aliasPath, "node_modules/@sentry");
  for (const dep of Object.keys(aliasPkg.dependencies ?? {})) {
    if (dep.startsWith("@sentry/")) {
      copyWithSentryDeps(dep.slice("@sentry/".length), dest);
    }
  }
}
