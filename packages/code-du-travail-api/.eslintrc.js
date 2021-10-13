module.exports = {
  extends: "@socialgouv/eslint-config-typescript",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/no-require-imports": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "@typescript-eslint/naming-convention": "warn",
    "@typescript-eslint/no-implicit-any-catch": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/restrict-plus-operands": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-shadow": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
  },
};
