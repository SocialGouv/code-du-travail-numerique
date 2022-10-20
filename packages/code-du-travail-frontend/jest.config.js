const nextJest = require("next/jest");

const createJestConfig = nextJest();

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  // setupFiles: ["@testing-library/react/dont-cleanup-after-each"],
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
  testMatch: ["**/__tests__/**/*?(*.)+(test|spec).[jt]s?(x)"],
  collectCoverageFrom: ["!src/**/*mock.js", "src/**/*.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};

module.exports = createJestConfig(customJestConfig);
