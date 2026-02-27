import { defineConfig } from "cypress";
import dotenv from "dotenv";
import htmlvalidate from "cypress-html-validate/plugin";
import { downloadAllUrlsToValidate } from "./cypress/support/before";
import http from "http";
import fs from "fs";
import path from "path";

dotenv.config();

let staticServer = null;

const isCI = !!process.env.CI;

const specPatterns = {
  heavy: "cypress/integration/heavy/**/*.spec.{js,jsx,ts,tsx}",
  light: "cypress/integration/light/**/*.spec.{js,jsx,ts,tsx}",
  "html-validation":
    "cypress/integration/html-validation/**/*.spec.{js,jsx,ts,tsx}",
  "heavy-and-light":
    "cypress/integration/{light,heavy}/**/*.spec.{js,jsx,ts,tsx}",
};

module.exports = defineConfig({
  defaultCommandTimeout: 30000, // 30s
  pageLoadTimeout: 60000, // 60s
  responseTimeout: 30000, // 30s
  numTestsKeptInMemory: isCI ? 0 : 50,
  experimentalMemoryManagement: isCI,
  blockHosts: ["*.matomo.*"],
  e2e: {
    baseUrl: process.env.TEST_BASEURL ?? "http://localhost:3000",
    retries: { runMode: 3, openMode: 0 },
    specPattern:
      specPatterns[process.env.TEST_MODE] ??
      "cypress/integration/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/index.ts",
    viewportHeight: 1000,
    viewportWidth: 1280,
    chromeWebSecurity: false,
    watchForFileChanges: !isCI,
    setupNodeEvents(on) {
      htmlvalidate.install(on);
      on("before:run", async () => {
        if (process.env.TEST_MODE === "html-validation") {
          await downloadAllUrlsToValidate();
        }
      });

      // Task to start a static file server for widget tests
      on("task", {
        startStaticServer({ port, filePath }) {
          return new Promise((resolve, reject) => {
            if (staticServer) {
              resolve({ alreadyRunning: true });
              return;
            }

            staticServer = http.createServer((req, res) => {
              const absolutePath = path.resolve(filePath);

              fs.readFile(absolutePath, (err, data) => {
                if (err) {
                  res.writeHead(404);
                  res.end("File not found");
                  return;
                }
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
              });
            });

            staticServer.listen(port, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve({ started: true, port });
              }
            });
          });
        },

        stopStaticServer() {
          return new Promise((resolve) => {
            if (staticServer) {
              staticServer.close(() => {
                staticServer = null;
                resolve({ stopped: true });
              });
            } else {
              resolve({ alreadyStopped: true });
            }
          });
        },
      });
    },
  },
  video: false,
});
