import { test, expect } from "@playwright/test";

test.describe("Page Besoin de plus d'information", () => {
  test("Permet de rechercher le lien vers un service de renseignement", async ({
    page,
  }) => {
    await page.goto("/besoin-plus-informations");

    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Besoin de plus d'informations"
    );

    await page
      .getByLabel("Saisissez le numéro de votre département")
      .fill("75");

    await page
      .getByRole("button", {
        name: "Lancer la recherche par numéro de département",
      })
      .click();

    const link = page.locator(
      'a[href="https://idf.drieets.gouv.fr/Adresse-et-horaires-d-ouverture-de-l-unite-departementale-75"]'
    );

    await expect(link).toHaveAttribute("target", "_blank");
  });
});
