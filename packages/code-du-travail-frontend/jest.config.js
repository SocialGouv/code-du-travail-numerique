const nextJest = require("next/jest");

const createJestConfig = nextJest();

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
  testMatch: ["**/__tests__/**/*?(*.)+(test|spec).[jt]s?(x)"],
  collectCoverageFrom: ["!src/**/*mock.js", "src/**/*.js"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/cypress/",
  ],
  testTimeout: 20000,
  maxWorkers: "80%",
};

module.exports = createJestConfig(customJestConfig);
