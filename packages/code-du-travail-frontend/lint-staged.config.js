// `next lint` a été supprimé dans Next 16 ; on invoque directement ESLint
// (flat config `eslint.config.mjs`), comme le script `lint` du package. Les
// chemins absolus fournis par lint-staged sont passés tels quels à ESLint.
const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((file) => `"${file}"`).join(" ")}`;

module.exports = {
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
  // `--passWithNoTests` : `--findRelatedTests` sort en erreur (code 1) quand un
  // fichier staged n'a aucun test associé (ex. un fichier de config) — ce qui
  // ferait échouer le commit à tort.
  // `--testPathIgnorePatterns` : exclut les tests `*.es.test.ts` / `*.script.test.ts`
  // (comme le script `test:frontend`), qui exigent un vrai Elasticsearch et
  // échouent donc en local — sans ça, `--findRelatedTests` peut les embarquer.
  "*.{js,ts,tsx,jsx}": [
    "jest --bail --passWithNoTests --testPathIgnorePatterns='.*\\.es\\.test\\.ts$|.*\\.script\\.test\\.ts$' --findRelatedTests",
    buildEslintCommand,
  ],
  "*.{js,ts,tsx,jsx,json,md}": ["pnpm format"],
  // Régénère et re-stage le catalogue des events Matomo (JSON) dès qu'un module
  // change. Le plan de tracking métier (events/TRACKING_PLAN.md) n'est plus
  // généré par un algo : le régénérer via le skill Claude `/tracking-plan`.
  "src/modules/**/*.{ts,tsx}": () =>
    "pnpm -F @socialgouv/cdtn-stats events:extract && git add ../code-du-travail-stats/events/events.extracted.json",
};
