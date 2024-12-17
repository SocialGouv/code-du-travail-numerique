import { defineConfig } from "cypress";
import dotenv from "dotenv";
import htmlvalidate from "cypress-html-validate/plugin";
import { downloadAllUrlsToValidate } from "./cypress/support/before";

dotenv.config();

module.exports = defineConfig({
  defaultCommandTimeout: 20000, // 20s
  e2e: {
    baseUrl: process.env.TEST_BASEURL ?? "http://localhost:3000",
    specPattern:
      process.env.TEST_MODE === "heavy"
        ? "cypress/integration/heavy/**/*.spec.{js,jsx,ts,tsx}"
        : process.env.TEST_MODE === "light"
          ? "cypress/integration/html-validation/**/*.spec.{js,jsx,ts,tsx}"
          : process.env.TEST_MODE === "html-validation"
            ? "cypress/integration/html-validation/**/*.spec.{js,jsx,ts,tsx}"
            : process.env.TEST_MODE === "heavy-and-light"
              ? "cypress/integration/{light,heavy}/**/*.spec.{js,jsx,ts,tsx}"
              : "cypress/integration/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/index.ts",
    viewportHeight: 1000,
    viewportWidth: 1280,
    chromeWebSecurity: false,
    setupNodeEvents(on) {
      htmlvalidate.install(on);
      on("before:run", async () => {
        if (process.env.TEST_MODE === "html-validation") {
          await downloadAllUrlsToValidate();
        }
      });
    },
  },
  video: false,
});
