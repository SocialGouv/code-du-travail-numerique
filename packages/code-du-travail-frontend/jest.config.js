const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
  testMatch: ["**/__tests__/**/*?(*.)+(test|spec).[jt]s?(x)"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/cypress/",
  ],
  testTimeout: 10000,
  moduleNameMapper: {
    "^@sentry/nextjs$": "<rootDir>/test/mockSentry.js",
  },
};

module.exports = createJestConfig(customJestConfig);
