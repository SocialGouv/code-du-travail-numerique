module.exports = {
  extends: [
    "@socialgouv/eslint-config-react",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  overrides: [
    {
      env: {
        jest: true,
      },
      files: ["test.js"],
    },
  ],
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "import/no-extraneous-dependencies": "error",
    "react/react-in-jsx-scope:": "off",
  },
};
