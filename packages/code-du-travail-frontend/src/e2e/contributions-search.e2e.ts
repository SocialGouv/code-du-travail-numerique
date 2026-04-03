import { test, expect } from "@playwright/test";
import { expectUrlEqual } from "./helpers";

test.describe("Contributions", () => {
  test("rechercher et voir une contribution", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Bienvenue sur le Code du travail numérique"
    );
    await page.getByRole("heading", { level: 1 }).click();

    await page.locator("#search-home-autocomplete").fill("durée maximale CDD");
    await page
      .getByRole("button", { name: "Voir tous les résultats" })
      .click();

    const h3s = page.getByRole("heading", { level: 3 });
    expect(await h3s.count()).toBeGreaterThanOrEqual(1);

    await page
      .getByRole("link", { name: "Durée maximale d'un CDD" })
      .first()
      .click();

    await page.waitForURL(
      "**/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd"
    );
    await expectUrlEqual(
      page,
      "/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd"
    );
  });
});
