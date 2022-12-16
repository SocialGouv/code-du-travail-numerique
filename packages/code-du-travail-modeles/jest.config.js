module.exports = {
  globalSetup: "<rootDir>/src/setup-jest.ts",
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "@swc/jest",
  },
};
