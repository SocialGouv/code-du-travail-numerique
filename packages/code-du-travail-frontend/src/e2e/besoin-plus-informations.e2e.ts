import { test, expect, Page } from "@playwright/test";

// Pas de `getByTestId` ici : le build de production supprime les `data-testid`
// (next.config.mjs, `reactRemoveProperties`), et l'e2e tourne contre la review
// app. On cible donc les rôles, les titres et les liens.
const themeSelect = "#input-contact-theme";
const departementSelect = "#input-contact-departement";
const channelStep = { name: /Choisir votre moyen de contact/ };
const phoneStep = { name: /Par téléphone/ };
const rdvStep = { name: /Prendre rendez-vous/ };
const errorAlert = ".fr-alert--error";

const suivant = (page: Page) => page.getByRole("button", { name: "Suivant" });
const precedent = (page: Page) =>
  page.getByRole("button", { name: "Précédent" });

const goToChannelStep = async (page: Page) => {
  await page.goto("/besoin-plus-informations");
  await page.locator(themeSelect).selectOption("secteur-prive");
  await suivant(page).click();
  await expect(page.getByRole("heading", channelStep)).toBeVisible();
};

test.describe("Page Contacter nos services en région", () => {
  test("Mène au numéro des services de renseignement par le canal téléphone", async ({
    page,
  }) => {
    await page.goto("/besoin-plus-informations");

    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Contacter nos services en région"
    );

    // Le bouton n'est jamais grisé : valider à vide affiche une erreur.
    await expect(suivant(page)).toBeEnabled();
    await suivant(page).click();
    await expect(
      page.getByText("Sélectionnez un thème pour continuer.")
    ).toBeVisible();

    await page.locator(themeSelect).selectOption("secteur-prive");
    await suivant(page).click();

    await expect(page.getByRole("heading", channelStep)).toBeVisible();
    await expect(page.getByText("Étape 2 sur 3")).toBeVisible();

    // Même parti pris à l'écran 2.
    await suivant(page).click();
    await expect(
      page.getByText("Sélectionnez un moyen de contact pour continuer.")
    ).toBeVisible();

    await page.getByRole("radio", { name: "Téléphone" }).check();
    await suivant(page).click();

    await expect(page.getByRole("heading", phoneStep)).toBeVisible();
    await expect(page.locator('a[href="tel:0806000126"]')).toBeVisible();
    await expect(suivant(page)).toHaveCount(0);
  });

  test("Mène à la page de prise de rendez-vous de la région pour le canal rendez-vous", async ({
    page,
  }) => {
    await goToChannelStep(page);

    // Deux canaux seulement : le formulaire n'est pas livré.
    await expect(page.getByRole("radio")).toHaveCount(2);

    await page.getByRole("radio", { name: "Rendez-vous sur place" }).check();
    await expect(
      page.getByText(/La prise de rendez-vous est disponible dans les régions/)
    ).toBeVisible();
    await suivant(page).click();

    await expect(page.getByRole("heading", rdvStep)).toBeVisible();
    await expect(page.getByText("Étape 3 sur 3")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Prendre rendez-vous/ })
    ).toHaveCount(0);

    // Seuls les départements des régions ouvertes sont proposés.
    const options = page.locator(`${departementSelect} option`);
    await expect(options.filter({ hasText: "69 - Rhône" })).toHaveCount(1);
    await expect(options.filter({ hasText: "Paris" })).toHaveCount(0);

    await page.locator(departementSelect).selectOption("69");
    await expect(
      page.getByText(
        "Vous allez être dirigé vers le site de prise de rendez-vous de votre région."
      )
    ).toBeVisible();

    const link = page.getByRole("link", { name: /Prendre rendez-vous/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("href", /^https:\/\//);
    await expect(
      page.getByText(/ils ne sont pas compétents pour/)
    ).toBeVisible();
    await expect(suivant(page)).toHaveCount(0);
  });

  test("Permet de revenir en arrière en conservant les choix", async ({
    page,
  }) => {
    await goToChannelStep(page);
    await page.getByRole("radio", { name: "Téléphone" }).check();
    await suivant(page).click();
    await expect(page.getByRole("heading", phoneStep)).toBeVisible();

    await precedent(page).click();
    await expect(page.getByRole("heading", channelStep)).toBeVisible();
    await expect(page.getByRole("radio", { name: "Téléphone" })).toBeChecked();

    await precedent(page).click();
    await expect(page.locator(themeSelect)).toHaveValue("secteur-prive");
    await expect(suivant(page)).toBeEnabled();
    await expect(precedent(page)).toHaveCount(0);
  });

  test("Bloque sur l'écran de sélection et redirige pour un thème hors périmètre", async ({
    page,
  }) => {
    await page.goto("/besoin-plus-informations");

    await page.locator(themeSelect).selectOption("secteur-public");
    await suivant(page).click();

    const alert = page.locator(errorAlert);
    await expect(alert).toBeVisible();
    await expect(alert).toContainText("Nous ne traitons pas ces demandes");
    await expect(alert).toContainText(
      "Votre demande concerne le secteur public"
    );
    await expect(
      alert.getByRole("link", { name: /fonction-publique\.gouv\.fr/ })
    ).toHaveAttribute("target", "_blank");

    // Le parcours ne continue pas : on reste sur le choix du thème.
    await expect(page.getByRole("heading", channelStep)).toHaveCount(0);
    await expect(page.locator(themeSelect)).toBeVisible();

    // Choisir un thème traité efface l'erreur et débloque le parcours.
    await page.locator(themeSelect).selectOption("secteur-prive");
    await expect(alert).toHaveCount(0);
    await suivant(page).click();
    await expect(page.getByRole("heading", channelStep)).toBeVisible();
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
