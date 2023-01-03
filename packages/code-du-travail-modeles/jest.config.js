module.exports = {
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  testTimeout: 10000,
  transform: {
    "^.+\\.(ts|tsx)$": "@swc/jest",
  },
};
