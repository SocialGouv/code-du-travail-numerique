import { test, expect } from "@playwright/test";

// Pas de `getByTestId` ici : le build de production supprime les `data-testid`
// (next.config.mjs, `reactRemoveProperties`), et l'e2e tourne contre la review
// app. On cible donc les rôles, les titres et les liens.
const themeSelect = "#input-contact-theme";
const phoneStep = { name: /Par téléphone/ };
const errorAlert = ".fr-alert--error";

test.describe("Page Contacter nos services en région", () => {
  test("Mène au numéro des services de renseignement pour le secteur privé", async ({
    page,
  }) => {
    await page.goto("/besoin-plus-informations");

    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Contacter nos services en région"
    );

    // Le bouton n'est jamais grisé : valider à vide affiche une erreur.
    const suivant = page.getByRole("button", { name: "Suivant" });
    await expect(suivant).toBeEnabled();
    await suivant.click();
    await expect(
      page.getByText("Sélectionnez un thème pour continuer.")
    ).toBeVisible();

    await page.locator(themeSelect).selectOption("secteur-prive");
    await suivant.click();

    await expect(page.getByRole("heading", phoneStep)).toBeVisible();
    await expect(page.locator('a[href="tel:0806000126"]')).toBeVisible();
  });

  test("Permet de revenir à l'écran de sélection en conservant le thème", async ({
    page,
  }) => {
    await page.goto("/besoin-plus-informations");

    await page.locator(themeSelect).selectOption("secteur-prive");
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(page.getByRole("heading", phoneStep)).toBeVisible();

    await page.getByRole("button", { name: "Précédent" }).click();

    await expect(page.locator(themeSelect)).toHaveValue("secteur-prive");
    await expect(page.getByRole("button", { name: "Suivant" })).toBeEnabled();
  });

  test("Bloque sur l'écran de sélection et redirige pour un thème hors périmètre", async ({
    page,
  }) => {
    await page.goto("/besoin-plus-informations");

    await page.locator(themeSelect).selectOption("secteur-public");
    await page.getByRole("button", { name: "Suivant" }).click();

    const alert = page.locator(errorAlert);
    await expect(alert).toBeVisible();
    await expect(alert).toContainText("Nous ne traitons pas ces demandes");
    await expect(
      alert.getByRole("link", { name: /portail de la fonction publique/ })
    ).toHaveAttribute("target", "_blank");

    // Le parcours ne continue pas : on reste sur le choix du thème.
    await expect(page.getByRole("heading", phoneStep)).toHaveCount(0);
    await expect(page.locator(themeSelect)).toBeVisible();

    // Choisir un thème traité efface l'erreur et débloque le parcours.
    await page.locator(themeSelect).selectOption("secteur-prive");
    await expect(alert).toHaveCount(0);
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(page.getByRole("heading", phoneStep)).toBeVisible();
  });

  test("Est accessible depuis le bouton de contact du pied de page", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .locator("#more-info")
      .getByRole("link", { name: "Contacter nos services en région" })
      .click();

    await expect(page).toHaveURL(/\/besoin-plus-informations$/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Contacter nos services en région"
    );
  });
});
