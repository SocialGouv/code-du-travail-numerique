import { test, expect } from "@playwright/test";
import { formatToEuro } from "../helpers/format";
import { contractDates } from "../helpers/dates";

// 20 ans d'ancienneté : le barème de l'article D1237-1 donne 1,5 mois de
// salaire de référence pour un départ volontaire, soit 1500 € pour 1000 €
// de salaire mensuel.
const { startDate, endDate } = contractDates({ years: 20 });

test.describe("Outil - Indemnité de départ à la retraite", () => {
  test("Calcul de l'indemnité de départ volontaire à la retraite", async ({
    page,
  }) => {
    await page.goto("/outils/indemnite-retraite");
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Calculer l'indemnité de départ à la retraite"
    );
    await page.getByRole("button", { name: "Commencer" }).click();

    // Origine du départ : le salarié
    await page
      .getByText("Le salarié décide lui-même de partir à la retraite")
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Dates
    await expect(page.locator("body")).toContainText(
      "date de notification du départ à la retraite"
    );
    await page.locator("#dateEntree").fill(startDate);
    await page.locator("#dateNotification").fill(endDate);
    await page.locator("#dateSortie").fill(endDate);
    await page.getByRole("button", { name: "Suivant" }).click();

    // Absences : ni arrêt de travail, ni absence prolongée
    await page.locator("label").filter({ hasText: /^Non$/ }).first().click();
    await page.locator("label").filter({ hasText: /^Non$/ }).nth(1).click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Salaires
    await page.locator("label").filter({ hasText: /^Oui$/ }).first().click();
    await page.locator("#salary").fill("1000");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Résultat
    await expect(page.locator("body")).toContainText(
      "indemnité de départ à la retraite est estimée à"
    );
    await expect(page.locator("body")).toContainText(formatToEuro(1500));
    await expect(page.locator("body")).toContainText(
      "Origine du départ : Départ à la retraite"
    );
    await expect(page.locator("body")).toContainText("Article D1237-1");
    // La V1 ne traite pas les conventions collectives.
    await expect(page.locator("body")).not.toContainText(
      "La convention collective n’a pas été renseignée"
    );
    await expect(
      page.getByRole("button", { name: "Imprimer le résultat" })
    ).toBeVisible();
  });

  test("Calcul de l'indemnité de mise à la retraite", async ({ page }) => {
    await page.goto("/outils/indemnite-retraite");
    await page.getByRole("button", { name: "Commencer" }).click();

    // Origine du départ : l'employeur
    await page
      .getByText("L'employeur décide de mettre le salarié à la retraite")
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    await expect(page.locator("body")).toContainText(
      "date de notification de la mise à la retraite"
    );
    await page.locator("#dateEntree").fill(startDate);
    await page.locator("#dateNotification").fill(endDate);
    await page.locator("#dateSortie").fill(endDate);
    await page.getByRole("button", { name: "Suivant" }).click();

    await page.locator("label").filter({ hasText: /^Non$/ }).first().click();
    await page.locator("label").filter({ hasText: /^Non$/ }).nth(1).click();
    await page.getByRole("button", { name: "Suivant" }).click();

    await page.locator("label").filter({ hasText: /^Oui$/ }).first().click();
    await page.locator("#salary").fill("1000");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Méthode identique à l'indemnité de licenciement :
    // (1/4 × 1000 × 10) + (1/3 × 1000 × 10) = 5833,33 €
    await expect(page.locator("body")).toContainText(
      "indemnité de mise à la retraite est estimée à"
    );
    await expect(page.locator("body")).toContainText(formatToEuro(5833.33));
    await expect(page.locator("body")).toContainText(
      "Origine du départ : Mise à la retraite"
    );
    await expect(page.locator("body")).toContainText("Article L1237-7");
  });
});
