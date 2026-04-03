import { test, expect } from "@playwright/test";

test.describe("Fiche Service public", () => {
  test("je vois une page fiche service public", async ({ page }) => {
    await page.goto("/fiche-service-public/salaire-primes-et-avantages");
    await expect(page).toHaveTitle(
      "Salaire, primes et avantages - Code du travail numérique"
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Salaire, primes et avantages"
    );

    const canonical = page.locator('head > link[rel="canonical"]');
    await expect(canonical).toHaveAttribute(
      "href",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2301"
    );

    await expect(
      page.getByRole("link", { name: "Fiche service-public.gouv.fr" })
    ).toHaveAttribute(
      "href",
      /https:\/\/www\.service-public\.gouv\.fr\/particuliers\/vosdroits\/F2301/
    );
    await expect(page.getByRole("heading", { level: 2 }).first()).toContainText(
      "Salaire"
    );
  });

  test("je vois une fiche service public avec un accordéon ouvert", async ({
    page,
  }) => {
    await page.goto(
      "/fiche-service-public/salaire-primes-et-avantages#salaire"
    );
    await expect(page.locator('[aria-expanded="true"]')).toBeVisible();
    await expect(
      page
        .getByRole("heading", { level: 2 })
        .filter({ hasText: "Salaire" })
        .first()
    ).toBeVisible();
  });
});
