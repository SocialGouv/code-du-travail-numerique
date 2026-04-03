import { test, expect } from "@playwright/test";

test.describe("Outil - Indemnité de Precarite", () => {
  test("Calcul de l'indemnité de precarite", async ({ page }) => {
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
      .waitFor({ timeout: 10_000 });
    await page
      .locator('ul[role="listbox"] li')
      .filter({ hasText: "Boulangerie-pâtisserie" })
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Contract type
    await page
      .locator("fieldset")
      .filter({ hasText: "Quel est le type du contrat de travail ?" })
      .getByText("Contrat de travail temporaire (Contrat d'intérim)")
      .click();

    // Mission-formation
    await page
      .locator("fieldset")
      .filter({ hasText: "S'agit-il d'un contrat de mission-formation ?" })
      .getByText("Non")
      .click();

    // Early termination
    await page
      .locator("fieldset")
      .filter({
        hasText:
          "Le contrat d'intérim a-t-il été rompu avant la fin prévue pour une des raisons suivantes",
      })
      .getByText("Non")
      .click();

    // CDI hiring
    await page
      .locator("fieldset")
      .filter({
        hasText:
          "À la fin du contrat d'intérim, le salarié a-t-il été immédiatement embauché en CDI",
      })
      .getByText("Non")
      .click();

    // Flexibility refusal
    await page
      .locator("fieldset")
      .filter({
        hasText:
          "Le salarié a-t-il refusé la mise en œuvre de la souplesse prévue dans le contrat d'intérim",
      })
      .getByText("Non")
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Salary
    await page
      .locator("fieldset")
      .filter({
        hasText:
          "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail",
      })
      .getByText("En indiquant le montant total des rémunérations.")
      .click();
    await page.locator("#input-salaireTotal").fill("2000");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Result
    await expect(page.getByText("Détail du calcul")).toBeVisible();
    await expect(page.getByText("200")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Imprimer le résultat" })
    ).toBeVisible();
  });
});
