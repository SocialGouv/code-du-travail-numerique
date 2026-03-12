import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.TEST_BASEURL ?? "http://localhost:3000";
const isRemote = true;

export default defineConfig({
  testDir: "./src/e2e",
  testMatch: "**/rgaa-audit.spec.ts",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [["json", { outputFile: "rgaa-results.json" }], ["list"]],
  timeout: 60_000,
  use: {
    baseURL,
    trace: "off",
    actionTimeout: 15_000,
  },
  projects: [
    {
      name: "rgaa-audit",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  ...(isRemote
    ? {}
    : {
        webServer: {
          command: "pnpm dev",
          url: baseURL,
          reuseExistingServer: true,
          timeout: 120_000,
        },
      }),
});
