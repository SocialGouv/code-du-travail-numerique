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
      .waitFor({ timeout: 15_000 });
    await page
      .locator('ul[role="listbox"] li')
      .filter({ hasText: "Boulangerie-pâtisserie" })
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Type de contrat
    await expect(
      page.getByText("Quel est le type du contrat de travail")
    ).toBeVisible();
    await page
      .getByTestId("contractType-contrat-travail-temporaire")
      .click({ force: true });
    await page.getByRole("button", { name: "Suivant" }).click();

    // Terme du contrat
    await expect(
      page.getByText("a-t-il pris fin à la date initialement prévue")
    ).toBeVisible();
    await page.getByTestId("finALaDatePrevue-oui").click({ force: true });
    await expect(page.getByText("Quelle a été l'issue du")).toBeVisible();
    await page.getByTestId("issueContrat-autre").click({ force: true });
    await page.getByRole("button", { name: "Suivant" }).click();

    // Rémunération
    await page
      .locator("fieldset")
      .filter({
        hasText:
          "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail",
      })
      .getByText("La rémunération totale brute perçue en € durant le contrat")
      .click();
    await page.locator("#input-salaireTotal").fill("2000");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Résultat
    await expect(page.getByText("Détail du calcul")).toBeVisible();
    await expect(page.getByText("200,00 €")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Imprimer le résultat" })
    ).toBeVisible();
  });

  test("Un contrat exclu mène au résultat sans indemnité", async ({ page }) => {
    await page.goto("/outils/indemnite-precarite");
    await page.getByRole("button", { name: "Commencer" }).click();

    await page
      .locator("label")
      .filter({
        hasText:
          "Je ne souhaite pas renseigner ma convention collective (je passe l'étape).",
      })
      .first()
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    await page.getByTestId("contractType-autres").click({ force: true });
    await page.getByRole("button", { name: "Suivant" }).click();

    await expect(
      page.getByText(
        "Il n'y a pas d'indemnité de précarité dans cette situation"
      )
    ).toBeVisible();
    await expect(page.getByTestId("excluded-contracts")).toBeVisible();
  });
});
