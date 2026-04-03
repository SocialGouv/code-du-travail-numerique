import { test, expect } from "@playwright/test";

test.describe("Landing pages", () => {
  test("je vois une page convention collective", async ({ page }) => {
    await page.goto(
      "/convention-collective/1686-commerces-et-services-de-laudiovisuel-de-lelectronique-et-de-lequipemen"
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Commerces et services de l'audiovisuel, de l'électronique et de l'équipement ménager"
    );
    await expect(page.locator("body")).toContainText(
      "Retrouvez l'intégralité de la convention collective sur Légifrance"
    );
    await expect(page.locator("body")).toContainText(
      "Entrée en vigueur le 01/01/1993"
    );
  });

  test("je vois la page à propos", async ({ page }) => {
    await page.goto("/a-propos");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "À propos"
    );
    await expect(
      page.getByText(/Qu.est-ce que le Code du travail numérique/)
    ).toBeVisible();
    await expect(page.getByText("Qui sommes-nous")).toBeVisible();
  });

  test("je vois la page déclaration d'accessibilité", async ({ page }) => {
    await page.goto("/accessibilite");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Déclaration d'accessibilité"
    );
    await expect(page.locator("body")).toContainText("État de conformité");
    await expect(page.locator("body")).toContainText(
      "Le site Internet code.travail.gouv.fr (« Code du travail numérique ») est en totale conformité avec le référentiel général d'amélioration de l'accessibilité."
    );
  });

  test("je vois la page droit du travail", async ({ page }) => {
    await page.goto("/droit-du-travail");
    await expect(
      page.getByText(/Qu.est-ce que le droit du travail/)
    ).toBeVisible();
    await expect(
      page.getByText(/Quels sont les textes à l.origine du droit du travail/)
    ).toBeVisible();
    await expect(
      page.getByText(/Existe-t-il une hiérarchie entre les textes/)
    ).toBeVisible();
  });

  test("je vois la page mention légale", async ({ page }) => {
    await page.goto("/mentions-legales");
    await expect(page.locator("body")).toContainText(
      "Directeur de la publication"
    );
    await expect(page.locator("body")).toContainText("Hébergement");
    await expect(page.locator("body")).toContainText("Accessibilité");
  });
});
