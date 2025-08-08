const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transformation pour TypeScript (assurez-vous que ts-jest est installé)
  },
  moduleNameMapper: {
    // Mock pour tous les fichiers de polices et assets binaires
    "\\.(woff|woff2|ttf|eot|otf|svg|png|jpg|jpeg|gif)$":
      "<rootDir>/__mocks__/fileMock.js",
    // Optionnel : mock pour les styles si vous en avez
    "\\.(css|scss|less)$": "<rootDir>/__mocks__/styleMock.js",
    "^@sentry/nextjs$": "<rootDir>/test/mockSentry.js",
  },
  transformIgnorePatterns: [
    // Permet de transformer les modules JS/TS dans @codegouvfr/react-dsfr (pour gérer l'ES moderne et imports)
    "/node_modules/(?!@codegouvfr/react-dsfr)",
  ],
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
  testMatch: ["**/__tests__/**/*?(*.)+(test|spec).[jt]s?(x)"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/cypress/",
  ],
  testTimeout: 20000,
};

module.exports = createJestConfig(customJestConfig);
