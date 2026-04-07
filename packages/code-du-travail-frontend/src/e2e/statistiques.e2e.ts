import { test, expect } from "@playwright/test";

test.describe("Statistiques", () => {
  test("should display the page correctly", async ({ page }) => {
    await page.goto("/stats");

    await expect(
      page.getByText(/Statistiques d.utilisation/).first()
    ).toBeVisible();
    await expect(page.locator("body")).toContainText("Contenus référencés");
    await expect(page.locator("body")).toContainText("Recherches");
    await expect(page.locator("body")).toContainText("Visites");
    await expect(page.locator("body")).toContainText("Consultations");
    await expect(
      page.getByText(/Statistiques d.utilisation depuis le/)
    ).toBeVisible();
  });
});
