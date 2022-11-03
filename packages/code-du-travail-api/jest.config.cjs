/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  transformIgnorePatterns: [],
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "<rootDir>/src/tests/ignored",
  ],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFiles: ["<rootDir>/src/tests/process.env.mock.js"],
  collectCoverageFrom: ["src/**/*.js"],
  modulePathIgnorePatterns: ["__mocking__"],
};
