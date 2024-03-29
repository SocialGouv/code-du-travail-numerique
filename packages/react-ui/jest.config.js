/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};
