import { test } from "@playwright/test";
import { validateHtml } from "./helpers/html-validate";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const urlsPath = path.resolve(__dirname, ".data/urls-to-validate.json");
const dynamicUrls: string[] = existsSync(urlsPath)
  ? JSON.parse(readFileSync(urlsPath, "utf-8"))
  : [
      "/convention-collective/3248-metallurgie",
      "/information/acquisition-de-conges-payes-pendant-un-arret-maladie-les-nouvelles-regles",
    ];

test.describe("Validation de l'html d'un échantillon de pages", () => {
  for (const url of dynamicUrls) {
    test(`page should be valid: ${url}`, async ({ page }) => {
      await page.goto(url);
      await validateHtml(page);
    });
  }
});
