import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.TEST_BASEURL ?? "http://localhost:3000";
const isRemote = true;

export default defineConfig({
  globalSetup: "./src/e2e/global-setup.ts",
  testDir: "./src/e2e",
  testMatch: "**/*.e2e.{ts,tsx}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [
        ["github"],
        ["html", { outputFolder: "playwright-report", open: "never" }],
      ]
    : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    storageState: "./src/e2e/.data/storage-state.json",
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
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
