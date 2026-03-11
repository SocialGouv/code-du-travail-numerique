import type { FullConfig } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use?.baseURL as string | undefined;

  if (!baseURL) {
    throw new Error("Playwright baseURL is not defined");
  }

  const storageStatePath = path.resolve(__dirname, ".data/storage-state.json");

  await mkdir(path.dirname(storageStatePath), { recursive: true });

  const storageState = {
    cookies: [],
    origins: [
      {
        origin: new URL(baseURL).origin,
        localStorage: [
          {
            name: "cdtn-cookie-consent-given",
            value: "true",
          },
        ],
      },
    ],
  };

  await writeFile(storageStatePath, JSON.stringify(storageState, null, 2));
}
