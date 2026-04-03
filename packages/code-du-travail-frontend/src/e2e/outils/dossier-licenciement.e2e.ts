import { test, expect } from "@playwright/test";
import { expectUrlEqual } from "../helpers";

test.describe("Outil - Dossier Licenciement", () => {
  test("Parcours Licenciement pour motif non disciplinaire", async ({
    page,
  }) => {
    await page.goto("/outils/procedure-licenciement");
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Comprendre sa procédure de licenciement"
    );

    await expect(page.getByText("Quelle est votre situation ?")).toBeVisible();
    await expect(
      page.locator("label").filter({ hasText: /^Salarié$/ })
    ).toBeVisible();
    await expect(
      page.locator("label").filter({ hasText: /^Employeur$/ })
    ).toBeVisible();

    await page
      .locator("label")
      .filter({ hasText: /^Salarié$/ })
      .click();

    await expect(
      page.getByText("Un licenciement pour motif personnel")
    ).toBeVisible();
    await expect(
      page.getByText("Un licenciement pour motif économique")
    ).toBeVisible();
    await expect(
      page.getByText(
        "Un licenciement suite à un accord de performance collective (APC)"
      )
    ).toBeVisible();

    await page
      .locator("label")
      .filter({ hasText: "Un licenciement pour motif personnel" })
      .click();

    await expect(
      page.getByText(
        "Une faute qui vous est reprochée (motif disciplinaire)"
      )
    ).toBeVisible();
    await expect(
      page.getByText("Une inaptitude constatée par le médecin du travail")
    ).toBeVisible();
    await expect(
      page.getByText(
        "Vous n'êtes concerné par aucun de ces cas (motif non disciplinaire)"
      )
    ).toBeVisible();

    await page
      .locator("label")
      .filter({
        hasText:
          "Vous n'êtes concerné par aucun de ces cas (motif non disciplinaire)",
      })
      .click();

    await page
      .getByRole("button", { name: "Afficher les informations personnalisées" })
      .click();

    await expectUrlEqual(
      page,
      "/infographie/licenciement-pour-motif-non-disciplinaire"
    );
  });
});
