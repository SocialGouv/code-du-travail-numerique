import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.TEST_BASEURL ?? "http://localhost:3000";
const isRemote = !!process.env.CI || !!process.env.TEST_BASEURL;

export default defineConfig({
  globalSetup: "./src/e2e/global-setup.ts",
  testDir: "./src/e2e",
  testMatch: "**/*.e2e.{ts,tsx}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000,
  reporter: process.env.CI
    ? [
        ["github"],
        ["html", { outputFolder: "playwright-report", open: "never" }],
      ]
    : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    actionTimeout: 15_000,
    ignoreHTTPSErrors: true,
    storageState: "./src/e2e/.data/storage-state.json",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: /validate-html.*\.e2e\.|widgets\.e2e\./,
    },
    {
      name: "html-validation",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /validate-html.*\.e2e\./,
    },
    {
      name: "widgets",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /widgets\.e2e\./,
    },
  ],
  ...(isRemote
    ? {}
    : {
        webServer: {
          command: "pnpm start",
          url: baseURL,
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
        },
      }),
});
