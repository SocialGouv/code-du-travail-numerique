const nextJest = require("next/jest");

const createJestConfig = nextJest();

const esModules = ["@codegouvfr/react-dsfr"].join("|");

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
  testMatch: ["**/__tests__/**/*?(*.)+(test|spec).[jt]s?(x)"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/cypress/",
  ],
  testTimeout: 20000,
  moduleNameMapper: {
    "^@sentry/nextjs$": "<rootDir>/test/mockSentry.js",
  },
  preset: "ts-jest/presets/js-with-ts-esm",
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${esModules})/)`],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["ts-jest"],
  },
};

module.exports = createJestConfig(customJestConfig);
