import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.TEST_BASEURL ?? "http://localhost:3000",
    specPattern: "e2e/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "e2e/utils/index.ts",
    viewportHeight: 1000,
    viewportWidth: 1280,
    chromeWebSecurity: false,
  },
  video: false,
});
