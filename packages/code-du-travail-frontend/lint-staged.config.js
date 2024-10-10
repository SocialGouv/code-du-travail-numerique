const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((file) => file.split(process.cwd())[1]).join(" --file ")}`;

module.exports = {
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
  "*.{js,ts,tsx,jsx}": ["jest --bail --findRelatedTests"],
  "*.{js,ts,tsx,jsx}": [buildEslintCommand],
  "{pages,src}/**/*.{js,ts,tsx,jsx}": ["yarn lint:css"],
  "*.{js,ts,tsx,jsx,json,md}": ["yarn format"],
};
