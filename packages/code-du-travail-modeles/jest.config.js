module.exports = {
  globals: {
    engine: null,
  },
  globalSetup: "./setup-jest.ts",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "@swc/jest",
  },
};
