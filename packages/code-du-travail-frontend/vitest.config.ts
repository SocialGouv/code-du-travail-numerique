import { defineConfig, UserConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()] as UserConfig["plugins"],
  test: {
    include: ["./src/modules/**/__tests__/**/*.{js,jsx,ts,tsx}"],
    environment: "jsdom",
    globals: true,
  },
});
