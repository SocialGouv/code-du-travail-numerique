import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASEURL || "http://localhost:3000",
    specPattern: "e2e/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "support.ts",
    viewportHeight: 1000,
    viewportWidth: 1280,
  },
});
