import { expect, test } from "@playwright/test";
import {
  expectCanonicalUrlEqual,
  expectIndexable,
  expectTitleAndMetaDescriptionEqual,
  expectUrlEqual,
} from "./helpers";
import path from "node:path";
import { promises as fs } from "node:fs";

test.describe("Modèles de documents", () => {
  test("je vois la liste de tous les modèles de documents par thèmes", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Bienvenue sur le Code du travail numérique"
    );

    const nav = page.locator("#fr-header-main-navigation");

    await nav.getByRole("button", { name: "Modèles de documents" }).click();

    const allModelsLink = nav.getByRole("link", {
      name: "Voir tous les modèles par thème",
    });

    await expect(allModelsLink).toBeVisible();

    await Promise.all([
      page.waitForURL("**/modeles-de-courriers"),
      allModelsLink.click(),
    ]);

    await expectIndexable(page);
    await expectUrlEqual(page, "/modeles-de-courriers");
    await expectCanonicalUrlEqual(page, "/modeles-de-courriers");

    await expectTitleAndMetaDescriptionEqual(
      page,
      "Modèles de documents - Code du travail numérique",
      "Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
    );

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/modeles-de-courriers$/
    );

    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Modèles de documents"
    );

    await expect(page.locator("body")).toContainText(
      "Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
    );

    const h2s = page.getByRole("heading", { level: 2 });
    expect(await h2s.count()).toBeGreaterThan(3);

    await expect(h2s.nth(0)).toContainText("Sommaire");
    await expect(h2s.nth(1)).toContainText("Contenus populaires");

    const h3s = page.getByRole("heading", { level: 3 });
    expect(await h3s.count()).toBeGreaterThan(1);
    await expect(h3s.first()).toBeVisible();

    await h3s.first().click();

    await expect(page).toHaveURL("/modeles-de-courriers/lettre-de-demission");
  });

  test("cherche un modèle", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Bienvenue sur le Code du travail numérique"
    );

    const homeSearchbar = page.locator("#search-home-autocomplete");

    await homeSearchbar.fill("modele rupture contrat periode d'essai");
    await homeSearchbar.press("Enter");

    await expect(homeSearchbar).toHaveValue(
      "modele rupture contrat periode d'essai"
    );

    await page.getByRole("button", { name: "Voir tous les résultats" }).click();

    await expect(page).toHaveURL(
      "/recherche?query=modele%20rupture%20contrat%20periode%20d%27essai"
    );

    await page
      .getByRole("link", { name: "Rupture de période d’essai par le salarié" })
      .click();

    await expect(page).toHaveURL(
      "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie"
    );
  });

  test("télécharge un modèle", async ({ page }, testInfo) => {
    await page.goto(
      "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie"
    );

    await page.getByText("Objet : Rupture de la période d’essai").click();

    const downloadPromise = page.waitForEvent("download");
    await page
      .getByRole("link", { name: /Télécharger le/i })
      .first()
      .click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe(
      "rupture_periode_d-essai_salarie.docx"
    );

    await expect(download.failure()).resolves.toBeNull();

    const filePath = path.join(
      testInfo.outputDir,
      download.suggestedFilename()
    );
    await download.saveAs(filePath);

    const stats = await fs.stat(filePath);
    expect(stats.size).toBeGreaterThan(0);
  });
});
