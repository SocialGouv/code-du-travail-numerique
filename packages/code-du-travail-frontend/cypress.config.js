import { defineConfig } from "cypress";
import dotenv from "dotenv";
import htmlvalidate from "cypress-html-validate/plugin";
import { downloadAllUrlsToValidate } from "./cypress/support/before";

dotenv.config();

module.exports = defineConfig({
  defaultCommandTimeout: 10000, // 10s
  e2e: {
    baseUrl: process.env.TEST_BASEURL ?? "http://localhost:3000",
    specPattern: process.env.ALL_TEST
      ? "cypress/integration/**/*.spec.{js,jsx,ts,tsx}"
      : "cypress/integration/light/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/index.ts",
    viewportHeight: 1000,
    viewportWidth: 1280,
    chromeWebSecurity: false,
    setupNodeEvents(on) {
      htmlvalidate.install(on);
      on("before:run", () => {
        downloadAllUrlsToValidate();
      });
    },
  },
  video: false,
});
