import { test, expect } from "@playwright/test";

test.describe("Outil - Préavis de licenciement", () => {
  test("Parcours sans convention collective", async ({ page }) => {
    await page.goto("/outils/preavis-licenciement");
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Calculer le préavis de licenciement"
    );
    await page.getByRole("button", { name: "Commencer" }).click();

    // Questions
    await expect(
      page.getByText("Le licenciement est-il dû à une faute grave (ou lourde)")
    ).toBeVisible();
    await page.locator("label").filter({ hasText: /^Oui$/ }).first().click();
    await expect(
      page.getByText("Pas de préavis en cas de faute grave")
    ).toBeVisible();
    await page.locator("label").filter({ hasText: /^Non$/ }).first().click();

    await expect(
      page.getByText(
        "Le salarié concerné est-il reconnu en tant que travailleur handicapé"
      )
    ).toBeVisible();
    await page.locator("label").filter({ hasText: /^Non$/ }).nth(1).click();

    await expect(
      page.getByText("Quelle est l'ancienneté du salarié ?")
    ).toBeVisible();
    await page.locator('[id="input-seniority"]').selectOption("2 ans et plus");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Convention collective
    await expect(
      page.getByText("Quel est le nom de la convention collective applicable ?")
    ).toBeVisible();
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(
      page.getByText("Vous devez répondre à cette question")
    ).toBeVisible();
    await page
      .getByText(
        "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
      )
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Result
    const result1 = page.locator("main");
    await expect(result1.getByText("Durée du préavis").first()).toBeVisible();
    await expect(result1.getByText("2 mois").first()).toBeVisible();
    await expect(result1.getByText("Plus de 2 ans").first()).toBeVisible();
    await expect(
      result1.getByText("convention collective non renseignée")
    ).toBeVisible();
  });

  test("Parcours en connaissant sa convention collective", async ({ page }) => {
    await page.goto("/outils/preavis-licenciement");
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Calculer le préavis de licenciement"
    );
    await page.getByRole("button", { name: "Commencer" }).click();

    // Questions
    await page.locator("label").filter({ hasText: /^Non$/ }).first().click();
    await page.locator("label").filter({ hasText: /^Non$/ }).nth(1).click();
    await page.locator('[id="input-seniority"]').selectOption("2 ans et plus");
    await page.getByRole("button", { name: "Suivant" }).click();

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
      .selectOption("Plus de 2 ans");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Result
    const result2 = page.locator("main");
    await expect(result2.getByText("Durée du préavis").first()).toBeVisible();
    await expect(result2.getByText("2 mois").first()).toBeVisible();
    await expect(
      result2
        .getByText("Boulangerie-pâtisserie (entreprises artisanales)")
        .first()
    ).toBeVisible();
    await expect(
      result2
        .getByText(
          "Personnel de fabrication, personnel de vente et personnel de services"
        )
        .first()
    ).toBeVisible();
    await expect(result2.getByText("Plus de 2 ans").first()).toBeVisible();
    await expect(result2.getByText("Article 32")).toBeVisible();
  });
});
