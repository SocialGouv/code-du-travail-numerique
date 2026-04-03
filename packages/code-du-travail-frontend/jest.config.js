const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["**/__tests__/**/*?(*.)+(test|spec).[jt]s?(x)"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
  ],
  // Some deps (uuid@13, @codegouvfr/react-dsfr) ship ESM which Jest (CJS) won’t parse from
  // node_modules unless transformed by Next/Jest.
  // With pnpm the physical path is typically:
  // - node_modules/.pnpm/uuid@.../node_modules/uuid/...
  // - node_modules/.pnpm/@codegouvfr+react-dsfr@.../node_modules/@codegouvfr/react-dsfr/...
  transformIgnorePatterns: [
    "/node_modules/(?!(\\.pnpm\\/(uuid@[^/]+|@codegouvfr\\+react-dsfr@[^/]+)|@codegouvfr\\/react-dsfr)/)",
  ],
  testTimeout: 20000,
  silent: true,
};

module.exports = createJestConfig(customJestConfig);
