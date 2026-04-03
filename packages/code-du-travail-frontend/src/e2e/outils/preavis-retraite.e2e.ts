import { test, expect } from "@playwright/test";

test.describe("Outil - Préavis de retraite", () => {
  test("Parcours sans convention collective avec validation des erreurs", async ({
    page,
  }) => {
    await page.goto("/outils/preavis-retraite");
    await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Calculer le préavis de départ à la retraite"
    );
    await page.getByRole("button", { name: "Commencer" }).click();

    // Origine du départ
    await expect(
      page.getByText("Qui est à l'origine du départ en retraite ?")
    ).toBeVisible();
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(
      page.getByText("Vous devez répondre à cette question")
    ).toBeVisible();

    // Check mise à la retraite note
    await page
      .locator("label")
      .filter({
        hasText: "L'employeur décide de mettre le salarié à la retraite",
      })
      .first()
      .click();
    await expect(
      page.getByText("Vous devez répondre à cette question")
    ).not.toBeVisible();
    await expect(page.getByText("À noter")).toBeVisible();
    await expect(
      page.getByText(
        "L'employeur qui décide une mise à la retraite doit en avoir informé son salarié"
      )
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: "L'employeur peut-il mettre d'office un salarié à la retraite",
      })
    ).toHaveAttribute(
      "href",
      "/fiche-service-public/un-employeur-peut-il-mettre-doffice-un-salarie-a-la-retraite"
    );

    // Switch to départ volontaire
    await page
      .locator("label")
      .filter({
        hasText: "Le salarié décide lui-même de partir à la retraite",
      })
      .first()
      .click();
    await expect(page.getByText("À noter")).not.toBeVisible();
    await expect(
      page.getByText(
        "L'employeur qui décide une mise à la retraite doit en avoir informé son salarié"
      )
    ).not.toBeVisible();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Convention collective - skip
    await expect(
      page.getByText("Quel est le nom de la convention collective applicable ?")
    ).toBeVisible();
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(
      page.getByText("Vous devez répondre à cette question")
    ).toBeVisible();
    await page
      .getByText(
        "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
      )
      .click();
    await expect(
      page.getByText("Vous devez répondre à cette question")
    ).not.toBeVisible();
    await expect(page.getByText("Attention")).toBeVisible();
    await expect(
      page.getByText(
        "Vous pouvez passer cette étape et poursuivre la simulation qui vous fournira un résultat basé sur le code du travail."
      )
    ).toBeVisible();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Travailleur handicapé
    await expect(
      page.getByText(
        "Le salarié concerné est-il reconnu en tant que travailleur handicapé ?"
      )
    ).toBeVisible();
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(
      page.getByText("Vous devez répondre à cette question")
    ).toBeVisible();
    await page.locator("label").filter({ hasText: /^Non$/ }).first().click();
    await expect(
      page.getByText("Vous devez répondre à cette question")
    ).not.toBeVisible();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Ancienneté
    await expect(
      page.getByText(
        "Le salarié a-t-il plus de 2 ans d'ancienneté dans l'entreprise (2 ans + 1 jour)"
      )
    ).toBeVisible();
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(
      page.getByText("Vous devez répondre à cette question")
    ).toBeVisible();
    await page.locator("label").filter({ hasText: /^Oui$/ }).first().click();
    await expect(
      page.getByText("Vous devez répondre à cette question")
    ).not.toBeVisible();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Result
    const result1 = page.locator("main");
    await expect(result1.getByText("2 mois").first()).toBeVisible();
    await expect(
      result1.getByText(
        "Durée prévue par le code du travail (durée légale) : 2 mois"
      )
    ).toBeVisible();
    await expect(
      result1.getByText(
        "Durée prévue par la convention collective (durée conventionnelle) : convention collective non renseignée"
      )
    ).toBeVisible();
    await expect(
      result1.getByText(
        "La convention collective n'ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale."
      )
    ).toBeVisible();
  });

  test("Parcours en connaissant sa convention collective", async ({ page }) => {
    await page.goto("/outils/preavis-retraite");
    await page.getByRole("button", { name: "Commencer" }).click();

    // Origine du départ
    await page
      .locator("label")
      .filter({
        hasText: "Le salarié décide lui-même de partir à la retraite",
      })
      .first()
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Convention collective
    await page
      .locator("label")
      .filter({
        hasText: "Je sais quelle est ma convention collective et je la saisis.",
      })
      .first()
      .click();
    const agreementInput = page.locator("#agreement-search-autocomplete");
    await agreementInput.click();
    await agreementInput.fill("843");
    await page
      .locator('ul[role="listbox"] li')
      .first()
      .waitFor({ timeout: 20_000 });
    await page
      .locator('ul[role="listbox"] li')
      .filter({ hasText: "Boulangerie" })
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Travailleur handicapé
    await expect(
      page.getByText(
        "Le salarié concerné est-il reconnu en tant que travailleur handicapé"
      )
    ).toBeVisible();
    await page.locator("label").filter({ hasText: /^Oui$/ }).first().click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Ancienneté
    await page.locator("label").filter({ hasText: /^Non$/ }).first().click();
    await expect(
      page.getByText(
        "Quelle est l'ancienneté du salarié dans l'entreprise en mois ?"
      )
    ).toBeVisible();
    await page.locator('input[name="seniorityInMonths"]').fill("10");
    await page.getByRole("button", { name: "Suivant" }).click();

    // Result
    const result2 = page.locator("main");
    await expect(
      result2.getByText("Préavis de départ à la retraite").first()
    ).toBeVisible();
    await expect(result2.getByText("2 mois").first()).toBeVisible();
    await expect(
      result2.getByText("Travailleur handicapé : Oui*")
    ).toBeVisible();
    await expect(
      result2.getByText(
        "Le salarié étant reconnu en tant que travailleur handicapé, la durée du préavis de départ à la retraite est doublée mais ne peut pas dépasser un maximum de 3 mois."
      )
    ).toBeVisible();
    await expect(
      result2.getByText(
        "Durée prévue par le code du travail (durée légale) : 2 mois"
      )
    ).toBeVisible();
    await expect(
      result2.getByText(
        "Durée prévue par la convention collective (durée conventionnelle) : 2 mois"
      )
    ).toBeVisible();
    await expect(
      result2.getByText(
        "Ce résultat tient compte de la majoration pour les travailleurs handicapés."
      )
    ).toBeVisible();
  });

  test("Parcours en ne connaissant pas sa convention collective", async ({
    page,
  }) => {
    await page.goto("/outils/preavis-retraite");
    await page.getByRole("button", { name: "Commencer" }).click();

    // Origine du départ
    await page
      .locator("label")
      .filter({
        hasText: "Le salarié décide lui-même de partir à la retraite",
      })
      .first()
      .click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Convention collective - recherche entreprise
    await expect(
      page.getByText("Quel est le nom de la convention collective applicable ?")
    ).toBeVisible();
    await page
      .locator("label")
      .filter({
        hasText:
          "Je ne sais pas quelle est ma convention collective et je la recherche.",
      })
      .first()
      .click();
    await expect(page.getByText("Précisez votre entreprise")).toBeVisible();
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(
      page.getByText("Vous devez sélectionner une entreprise")
    ).toBeVisible();

    // Search CARREFOUR BANQUE
    await page
      .getByLabel("Nom de votre entreprise ou numéro Siren/Siret")
      .fill("CARREFOUR BANQUE");
    await page.locator('button[type="submit"]').last().click();
    await page.getByText("CARREFOUR BANQUE").first().click();
    await expect(
      page.getByText("2 conventions collectives trouvées")
    ).toBeVisible();
    await expect(
      page.getByText("Sociétés financières IDCC 0478")
    ).toBeVisible();
    await expect(page.getByText("Banque IDCC 2120")).toBeVisible();
    await page
      .locator("label")
      .filter({ hasText: "Sociétés financières IDCC 0478" })
      .first()
      .click();
    await expect(
      page.getByText("Vous devez sélectionner une entreprise")
    ).not.toBeVisible();
    await expect(
      page.getByText(
        "Nous n'avons pas de réponse pour cette convention collective"
      )
    ).toBeVisible();

    // Modify search to BOURSORAMA
    await page.getByRole("button", { name: "Modifier" }).click();
    await page
      .getByLabel("Nom de votre entreprise ou numéro Siren/Siret")
      .clear();
    await page
      .getByLabel("Nom de votre entreprise ou numéro Siren/Siret")
      .fill("boursorama");

    const locationInput = page.getByTestId("locationSearchAutocomplete");
    await locationInput.fill("92100");
    await page
      .locator('[role="listbox"] [role="option"]')
      .first()
      .waitFor({ timeout: 15_000 });
    await locationInput.press("ArrowDown");
    await locationInput.press("Enter");

    await page.locator('button[type="submit"]').last().click();
    await page
      .getByText("BOURSORAMA (BOURSORAMA - BOURSORAMA BANQUE - BOURSOBANK)")
      .click();
    await expect(
      page.getByText("Vous avez sélectionné la convention collective")
    ).toBeVisible();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Travailleur handicapé
    await page.locator("label").filter({ hasText: /^Non$/ }).first().click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Ancienneté
    await page.locator("label").filter({ hasText: /^Oui$/ }).first().click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Result
    const result3 = page.locator("main");
    await expect(
      result3.getByText("Préavis de départ à la retraite").first()
    ).toBeVisible();
    await expect(result3.getByText("2 mois").first()).toBeVisible();
    await expect(
      result3.getByText(
        "Durée prévue par le code du travail (durée légale) : 2 mois"
      )
    ).toBeVisible();
    await expect(
      result3.getByText(
        "Durée prévue par la convention collective (durée conventionnelle) : pas de préavis"
      )
    ).toBeVisible();
    await expect(
      result3.getByText(
        "En l'absence de durée prévue par la convention collective, la durée de préavis à appliquer pour le salarié est donc la durée légale."
      )
    ).toBeVisible();
  });
});
