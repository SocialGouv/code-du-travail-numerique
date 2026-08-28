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
    await page
      .locator("fieldset")
      .filter({ hasText: "Quel est le type du contrat de travail" })
      .getByText("Contrat de travail temporaire (intérimaire)")
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Terme du contrat
    await page
      .locator("fieldset")
      .filter({ hasText: "a-t-il pris fin à la date initialement prévue" })
      .getByText("Oui", { exact: true })
      .click();
    await page
      .locator("fieldset")
      .filter({ hasText: "Le salarié a-t-il été dans l'une des situations" })
      .getByText("Autre", { exact: true })
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Rémunération
    await page
      .locator("fieldset")
      .filter({
        hasText:
          "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail",
      })
      .getByText(
        "Montant total de la rémunération brute perçue depuis le début du contrat de travail"
      )
      .click();
    await page.locator("#input-salaireTotal").fill("2000");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Résultat : un intérimaire perçoit une indemnité de fin de mission
    // Le titre du résultat, et non le lien de contenu associé qui porte le
    // même libellé dans la colonne de droite.
    await expect(
      page.getByRole("heading", { name: "Indemnité de fin de mission" })
    ).toBeVisible();
    await expect(page.getByText("Détail du calcul")).toBeVisible();
    await expect(page.getByText("200,00 €")).toBeVisible();
    await expect(
      page.getByText("Article L1251-32 du code du travail")
    ).toBeVisible();
    await expect(
      page.getByText("Article L1251-33 du code du travail")
    ).toBeVisible();
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

    await page
      .locator("fieldset")
      .filter({ hasText: "Quel est le type du contrat de travail" })
      .getByText("Autres", { exact: true })
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    await expect(
      page.getByText(
        "Il n'y a pas d'indemnité de précarité dans cette situation"
      )
    ).toBeVisible();
    await expect(
      page.getByText("Article L1243-10 du code du travail")
    ).toBeVisible();
    // `data-testid` est supprimé en build production (reactRemoveProperties) :
    // on s'appuie sur le texte, comme le reste des tests e2e.
    await expect(page.getByText("n’est pas due en cas de")).toBeVisible();
    await expect(
      page.getByRole("listitem").filter({ hasText: "CDD saisonnier" }).first()
    ).toBeVisible();
    await expect(
      page
        .getByRole("listitem")
        .filter({ hasText: "CDD dans le cadre d'un congé de mobilité" })
        .first()
    ).toBeVisible();
  });

  test("Un intérimaire rompu pour inaptitude n'a pas d'indemnité de fin de mission", async ({
    page,
  }) => {
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

    await page
      .locator("fieldset")
      .filter({ hasText: "Quel est le type du contrat de travail" })
      .getByText("Contrat de travail temporaire (intérimaire)")
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    await page
      .locator("fieldset")
      .filter({ hasText: "a-t-il pris fin à la date initialement prévue" })
      .getByText("Non", { exact: true })
      .click();
    await page
      .locator("fieldset")
      .filter({ hasText: "Dans quel cadre le" })
      .getByText(
        "Rupture pour inaptitude du salarié prononcée par le médecin du travail"
      )
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    await expect(
      page.getByText(
        "Il n'y a pas d'indemnité de fin de mission dans cette situation"
      )
    ).toBeVisible();
    await expect(
      page.getByText("Article L1251-33 du code du travail")
    ).toBeVisible();
    await expect(
      page.getByText("Article L1243-10 du code du travail")
    ).toHaveCount(0);
  });
});
