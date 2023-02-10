module.exports = {
  extends: "@socialgouv/eslint-config-typescript",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/naming-convention": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-namespace": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/no-invalid-this": "off",
    "@typescript-eslint/no-import-type-side-effects": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
  },
};
