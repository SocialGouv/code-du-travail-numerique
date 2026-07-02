const path = require("path");
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

// html-react-parser@6 CJS lib exports Text/Element from domhandler.
// pnpm's symlink layout means multiple require("domhandler") paths can resolve
// to different symlinks (even though they point to the same real directory),
// creating separate module instances — breaking `instanceof Text` checks.
// Pin domhandler (and its dep domelementtype) to a single canonical real path
// so all requires share the same module instance.
// require.resolve("html-react-parser") follows the exports "require" condition → lib/index.js
const htmlReactParserDir = path.dirname(require.resolve("html-react-parser"));
const domhandlerPath = require.resolve("domhandler", {
  paths: [htmlReactParserDir],
});
const domelementtypePath = require.resolve("domelementtype", {
  paths: [path.dirname(domhandlerPath)],
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["**/__tests__/**/*?(*.)+(test|spec).[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  testTimeout: 20000,
  silent: true,
  moduleNameMapper: {
    // Redirect the DILA API client to a test stub at resolution time. Mocking it with
    // jest.mock() was flaky under the full parallel suite — the mock intermittently
    // failed to intercept and DilaApiClient.fetch made a real network call. A
    // moduleNameMapper redirect never loads the real module, so no network call is
    // possible (only the accords service imports it). See the stub for details.
    "^@socialgouv/dila-api-client$":
      "<rootDir>/src/api/modules/accords/__tests__/__mocks__/dila-api-client.ts",
    // html-react-parser@6 ships TypeScript source in src/ but jest resolves to it instead of lib/
    // Force CJS compiled output to avoid ESM/TS parse errors in node environment tests
    "^html-react-parser$":
      "<rootDir>/node_modules/html-react-parser/lib/index.js",
    // Pin domhandler and domelementtype to single canonical paths to prevent
    // pnpm symlink paths creating separate module instances (breaking instanceof)
    "^domhandler$": domhandlerPath,
    "^domelementtype$": domelementtypePath,
  },
};

module.exports = createJestConfig(customJestConfig);
