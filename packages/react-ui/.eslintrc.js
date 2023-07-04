module.exports = {
  extends: ["@socialgouv/eslint-config-react"],
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
    "import/no-unresolved": "off",
    "react/react-in-jsx-scope:": "off",
  },
};
