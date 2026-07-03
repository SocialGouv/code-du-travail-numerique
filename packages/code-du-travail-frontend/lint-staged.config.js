const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((file) => file.split(process.cwd())[1]).join(" --file ")}`;

module.exports = {
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
  "*.{js,ts,tsx,jsx}": ["jest --bail --findRelatedTests", buildEslintCommand],
  "*.{js,ts,tsx,jsx,json,md}": ["pnpm format"],
  // Régénère et re-stage le catalogue des events Matomo (JSON) dès qu'un module
  // change. Le plan de tracking métier (events/TRACKING_PLAN.md) n'est plus
  // généré par un algo : le régénérer via le skill Claude `/tracking-plan`.
  "src/modules/**/*.{ts,tsx}": () =>
    "pnpm -F @socialgouv/cdtn-stats events:extract && git add ../code-du-travail-stats/events/events.extracted.json",
};
