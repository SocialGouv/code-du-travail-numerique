import { test, expect } from "@playwright/test";
import {
  expectCanonicalUrlEqual,
  expectIndexable,
  expectTitleAndMetaDescriptionEqual,
  expectUrlEqual,
} from "./helpers";

test.describe("Pages infographies", () => {
  test("je vois la liste de toutes les infographies par thèmes", async ({
    page,
  }) => {
    await page.goto("/infographie");
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Bienvenue sur le Code du travail numérique"
    );
    await page.getByRole("heading", { level: 1 }).click();
    await page
      .locator("#fr-header-main-navigation")
      .getByText("Code du travail")
      .click();
    await page
      .locator("#fr-header-main-navigation")
      .getByRole("link", { name: "Nos infographies" })
      .click({ force: true });

    await expectIndexable(page);
    await expectUrlEqual(page, "/infographie");
    await expectCanonicalUrlEqual(page, "/infographie");
    await expectTitleAndMetaDescriptionEqual(
      page,
      "Infographies - Code du travail numérique",
      "Découvrez toutes nos infographies : des visuels clairs pour comprendre vos droits, obligations et démarches en un coup d'oeil."
    );

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Infographies"
    );
    await expect(
      page.getByText(
        "Découvrez toutes nos infographies : des visuels clairs pour comprendre vos droits, obligations et démarches en un coup d'oeil."
      )
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 2 })).toHaveCount(10);
    await expect(page.getByRole("heading", { level: 2 }).nth(0)).toContainText(
      "Sommaire"
    );
    await expect(page.getByRole("heading", { level: 2 }).nth(1)).toContainText(
      "Contenus populaires"
    );
    await expect(page.getByRole("heading", { level: 2 }).nth(2)).toContainText(
      "Contrat de travail"
    );
    const h3s = page.getByRole("heading", { level: 3 });
    expect(await h3s.count()).toBeGreaterThanOrEqual(1);
    await h3s.first().click();
    await page.waitForURL("**/infographie/**");
    await expectUrlEqual(
      page,
      "/infographie/licenciement-pour-inaptitude-medicale"
    );
  });

  test("je vois une page infographie classique", async ({ page }) => {
    await page.goto("/infographie/que-se-passe-t-il-en-cas-dabandon-de-poste");
    await expectIndexable(page);
    await expectCanonicalUrlEqual(
      page,
      "/infographie/que-se-passe-t-il-en-cas-dabandon-de-poste"
    );
    await expectTitleAndMetaDescriptionEqual(
      page,
      "Que se passe-t-il en cas d'abandon de poste ? - Code du travail numérique",
      "Cette infographie détaille la marche à suivre pour l\u2019employeur en cas d\u2019abandon de poste d\u2019un salarié. Elle précise les effets possibles sur le contrat de travail selon que le salarié justifie son absence, reprenne son poste dans le délai imparti ou ne le fasse pas."
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Que se passe-t-il en cas d'abandon de poste ?"
    );
    await expect(
      page.getByRole("link", { name: /Abandon de poste/ })
    ).toBeVisible();
    await expect(
      page.getByText(
        "Cette infographie détaille la marche à suivre pour l\u2019employeur en cas d\u2019abandon de poste d\u2019un salarié.",
        { exact: false }
      )
    ).toBeVisible();
  });
});
