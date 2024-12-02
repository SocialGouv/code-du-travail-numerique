import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["scripts", "!scripts/**/__tests__/**", "!scripts/**/*.test.*"],
});
