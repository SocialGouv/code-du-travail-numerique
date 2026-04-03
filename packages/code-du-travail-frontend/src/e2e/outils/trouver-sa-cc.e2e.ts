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
    await expect(page).toHaveTitle(
      "Simulateur - Trouver sa convention collective - Code du travail numérique"
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
});
