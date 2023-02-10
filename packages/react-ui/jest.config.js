/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "@testing-library/jest-dom/extend-expect",
  ],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};
