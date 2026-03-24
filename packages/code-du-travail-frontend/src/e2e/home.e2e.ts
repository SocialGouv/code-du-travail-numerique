import { expect, test } from "@playwright/test";
import { expectTitleAndMetaDescriptionEqual } from "./helpers";

test.describe("Page d'accueil", () => {
  test("Affiche les éléments requis", async ({ page }) => {
    await page.goto("/");
    await expectTitleAndMetaDescriptionEqual(
      page,
      "Code du travail numérique",
      "Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (contrat de travail, congés payés, formation, démission, indemnités)."
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Bienvenue sur le Code du travail numérique"
    );

    await expect(page.getByRole("heading", { level: 2 }).first()).toHaveText(
      "Obtenez les réponses à vos questions sur le droit du travail."
    );

    await expect(page.getByRole("heading", { level: 2 }).nth(1)).toHaveText(
      "Comprendre le droit du travail"
    );

    await expect(page.getByText("Que souhaitez-vous savoir ?")).toBeVisible();
    await expect(page.locator("#search-home-autocomplete")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Voir tous les résultats" })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "Voir tous les simulateurs" })
    ).toHaveAttribute("href", "/outils");
    await expect(page.locator("#home-outils").locator("a")).toHaveCount(5);

    await expect(
      page.getByRole("link", { name: "Parcourir les modèles" })
    ).toHaveAttribute("href", "/modeles-de-courriers");
    await expect(
      page.locator("#home-modeles-de-courriers").locator("a")
    ).toHaveCount(5);

    await expect(
      page.getByRole("link", { name: "Voir toutes les fiches pratiques" })
    ).toHaveAttribute("href", "/contribution");
    await expect(
      page.locator("#home-fiches-pratiques").locator("a")
    ).toHaveCount(5);

    await expect(
      page.getByRole("link", {
        name: "Voir toutes les conventions collectives",
      })
    ).toHaveAttribute("href", "/convention-collective");
    await expect(
      page.locator("#home-convention-collective").locator("a")
    ).toHaveCount(5);

    await expect(
      page.getByRole("link", { name: "Voir tous les thèmes" })
    ).toHaveAttribute("href", "/themes");
    const themesSection = page.locator("#home-themes");
    await expect(themesSection).toContainText("Thèmes");
    await expect(themesSection).toContainText("Embauche");
    await expect(themesSection).toContainText("Contrat de travail");
    await expect(themesSection).toContainText("Rémunération");
    await expect(themesSection).toContainText("Temps de travail");
    await expect(themesSection).toContainText("Congés");
    await expect(themesSection).toContainText("Formation");
    await expect(themesSection).toContainText(
      "Hygiène, sécurité et conditions de travail"
    );
    await expect(themesSection).toContainText(
      "Représentation du personnel et négociation collective"
    );
    await expect(themesSection).toContainText("Fin et rupture du contrat");
  });

  test("Devrait afficher les suggestions quand on cherche un mot", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Bienvenue sur le Code du travail numérique"
    );

    await page.locator("#search-home-autocomplete").fill("congés");

    // Pick the first available suggestion (content can evolve)
    const suggestionsList = page.locator("#search-home-autocomplete-listbox");
    const firstOption = suggestionsList.locator("li[role='option']").first();
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    // Search V2 displays presearch results preview directly on home
    await expect(page.locator("#search-results-heading-home")).toHaveText(
      "Cela pourrait vous intéresser ?"
    );
    const resultsList = page
      .locator("#search-results-heading-home")
      .locator("xpath=ancestor::section")
      .locator("ul[role='list'] li");
    await expect(resultsList.first()).toBeVisible();

    // And the CTA still navigates to the full search page
    await page.getByRole("button", { name: "Voir tous les résultats" }).click();
    await expect(page).toHaveURL(/\/recherche\?query=/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Rechercher" })
    ).toBeVisible();
  });
});
