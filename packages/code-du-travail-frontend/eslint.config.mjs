import { defineConfig, globalIgnores } from "eslint/config";
import cypress from "eslint-plugin-cypress";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import gitignore from "eslint-config-flat-gitignore";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  // Importe le gitignore pour ne pas avoir à dupliquer l'information
  gitignore(),
  {
    plugins: {
      cypress,
    },

    extends: compat.extends("next/core-web-vitals"),

    languageOptions: {
      sourceType: "module",
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["tsconfig.json", "cypress/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["cypress/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: {
        ...(cypress.environments && cypress.environments.globals
          ? cypress.environments.globals
          : {}),
      },
    },
    rules: {
      ...(cypress.configs && cypress.configs.recommended
        ? cypress.configs.recommended.rules
        : {}),
      "cypress/unsafe-to-chain-command": "off",
    },
  },
  globalIgnores(["**/cypress.config.js"]),
]);
