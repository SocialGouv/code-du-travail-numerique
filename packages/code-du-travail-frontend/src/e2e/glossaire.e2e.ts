import { test, expect } from "@playwright/test";

test.describe("Glossaire", () => {
  test("should work correctly", async ({ page }) => {
    await page.goto("/glossaire");

    await expect(page.locator("body")).toContainText(
      "Les définitions de ce glossaire, disponibles en surbrillance dans les textes des réponses"
    );

    await page
      .getByRole("link", { name: "Arrêt de travail", exact: true })
      .click();

    await expect(page.locator("body")).toContainText("Définition");

    await page
      .locator("#fr-header-main-navigation")
      .getByRole("button", { name: "Code du travail" })
      .click();
    await page
      .locator("#fr-header-main-navigation")
      .getByRole("link", { name: "Glossaire" })
      .click();

    await expect(page.locator("body")).toContainText(
      "Les définitions de ce glossaire, disponibles en surbrillance dans les textes des réponses"
    );
  });
});
