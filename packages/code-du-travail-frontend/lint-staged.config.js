const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((file) => file.split(process.cwd())[1]).join(" --file ")}`;

module.exports = {
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
  "*.{js,ts,tsx,jsx}": ["jest --bail --findRelatedTests"],
  "*.{js,ts,tsx,jsx}": [buildEslintCommand],
  "*.{js,ts,tsx,jsx,json,md}": ["pnpm format"],
  // Régénère et re-stage la liste des events Matomo (JSON) puis le plan de
  // tracking lisible par le métier (markdown) dès qu'un module change.
  "src/modules/**/*.{ts,tsx}": () =>
    "pnpm -F @socialgouv/cdtn-stats events:extract && pnpm -F @socialgouv/cdtn-stats doc:generate && git add ../code-du-travail-stats/events/events.extracted.json ../code-du-travail-stats/events/TRACKING_PLAN.md",
};
