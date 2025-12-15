import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const TS_ESLINT_RULES_TO_DOWNGRADE_TO_WARN = {
  "@typescript-eslint/no-explicit-any": "warn",
  "@typescript-eslint/ban-ts-comment": "warn",
  "@typescript-eslint/no-namespace": "warn",
  "@typescript-eslint/no-require-imports": "warn",
  "@typescript-eslint/no-extra-non-null-assertion": "warn",
  "@typescript-eslint/no-empty-object-type": "warn",
};

const REACT_HOOKS_RULES_TO_DOWNGRADE_TO_WARN = {
  "react-hooks/refs": "warn",
  "react-hooks/use-memo": "warn",
  "react-hooks/set-state-in-effect": "warn",
  "react-hooks/static-components": "warn",
  "react-hooks/purity": "warn",
  "react-hooks/preserve-manual-memoization": "warn",
  "react-hooks/immutability": "warn",
};

const CORE_RULES_TO_DOWNGRADE_TO_WARN = {
  "prefer-const": "warn",
  "prefer-rest-params": "warn",
  "no-var": "warn",
};

const tsEslintPlugin = [...nextVitals, ...nextTs].find(
  (cfg) =>
    cfg &&
    typeof cfg === "object" &&
    cfg.plugins &&
    cfg.plugins["@typescript-eslint"]
)?.plugins["@typescript-eslint"];

const reactHooksPlugin = [...nextVitals, ...nextTs].find(
  (cfg) =>
    cfg && typeof cfg === "object" && cfg.plugins && cfg.plugins["react-hooks"]
)?.plugins["react-hooks"];

const pluginsForOverrides = {
  ...(tsEslintPlugin ? { "@typescript-eslint": tsEslintPlugin } : {}),
  ...(reactHooksPlugin ? { "react-hooks": reactHooksPlugin } : {}),
};

const rulesToDowngradeToWarn = {
  ...CORE_RULES_TO_DOWNGRADE_TO_WARN,
  ...(tsEslintPlugin ? TS_ESLINT_RULES_TO_DOWNGRADE_TO_WARN : {}),
  ...(reactHooksPlugin ? REACT_HOOKS_RULES_TO_DOWNGRADE_TO_WARN : {}),
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    plugins: pluginsForOverrides,
    rules: rulesToDowngradeToWarn,
  },
]);

export default eslintConfig;
