// CommonJS (.cjs) car le package est en "type": "module". @swc/jest transpile
// les sources/tests TS ESM vers CommonJS pour l'exécution par jest.
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    // Couche IO/CLI (import.meta, fs, process.argv) : non testée unitairement.
    "!src/project.ts",
    "!src/extract-events.ts",
    "!src/check-events.ts",
    "!src/events.schema.ts",
  ],
};
