module.exports = {
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: [
    "./src/__test__/common/publicode-matcher.ts",
    "./jest.setup.ts",
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "@swc/jest",
  },
};
