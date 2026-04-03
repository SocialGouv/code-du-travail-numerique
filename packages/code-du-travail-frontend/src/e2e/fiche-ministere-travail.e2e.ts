import { test, expect } from "@playwright/test";

test.describe("Page Ministère du travail", () => {
  test("je vois une page fiche ministère du travail", async ({ page }) => {
    await page.goto("/fiche-ministere-travail/entreprises-dinsertion-ei");
    await expect(page).toHaveTitle(
      "Les entreprises d'insertion (EI) - Code du travail numérique"
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Les entreprises d'insertion (EI)"
    );
    await expect(
      page.getByRole("link", { name: "Fiche Ministère du travail" })
    ).toHaveAttribute("href", /https:\/\/travail-emploi\.gouv\.fr/);
    await expect(page.getByRole("heading", { level: 2 })).toHaveCount(12);
    await expect(page.getByRole("heading", { level: 2 }).first()).toContainText(
      "Qu\u2019est-ce qu\u2019une entreprise d\u2019insertion"
    );
  });

  test("je vois une page fiche ministère du travail avec un accordéon ouvert", async ({
    page,
  }) => {
    await page.goto(
      "/fiche-ministere-travail/la-demission#quelle-est-la-situation-du-salarie-a-la-fin-du-contrat"
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "La démission"
    );
    await page.getByRole("heading", { level: 1 }).click();
    await expect(
      page.locator('[aria-expanded="true"]', {
        hasText: /Quelle est la situation du salarié à la fin du contrat/,
      })
    ).toBeVisible({ timeout: 10_000 });
  });
});
