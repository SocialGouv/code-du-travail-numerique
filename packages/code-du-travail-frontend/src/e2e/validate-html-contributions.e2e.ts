import { test } from "@playwright/test";
import { validateHtml } from "./helpers/html-validate";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const urlsPath = path.resolve(
  __dirname,
  ".data/urls-contributions-to-validate.json"
);
const contributionUrls: string[] = existsSync(urlsPath)
  ? JSON.parse(readFileSync(urlsPath, "utf-8"))
  : [
      "/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd",
      "/contribution/la-periode-dessai-peut-elle-etre-renouvelee",
      "/contribution/les-conges-pour-evenements-familiaux",
      "/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
      "/contribution/675-la-periode-dessai-peut-elle-etre-renouvelee",
    ];

test.describe("Validate html for contributions", () => {
  for (const url of contributionUrls) {
    test(`page should be valid: ${url}`, async ({ page }) => {
      await page.goto(url);
      await validateHtml(page);
    });
  }
});
