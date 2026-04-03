import { test, expect } from "@playwright/test";
import {
  expectIndexable,
  expectUrlEqual,
  expectCanonicalUrlEqual,
  expectTitleAndMetaDescriptionEqual,
} from "./helpers";

test.describe("Contributions", () => {
  test("je vois la liste de toutes les contributions par thèmes", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Bienvenue sur le Code du travail numérique"
    );
    await page.getByRole("heading", { level: 1 }).click();

    await page
      .locator("#fr-header-main-navigation")
      .getByText("Fiches pratiques")
      .click();
    await page
      .locator("#fr-header-main-navigation")
      .getByRole("link", { name: "Voir toutes les fiches par thème" })
      .click();

    await page.waitForURL("**/contribution");
    await expectIndexable(page);
    await expectUrlEqual(page, "/contribution");
    await expectCanonicalUrlEqual(page, "/contribution");
    await expectTitleAndMetaDescriptionEqual(
      page,
      "Fiches pratiques - Code du travail numérique",
      "Obtenez une réponse personnalisée selon votre convention collective"
    );

    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Fiches pratiques"
    );
    await expect(
      page.getByText(
        "Obtenez une réponse personnalisée selon votre convention collective"
      )
    ).toBeVisible();

    const h2s = page.getByRole("heading", { level: 2 });
    await expect(h2s).toHaveCount(13);
    await expect(h2s.nth(0)).toContainText("Sommaire");
    await expect(h2s.nth(1)).toContainText("Contenus populaires");
    await expect(h2s.nth(2)).toContainText("Embauche");

    const h3s = page.getByRole("heading", { level: 3 });
    expect(await h3s.count()).toBeGreaterThanOrEqual(1);
    await h3s.first().click();
    await page.waitForURL("**/contribution/**");
    await expectUrlEqual(
      page,
      "/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire"
    );
  });

  test("je vois une page contribution", async ({ page }) => {
    await page.goto(
      "/contribution/la-periode-dessai-peut-elle-etre-renouvelee"
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Renouvellement de la période d'essai"
    );

    await page
      .getByRole("button", {
        name: "Afficher les informations sans sélectionner une convention collective",
      })
      .click();
    await expect(
      page.getByText(
        "La convention collective ou l\u2019accord de branche étendu prévoit le renouvellement de la période d\u2019essai",
        { exact: false }
      )
    ).toBeVisible();
    await expect(page.locator("body")).toContainText("Références");
    await expect(page.locator("body")).toContainText("L1221-21");
  });

  test("je vois une page contribution pour une CC", async ({ page }) => {
    await page.goto(
      "/contribution/675-la-periode-dessai-peut-elle-etre-renouvelee"
    );
    await expect(
      page.getByText(
        "Maisons à succursales de vente au détail d'habillement (IDCC 0675)"
      )
    ).toBeVisible();

    await expect(page.locator("body")).toContainText(
      /Les conditions de renouvellement de la période d.essai varient selon la catégorie professionnelle du salarié/
    );

    await expect(
      page
        .getByRole("link", {
          name: "Maisons à succursales de vente au détail d'habillement",
        })
        .first()
    ).toHaveAttribute(
      "href",
      "/convention-collective/675-maisons-a-succursales-de-vente-au-detail-dhabillement"
    );

    await expect(
      page.locator("a", {
        hasText:
          /Demande d.accord du salarié pour le renouvellement d.une période d.essai/,
      })
    ).toBeVisible();
  });

  test("je vois une contribution avec un accordéon ouvert", async ({
    page,
  }) => {
    await page.goto(
      "/contribution/3248-combien-de-fois-le-contrat-de-travail-peut-il-etre-renouvele#cdd"
    );
    await expect(page.locator('[aria-expanded="true"]')).toContainText("CDD");
  });
});
