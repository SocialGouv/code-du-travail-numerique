import { expect, test } from "@playwright/test";
import {
  expectCanonicalUrlEqual,
  expectIndexable,
  expectUrlEqual,
} from "./helpers";

test.describe("Navigation par thème", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/themes");
  });

  test("affiche les informations sur le contenu de la page", async ({
    page,
  }) => {
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Thèmes"
    );
    await expect(page.locator("main")).toContainText(
      "Découvrez l’intégralité de nos contenus organisés par grands thèmes"
    );
    await expectIndexable(page);
    await expectUrlEqual(page, "/themes");
    await expectCanonicalUrlEqual(page, "/themes");
  });

  test('redirige vers la page "/themes/embauche" lorsque je clique sur "Embauche"', async ({
    page,
  }) => {
    const embaucheLink = page.locator('#main a[href="/themes/embauche"]');

    await expect(embaucheLink).toBeVisible();

    await Promise.all([
      page.waitForURL("**/themes/embauche"),
      embaucheLink.click(),
    ]);

    await expect(page).toHaveURL("/themes/embauche");
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Embauche"
    );

    await expect(page.locator("body")).toContainText("Méthodes de recrutement");
    await expect(page.locator("body")).toContainText("Formalités d'embauche");
    await expect(page.locator("body")).toContainText("Période d'essai");

    await expectIndexable(page);
    await expectUrlEqual(page, "/themes/embauche");
    await expectCanonicalUrlEqual(page, "/themes/embauche");
  });

  test('redirige vers la page "/themes/contrat-de-travail" lorsque je clique sur "Contrat de travail"', async ({
    page,
  }) => {
    const contratLink = page.locator(
      '#main a[href="/themes/contrat-de-travail"]'
    );

    await expect(contratLink).toBeVisible();

    await Promise.all([
      page.waitForURL("**/themes/contrat-de-travail"),
      contratLink.click(),
    ]);

    await expect(page).toHaveURL("/themes/contrat-de-travail");
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Contrat de travail"
    );

    await expect(page.locator("body")).toContainText(
      "Principales caractéristiques"
    );
    await expect(page.locator("body")).toContainText("CDI");
    await expect(page.locator("body")).toContainText("CDD");
  });
});
