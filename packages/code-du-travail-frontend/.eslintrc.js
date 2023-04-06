module.exports = {
  plugins: ["cypress"],
  extends: ["next/core-web-vitals", "plugin:cypress/recommended"],
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  env: {
    "cypress/globals": true,
  },
};
