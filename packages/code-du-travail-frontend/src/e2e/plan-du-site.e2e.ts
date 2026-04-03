import { test, expect } from "@playwright/test";

test.describe("Plan du site", () => {
  test("je vois le plan du site", async ({ page }) => {
    await page.goto("/plan-du-site");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Plan du site"
    );
    await expect(
      page.getByRole("link", { name: "Page d'accueil" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Simulateurs" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Vos fiches pratiques" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Votre convention collective" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Thèmes" })).toBeVisible();
  });
});
