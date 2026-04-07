import { test, expect } from "@playwright/test";
import {
  expectCanonicalUrlEqual,
  expectIndexable,
  expectTitleAndMetaDescriptionEqual,
} from "./helpers";

test.describe("Pages quoi de neuf", () => {
  test("je vois une page classique", async ({ page }) => {
    await page.goto("/quoi-de-neuf");
    await expectIndexable(page);
    await expectCanonicalUrlEqual(page, "/quoi-de-neuf");
    await expectTitleAndMetaDescriptionEqual(
      page,
      "Quoi de neuf - Code du travail numérique",
      "Consultez les dernières évolutions et mises à jour du Code du travail numérique."
    );

    const h1Text = await page.getByRole("heading", { level: 1 }).innerText();
    const normalized = h1Text.replace(/\u00A0/g, " ");
    expect(normalized).toBe("Quoi de neuf sur le Code du travail numérique ?");
  });
});
