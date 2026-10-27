/**
 * Sentry v11 + Turbopack : au build, Sentry matérialise son module d'injection
 * runtime dans `.next/node_modules/@sentry/server-runtime-injection-<hash>` (un
 * symlink vers le store pnpm). Lors de la création de l'image Docker, `COPY`
 * déréférence ce symlink en fichiers réels : les dépendances `@sentry/*` du
 * module ne sont alors plus résolvables depuis son emplacement et le serveur
 * crashe au démarrage (« Cannot find module '@sentry/core' », pod 0/1 ready).
 *
 * Ce script copie ces dépendances en fichiers réels dans le `node_modules` du
 * module aliasé, pour qu'elles restent résolubles après `pnpm deploy --prod`.
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
  const aliasPkgPath = path.join(sentryDir, alias, "package.json");
  if (!fs.existsSync(aliasPkgPath)) continue;
  const aliasPkg = JSON.parse(fs.readFileSync(aliasPkgPath, "utf8"));
  const dest = path.join(sentryDir, alias, "node_modules/@sentry");
  for (const dep of Object.keys(aliasPkg.dependencies ?? {})) {
    if (dep.startsWith("@sentry/")) {
      copyWithSentryDeps(dep.slice("@sentry/".length), dest);
    }
  }
}
