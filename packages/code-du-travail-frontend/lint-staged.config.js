const path = require("path");

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((file) => `"${file}"`).join(" ")}`;

// Chemin absolu du catalogue d'events régénéré par cdtn-stats. lint-staged
// exécute les tâches depuis la racine du dépôt, donc un chemin relatif au
// package (`../code-du-travail-stats/...`) sort du dépôt et fait échouer le
// `git add`. On résout depuis __dirname pour être robuste au cwd.
const eventsCatalog = path.resolve(
  __dirname,
  "../code-du-travail-stats/events/events.extracted.json"
);

module.exports = {
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
  "*.{js,ts,tsx,jsx}": [
    // Exclut les tests ES (*.es.test.ts) et de scripts (*.script.test.ts) qui
    // nécessitent une vraie Elasticsearch — même exclusion que le script CI
    // `test:frontend`. `--findRelatedTests` doit rester en dernier pour que
    // lint-staged lui accole les fichiers stagés.
    "jest --bail --testPathIgnorePatterns='.*\\.es\\.test\\.ts$|.*\\.script\\.test\\.ts$' --findRelatedTests",
    buildEslintCommand,
  ],
  "*.{js,ts,tsx,jsx,json,md}": ["pnpm format"],
  // Régénère et re-stage le catalogue des events Matomo (JSON) dès qu'un module
  // change. Le plan de tracking métier (events/TRACKING_PLAN.md) n'est plus
  // généré par un algo : le régénérer via le skill Claude `/tracking-plan`.
  "src/modules/**/*.{ts,tsx}": () => [
    "pnpm -F @socialgouv/cdtn-stats events:extract",
    `git add "${eventsCatalog}"`,
  ],
};
