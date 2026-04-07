import { test, expect } from "@playwright/test";

test.describe("Pages Politique confidentialité", () => {
  test("je vois une page info classique", async ({ page }) => {
    await page.goto("/politique-confidentialite");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Politique de confidentialité"
    );
    await expect(page.locator("body")).toContainText(
      "Le Code du travail numérique ne vous demande ni ne stocke d'information à caractère personnel."
    );
  });
});
