import { test, expect } from "@playwright/test";

test.describe("Outil - Préavis de démission", () => {
  test("Parcours avec convention collective non traitée", async ({ page }) => {
    await page.goto("/outils/preavis-demission");
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Calculer le préavis de démission"
    );
    await page.getByRole("button", { name: "Commencer" }).click();

    // Convention collective
    await expect(
      page.getByText("Quel est le nom de la convention collective applicable ?")
    ).toBeVisible();
    await page
      .locator("label")
      .filter({
        hasText: "Je sais quelle est ma convention collective et je la saisis.",
      })
      .first()
      .click();
    await expect(
      page.getByText("Précisez et sélectionnez votre convention collective")
    ).toBeVisible();
    await page.locator("#agreement-search-autocomplete").fill("1388");
    await page
      .locator('ul[role="listbox"] li')
      .first()
      .waitFor({ timeout: 15_000 });
    await page
      .locator('ul[role="listbox"] li')
      .filter({ hasText: "Industrie du pétrole" })
      .click();

    await expect(
      page.getByText(
        "La convention collective sélectionnée n'est pas traitée par nos services."
      )
    ).toBeVisible();
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(
      page.getByText(
        "Vous ne pouvez pas poursuivre la simulation avec cette convention collective."
      )
    ).toBeVisible();
  });

  test("Parcours en connaissant sa convention collective", async ({ page }) => {
    await page.goto("/outils/preavis-demission");
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Calculer le préavis de démission"
    );
    await page.getByRole("button", { name: "Commencer" }).click();

    // Convention collective
    await expect(
      page.getByText("Quel est le nom de la convention collective applicable ?")
    ).toBeVisible();
    await page
      .locator("label")
      .filter({
        hasText: "Je sais quelle est ma convention collective et je la saisis.",
      })
      .first()
      .click();
    await expect(
      page.getByText("Précisez et sélectionnez votre convention collective")
    ).toBeVisible();
    await page.locator("#agreement-search-autocomplete").fill("843");
    await page
      .locator('ul[role="listbox"] li')
      .first()
      .waitFor({ timeout: 15_000 });
    await page
      .locator('ul[role="listbox"] li')
      .filter({ hasText: "Boulangerie" })
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Informations
    await expect(
      page.getByText("Quelle est la catégorie professionnelle du salarié")
    ).toBeVisible();
    await page
      .locator(
        '[id="input-infos-contrat-salarie-convention-collective-boulangerie-patisserie-categorie-professionnelle"]'
      )
      .selectOption(
        "Personnel de fabrication, personnel de vente et personnel de services"
      );

    await expect(
      page.getByText("Quelle est l'ancienneté du salarié")
    ).toBeVisible();
    await page
      .locator(
        '[id="input-infos-contrat-salarie-convention-collective-boulangerie-patisserie-categorie-professionnelle-Personnel-de-fabrication,-personnel-de-vente-et-personnel-de-services-anciennete"]'
      )
      .selectOption("Plus de 6 mois");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Result
    const result = page.locator("main");
    await expect(result.getByText("Durée du préavis").first()).toBeVisible();
    await expect(result.getByText("2 semaines").first()).toBeVisible();
    await expect(
      result
        .getByText("Boulangerie-pâtisserie (entreprises artisanales)")
        .first()
    ).toBeVisible();
    await expect(
      result
        .getByText(
          "Personnel de fabrication, personnel de vente et personnel de services"
        )
        .first()
    ).toBeVisible();
    await expect(result.getByText("Plus de 6 mois").first()).toBeVisible();
  });
});
