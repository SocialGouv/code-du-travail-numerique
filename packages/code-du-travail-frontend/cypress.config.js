import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

module.exports = defineConfig({
  defaultCommandTimeout: 10000, // 10s
  e2e: {
    baseUrl: process.env.TEST_BASEURL ?? "http://localhost:3000",
    specPattern: "cypress/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/index.ts",
    viewportHeight: 1000,
    viewportWidth: 1280,
    chromeWebSecurity: false,
  },
  video: false,
});
