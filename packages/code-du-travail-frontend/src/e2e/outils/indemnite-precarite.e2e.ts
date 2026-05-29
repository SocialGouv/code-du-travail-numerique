import { test, expect } from "@playwright/test";

test.describe("Outil - Indemnité de Precarite", () => {
  test("Calcul de l'indemnité de precarite (parcours CTT happy path)", async ({
    page,
  }) => {
    await page.goto("/outils/indemnite-precarite");
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Calculer l'indemnité de précarité"
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
      .filter({ hasText: "Boulangerie-pâtisserie" })
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Contract type (radio)
    await page
      .locator("fieldset")
      .filter({ hasText: "Quel est le type de contrat de travail ?" })
      .getByText("Contrat de travail temporaire (Contrat d'intérim)")
      .click();

    // No CTT condition checked: proceed directly
    await page.getByRole("button", { name: "Suivant" }).click();

    // Salary
    await page
      .locator("fieldset")
      .filter({
        hasText:
          "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail",
      })
      .getByText(
        "La rémunération totale brute perçue en € durant le contrat de travail"
      )
      .click();
    await page.locator("#input-salaireTotal").fill("2000");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Result
    await expect(page.getByText("Détail du calcul")).toBeVisible();
    await expect(page.getByText("200,00 €")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Imprimer le résultat" })
    ).toBeVisible();
  });

  test("Parcours de disqualification (CDD saisonnier)", async ({ page }) => {
    await page.goto("/outils/indemnite-precarite");
    await page.getByRole("button", { name: "Commencer" }).click();

    // Skip agreement
    await page
      .getByText(
        "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
      )
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Type "de contrat" (vérifie aussi la coquille corrigée)
    await expect(
      page.getByText("Quel est le type de contrat de travail ?")
    ).toBeVisible();
    await page
      .locator("fieldset")
      .filter({ hasText: "Quel est le type de contrat de travail ?" })
      .getByText("Contrat à durée déterminée (CDD)")
      .click();

    // CDD type = saisonnier (radio, plus de dropdown)
    await page
      .locator("fieldset")
      .filter({ hasText: "Quel est le type de CDD ?" })
      .getByText("CDD saisonnier", { exact: true })
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Doit afficher le message de disqualification (saute par-dessus Rémunération)
    await expect(page.getByText("Aucune indemnité")).toBeVisible();
    await expect(
      page.getByText(
        "Ce type de contrat ne permet pas au salarié d'avoir droit à une prime de précarité."
      )
    ).toBeVisible();
  });
});
