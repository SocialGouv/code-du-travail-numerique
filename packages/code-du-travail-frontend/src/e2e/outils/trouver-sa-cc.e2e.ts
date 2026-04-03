import { test, expect } from "@playwright/test";
import {
  expectCanonicalUrlEqual,
  expectIndexable,
  expectTitleAndMetaDescriptionEqual,
  expectUrlEqual,
} from "../helpers";

test.describe("Outil - Trouver sa convention collective", () => {
  test("Recherche de convention collective je la saisis", async ({ page }) => {
    await page.goto("/outils/convention-collective");
    await expectIndexable(page);
    await expectCanonicalUrlEqual(page, "/outils/convention-collective");
    await expectTitleAndMetaDescriptionEqual(
      page,
      "Simulateur - Trouver sa convention collective - Code du travail numérique",
      "Recherchez une convention collective par Entreprise, SIRET, Nom ou numéro IDCC"
    );

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Trouver sa convention collective"
    );
    await page.getByRole("heading", { level: 1 }).click();

    await page
      .getByText("Je connais ma convention collective je la saisis")
      .click();

    await page.waitForURL("**/convention-collective/convention");
    await expectUrlEqual(page, "/outils/convention-collective/convention");
    await expectCanonicalUrlEqual(page, "/outils/convention-collective");

    const input = page.getByTestId("AgreementSearchAutocomplete");
    await input.fill("boulangerie");

    await expect(page.locator('ul[role="listbox"] li')).toContainText([
      "Boulangerie-pâtisserie (entreprises artisanales)",
    ]);
    await expect(page.locator('ul[role="listbox"] li')).toContainText([
      "Activités industrielles de boulangerie et pâtisserie",
    ]);

    await input.clear();
    await input.fill("2247");
    await expect(page.locator('ul[role="listbox"] li')).toContainText([
      "Entreprises de courtage d'assurances et/ou de réassurances",
    ]);
  });

  test("Recherche de convention collective par entreprise", async ({
    page,
  }) => {
    await page.goto("/outils/convention-collective");
    await expectIndexable(page);
    await expectTitleAndMetaDescriptionEqual(
      page,
      "Simulateur - Trouver sa convention collective - Code du travail numérique",
      "Recherchez une convention collective par Entreprise, SIRET, Nom ou numéro IDCC"
    );

    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Trouver sa convention collective"
    );
    await page.getByRole("heading", { level: 1 }).click();

    await page
      .getByText(
        "Je cherche mon entreprise pour trouver ma convention collective"
      )
      .click();
    await expectUrlEqual(page, "/outils/convention-collective");
    await expectCanonicalUrlEqual(page, "/outils/convention-collective");

    // Search by SIRET
    await page
      .getByLabel("Nom de votre entreprise ou numéro Siren/Siret")
      .fill("82129756100010");
    const locationInput = page.getByTestId("locationSearchAutocomplete");
    await locationInput.fill("75018");
    await page
      .locator('[role="listbox"] [role="option"]')
      .first()
      .waitFor({ timeout: 15_000 });
    await locationInput.press("ArrowDown");
    await locationInput.press("Enter");
    await page.locator('button[type="submit"]').last().click();

    await expectUrlEqual(page, "/outils/convention-collective/entreprise");
    await expectCanonicalUrlEqual(page, "/outils/convention-collective");
    await page.getByText("BOUILLON PIGALLE").click();
    await expect(
      page.getByText("1 convention collective trouvée :")
    ).toBeVisible();

    // Go back and search CARREFOUR BANQUE
    await page.getByText("Précédent").click();
    await page
      .getByLabel("Nom de votre entreprise ou numéro Siren/Siret")
      .clear();
    await page
      .getByLabel("Nom de votre entreprise ou numéro Siren/Siret")
      .fill("CARREFOUR BANQUE");
    await page.getByTestId("locationSearchAutocomplete").clear();
    await page.locator('button[type="submit"]').last().click();
    await page.getByText("CARREFOUR BANQUE").first().click();
    await expect(
      page.getByText("2 conventions collectives trouvées :")
    ).toBeVisible();

    const banqueLink = page.getByRole("link", { name: "Banque" }).first();
    await expect(banqueLink).toHaveAttribute(
      "href",
      "/convention-collective/2120-banque"
    );
  });
});
