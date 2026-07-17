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
    await expect(h2s.count()).resolves.toBeGreaterThanOrEqual(13);
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
      "Renouvellement de la période d'essai : comment faire ? quelles conditions ? "
    );

    await page
      .getByLabel("Je ne souhaite pas renseigner ma convention collective.")
      .check({ force: true });
    await page
      .getByRole("button", { name: "Afficher les informations" })
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

  test("je vois une page contribution pour une CC", async ({
    page,
    baseURL,
  }) => {
    // referer interne : une arrivée externe réinitialise le bloc de sélection
    // (cf. test dédié) ; ici on vérifie le comportement en navigation interne.
    await page.goto(
      "/contribution/675-la-periode-dessai-peut-elle-etre-renouvelee",
      { referer: baseURL }
    );
    await expect(
      page.getByText(
        "Maisons à succursales de vente au détail d'habillement (IDCC 0675)"
      )
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Votre réponse pour la convention : Maisons à succursales de vente au détail d'habillement",
      })
    ).toBeVisible();

    // Navigation interne : le bloc est en état « sélectionné » (bouton
    // « Réinitialiser »), la réponse est visible.
    await expect(
      page.getByRole("button", { name: "Réinitialiser" })
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
    baseURL,
  }) => {
    await page.goto(
      "/contribution/3248-combien-de-fois-le-contrat-de-travail-peut-il-etre-renouvele#cdd",
      { referer: baseURL }
    );
    await expect(page.locator('[aria-expanded="true"]')).toContainText("CDD");
  });

  test("une arrivée externe sur une contribution CC réinitialise le bloc de sélection", async ({
    page,
  }) => {
    // Pas de referer : simule une arrivée depuis un moteur de recherche ou un
    // accès direct.
    await page.goto(
      "/contribution/675-la-periode-dessai-peut-elle-etre-renouvelee"
    );

    await expect(
      page.getByText(
        "Personnalisez la réponse avec votre convention collective"
      )
    ).toBeVisible();
    // Le bloc « résumé + Réinitialiser » (donc le libellé « (IDCC 0675) »)
    // n'est pas affiché tant qu'on n'a pas confirmé/choisi une CC.
    await expect(
      page.getByText(
        "Maisons à succursales de vente au détail d'habillement (IDCC 0675)"
      )
    ).toBeHidden();
    // Arrivée externe (Google) : la réponse de la CC reste affichée, seul le
    // bloc de sélection est présenté en haut.
    await expect(
      page
        .getByText(
          /Les conditions de renouvellement de la période d.essai varient/
        )
        .first()
    ).toBeVisible();
    // Aucun des 3 boutons radio n'est pré-sélectionné.
    await expect(
      page.getByLabel(
        "Je sais quelle est ma convention collective et je la saisis."
      )
    ).not.toBeChecked();
    await expect(
      page.getByLabel(
        "Je cherche mon entreprise pour trouver ma convention collective."
      )
    ).not.toBeChecked();
    await expect(
      page.getByLabel("Je ne souhaite pas renseigner ma convention collective.")
    ).not.toBeChecked();

    // L'usager choisit la CC de la page : bascule en état résultat sur place.
    await page
      .getByLabel(
        "Je sais quelle est ma convention collective et je la saisis."
      )
      .check({ force: true });
    await page.getByTestId("AgreementSearchAutocomplete").fill("675");
    await page
      .getByText(
        "Maisons à succursales de vente au détail d'habillement (IDCC 675)"
      )
      .click();
    await page
      .getByRole("button", { name: "Afficher les informations" })
      .click();

    await expect(
      page.getByText(
        "Maisons à succursales de vente au détail d'habillement (IDCC 0675)"
      )
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Réinitialiser" })
    ).toBeVisible();
    await expect(
      page
        .getByText(
          /Les conditions de renouvellement de la période d.essai varient/
        )
        .first()
    ).toBeVisible();
    // Le focus est déplacé sur le titre du bloc résultat (accessibilité).
    await expect(
      page.getByText("Réponse personnalisée pour la convention collective")
    ).toBeFocused();
    // Pas de navigation : on reste sur la même URL.
    expect(page.url()).toContain(
      "/contribution/675-la-periode-dessai-peut-elle-etre-renouvelee"
    );
  });

  test("depuis une page CC (navigation interne), « Réinitialiser » ramène au bloc de sélection en gardant la réponse et y place le focus", async ({
    page,
    baseURL,
  }) => {
    // Arrivée interne : le bloc est en état « résumé » (bouton « Réinitialiser »).
    await page.goto(
      "/contribution/675-la-periode-dessai-peut-elle-etre-renouvelee",
      { referer: baseURL }
    );
    await expect(
      page.getByText(
        "Maisons à succursales de vente au détail d'habillement (IDCC 0675)"
      )
    ).toBeVisible();
    const answerTitle = page.getByRole("heading", {
      level: 2,
      name: "Votre réponse pour la convention : Maisons à succursales de vente au détail d'habillement",
    });
    await expect(answerTitle).toBeVisible();

    await page.getByRole("button", { name: "Réinitialiser" }).click();

    // On repasse au bloc de sélection à 3 radios ; la réponse reste affichée.
    await expect(
      page.getByText(
        "Personnalisez la réponse avec votre convention collective"
      )
    ).toBeVisible();
    await expect(
      page.getByText(
        "Maisons à succursales de vente au détail d'habillement (IDCC 0675)"
      )
    ).toBeHidden();
    await expect(answerTitle).toBeVisible();

    // Le focus est déplacé sur le titre du bloc de sélection (accessibilité).
    await expect(page.locator("#personalize-response-title")).toBeFocused();

    // Aucun radio n'est pré-coché après réinitialisation.
    await expect(
      page.getByLabel(
        "Je sais quelle est ma convention collective et je la saisis."
      )
    ).not.toBeChecked();

    // « Réinitialiser » ne navigue pas : on reste sur la même URL.
    expect(page.url()).toContain(
      "/contribution/675-la-periode-dessai-peut-elle-etre-renouvelee"
    );
  });

  test("depuis une contribution CC réinitialisée, « je ne souhaite pas renseigner » mène à la réponse Code du travail", async ({
    page,
  }) => {
    await page.goto(
      "/contribution/675-la-periode-dessai-peut-elle-etre-renouvelee"
    );

    await expect(
      page.getByText(
        "Personnalisez la réponse avec votre convention collective"
      )
    ).toBeVisible();

    await page
      .getByLabel("Je ne souhaite pas renseigner ma convention collective.")
      .check({ force: true });
    await page
      .getByRole("button", { name: "Afficher les informations" })
      .click();

    await page.waitForURL(
      "**/contribution/la-periode-dessai-peut-elle-etre-renouvelee#cdt"
    );
    // Le choix reste coché et la réponse générique est affichée avec son H2.
    await expect(
      page.getByLabel("Je ne souhaite pas renseigner ma convention collective.")
    ).toBeChecked();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Réponse d'après le Code du Travail",
      })
    ).toBeVisible();
    await expect(
      page.getByText(
        "La convention collective ou l’accord de branche étendu prévoit le renouvellement de la période d’essai",
        { exact: false }
      )
    ).toBeVisible();
  });
});
