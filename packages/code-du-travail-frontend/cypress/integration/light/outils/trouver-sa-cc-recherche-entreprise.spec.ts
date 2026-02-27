describe("Outil - Trouver sa convention collective", () => {
  it("Recherche de convention collective par entreprise", () => {
    cy.visit("/outils/convention-collective");
    cy.isIndexable();
    cy.titleAndMetaDescriptionEqual(
      "Simulateur - Trouver sa convention collective - Code du travail numérique",
      "Recherchez une convention collective par Entreprise, SIRET, Nom ou numéro IDCC"
    );
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Trouver sa convention collective")
      .should("be.visible");
    cy.contains(
      "Je cherche mon entreprise pour trouver ma convention collective"
    ).click();
    cy.urlEqual("/outils/convention-collective");
    cy.canonicalUrlEqual("/outils/convention-collective");
    cy.selectByLabel("Nom de votre entreprise ou numéro Siren/Siret").type(
      "82129756100010",
      { delay: 0 }
    );
    cy.selectByLabel("Code postal ou Ville")
      .as("locationInput")
      .type("75018", { delay: 50 });
    cy.get("@locationInput").type("{downArrow}{enter}", {
      delay: 200,
    });
    cy.get('button[type="submit"]').last().click();
    cy.urlEqual("/outils/convention-collective/entreprise");
    cy.canonicalUrlEqual("/outils/convention-collective");
    cy.contains("BOUILLON PIGALLE").click();

    cy.contains("1 convention collective trouvée :");

    cy.contains("Précédent").click();
    cy.selectByLabel("Nom de votre entreprise ou numéro Siren/Siret")
      .clear()
      .type("CARREFOUR BANQUE", { delay: 50 });
    cy.selectByLabel("Code postal ou Ville").clear();
    cy.get('button[type="submit"]').last().click();
    cy.contains("CARREFOUR BANQUE").click();
    cy.contains("2 conventions collectives trouvées :");
    cy.contains("Banque")
      .should("have.prop", "href")
      .and(
        "equal",
        `${Cypress.config().baseUrl}/convention-collective/2120-banque`
      );
  });
});
