import { test, expect } from "@playwright/test";
import { formatToEuro } from "../helpers/format";

test.describe("Outil - Indemnité de licenciement", () => {
  test("Calcul de l'indemnité de licenciement", async ({ page }) => {
    await page.goto("/outils/indemnite-licenciement");
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Calculer l'indemnité de licenciement"
    );
    await page.getByRole("button", { name: "Commencer" }).click();

    // Skip convention collective
    await page
      .getByText(
        "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
      )
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Answer questions
    await page.locator("label").filter({ hasText: /^Non$/ }).first().click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Dates
    await page.locator("#dateEntree").fill("2003-01-01");
    await page.locator("#dateNotification").fill("2026-06-01");
    await page.locator("#dateSortie").fill("2026-06-01");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Absences
    await page.locator("label").filter({ hasText: /^Non$/ }).first().click();
    await page.locator("label").filter({ hasText: /^Oui$/ }).nth(1).click();
    await page.locator("[id='0.duration']").fill("1");
    await page.getByRole("button", { name: "Ajouter une absence" }).click();
    await expect(page.getByText("Absence 2")).toBeFocused();
    await page.locator("[id='1.duration']").fill("1");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Salary
    await page.locator("label").filter({ hasText: /^Oui$/ }).first().click();
    await page.locator("#salary").fill("1000");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Result
    await expect(page.locator("body")).toContainText(
      "indemnité de licenciement est estimée à"
    );
    await expect(page.locator("body")).toContainText(formatToEuro(6916.67));
    await expect(page.locator("body")).toContainText(
      "Attention il peut exister un montant plus favorable"
    );
    await expect(
      page.getByRole("button", { name: "Imprimer le résultat" })
    ).toBeVisible();
  });
});
