// Configuration lue à l'exécution (et non au build) : l'image Docker est la
// même pour tous les environnements.
//
// POURQUOI CE MÉCANISME
// ---------------------
// Next.js ne propose qu'un seul moyen d'exposer une variable au navigateur :
// le préfixe `NEXT_PUBLIC_`. Sa valeur est remplacée littéralement dans le code
// (serveur ET bundles navigateur) pendant `next build`. Changer la variable
// ensuite, au démarrage du conteneur, n'a aucun effet : il faudrait un build
// par environnement. Cela contredit le principe « une image, plusieurs
// environnements » (le nouvel hébergement n'autorise pas de variables au build).
//
// Vérifié dans la doc de Next.js 16.4 (guides `environment-variables`,
// `self-hosting` et `upgrading/version-16`) :
// - `NEXT_PUBLIC_*` est « inlined into the JavaScript bundle during next build » ;
// - `publicRuntimeConfig` / `serverRuntimeConfig` ont été supprimés en 16 ;
// - la lecture de `process.env` au runtime est supportée côté serveur, à
//   condition que le rendu soit dynamique (`connection()`, `headers()`,
//   `cookies()`...) ;
// - rien n'est prévu pour transmettre ces valeurs au navigateur : c'est à
//   l'application de le faire. C'est le rôle de ce fichier.
//
// Les librairies `next-runtime-env` et `@beam-australia/react-env` font la même
// chose ; nous gardons une implémentation interne (quelques lignes, sans
// dépendance, avec gestion du nonce CSP du <script>).
//
// FONCTIONNEMENT
// --------------
// - Variables sans préfixe `NEXT_PUBLIC_` : Next.js ne les remplace pas au
//   build, elles restent lues dans `process.env` à l'exécution.
// - Côté serveur : `getRuntimeEnv` lit `process.env` (valeur du conteneur).
// - Côté navigateur : `getRuntimeEnv` lit `window.__ENV`. Le layout racine
//   (`RuntimeEnvScript`, via `DefaultLayout`) insère en premier dans le <head>
//   un `<script nonce>` construit par `getClientEnvScript`, donc évalué avant
//   les bundles : les constantes de `config.ts`, Sentry (instrumentation
//   client) et Matomo trouvent déjà la configuration à l'initialisation.
// - Seules les clés de `CLIENT_ENV_KEYS` sont envoyées au navigateur (liste
//   blanche). Les autres (`ES_INDEX_PREFIX`, `IS_PRODUCTION_DEPLOYMENT`,
//   `BRANCH_NAME_SLUG`, secrets...) restent strictement côté serveur.
//
// PRÉREQUIS ET LIMITES
// --------------------
// - Les pages doivent rester rendues dynamiquement. C'est le cas tant que le
//   layout racine lit `headers()` (nonce CSP). Une page rendue statiquement au
//   build figerait les valeurs de l'environnement du build.
// - Le code exécuté dans le navigateur doit passer par `getRuntimeEnv`.
//   Lire `process.env.XXX` directement donne `undefined` côté navigateur.
// - Ne pas réintroduire de préfixe `NEXT_PUBLIC_` pour ces variables.
// - Pour ajouter une variable lue aussi par le navigateur : l'ajouter à
//   `CLIENT_ENV_KEYS`, la définir dans les `www.configmap.yaml` de chaque
//   environnement (.kontinuous/env/*/templates/), puis l'utiliser via
//   `getRuntimeEnv`. Pour une variable serveur seule : l'ajouter à
//   `RuntimeEnvKey` et à la configmap.
// - Ce qui dépend de l'environnement mais ne passe pas par le code (robots.txt,
//   widget.js, en-tête X-Robots-Tag) est généré à la requête (`app/robots.ts`,
//   `app/widget.js/route.ts`, `proxy.ts`), car les fichiers figés au build ou
//   les `headers()` de `next.config` ne peuvent pas varier selon l'environnement.
//
// Les seules valeurs propres à l'image (et non à l'environnement) restent
// fixées au build : `NEXT_PUBLIC_COMMIT` et `SENTRY_RELEASE`.

export const CLIENT_ENV_KEYS = [
  "SITE_URL",
  "BUCKET_URL",
  "BUCKET_FOLDER",
  "BUCKET_SITEMAP_FOLDER",
  "PIWIK_SITE_ID",
  "PIWIK_URL",
  "SENTRY_DSN",
  "SENTRY_ENV",
  "CDTN_ENV",
] as const;

export type ClientEnvKey = (typeof CLIENT_ENV_KEYS)[number];
export type RuntimeEnvKey =
  | ClientEnvKey
  | "IS_PRODUCTION_DEPLOYMENT"
  | "ES_INDEX_PREFIX"
  | "BRANCH_NAME_SLUG";
export type ClientEnv = Partial<Record<ClientEnvKey, string>>;

declare global {
  interface Window {
    __ENV?: ClientEnv;
  }
}

export const getRuntimeEnv = (key: RuntimeEnvKey): string | undefined => {
  if (typeof window !== "undefined") {
    return window.__ENV?.[key as ClientEnvKey];
  }
  return process.env[key] || undefined;
};

/**
 * Script inline (contenu) exposant les variables utiles au navigateur.
 * Les caractères pouvant fermer la balise <script> sont échappés.
 */
export const getClientEnvScript = (): string => {
  const clientEnv: ClientEnv = {};
  for (const key of CLIENT_ENV_KEYS) {
    const value = process.env[key];
    if (value) clientEnv[key] = value;
  }
  const json = JSON.stringify(clientEnv)
    .replace(/</g, "\\u003c")
    .replace(new RegExp("\\u2028", "g"), "\\u2028")
    .replace(new RegExp("\\u2029", "g"), "\\u2029");
  return `window.__ENV=${json};`;
};
