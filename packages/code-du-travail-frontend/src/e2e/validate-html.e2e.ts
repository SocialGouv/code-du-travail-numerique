import { test } from "@playwright/test";
import { validateHtml } from "./helpers/html-validate";

const sampleUrls = [
  "/convention-collective/3248-metallurgie",
  "/contribution",
  "/contribution/les-conges-pour-evenements-familiaux",
  "/contribution/2614-les-conges-pour-evenements-familiaux",
  "/information/acquisition-de-conges-payes-pendant-un-arret-maladie-les-nouvelles-regles",
];

test.describe("Validation de l'html d'un échantillon de pages", () => {
  for (const url of sampleUrls) {
    test(`page should be valid: ${url}`, async ({ page }) => {
      await page.goto(url);
      await validateHtml(page);
    });
  }
});
