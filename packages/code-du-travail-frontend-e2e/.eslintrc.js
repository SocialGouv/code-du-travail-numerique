module.exports = {
  plugins: ["cypress"],
  extends: [
    "@socialgouv/eslint-config-typescript",
    "plugin:cypress/recommended",
  ],
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "jest/valid-expect": "off",
    "@typescript-eslint/restrict-plus-operands": "warn",
  },
  env: {
    "cypress/globals": true,
  },
};
