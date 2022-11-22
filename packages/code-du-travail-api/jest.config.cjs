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
    "/build/",
    "<rootDir>/src/routes/__tests__/ignored",
  ],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFiles: ["<rootDir>/src/routes/__tests__/process.env.mock.js"],
  collectCoverageFrom: ["src/**/*.js"],
  modulePathIgnorePatterns: ["__mocking__"],
};
