import { test, expect } from "@playwright/test";

test.describe("Page Ministère du travail", () => {
  test("je vois une page fiche ministère du travail", async ({ page }) => {
    await page.goto("/fiche-ministere-travail/entreprises-dinsertion-ei");
    await expect(page).toHaveTitle(/Les entreprises d.insertion \(EI\)/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /Les entreprises d.insertion \(EI\)/
    );
    await expect(
      page.getByRole("link", { name: "Fiche Ministère du travail" })
    ).toHaveAttribute("href", /https:\/\/travail-emploi\.gouv\.fr/);
    const h2Count = await page.getByRole("heading", { level: 2 }).count();
    expect(h2Count).toBeGreaterThanOrEqual(10);
    await expect(page.getByRole("heading", { level: 2 }).first()).toContainText(
      /Qu.est-ce qu.une entreprise d.insertion/
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
    await expect(page.locator('[aria-expanded="true"]')).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2 }).filter({
        hasText: "Quelle est la situation du salarié à la fin du contrat",
      })
    ).toBeVisible();
  });
});
