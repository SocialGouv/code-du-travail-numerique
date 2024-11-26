describe("Outil - Trouver sa convention collective", () => {
  it("Recherche de convention collective par entreprise", () => {
    cy.visit("/outils/convention-collective");
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Trouver sa convention collective")
      .click();
    cy.contains(
      "Je cherche mon entreprise pour trouver ma convention collective"
    ).click();
    cy.checkCanonical("/outils/convention-collective");
    // @ts-ignore
    cy.selectByLabel("Nom de votre entreprise ou numéro Siren/Siret").type(
      "82129756100010",
      { delay: 0 }
    );
    // @ts-ignore
    cy.selectByLabel("Code postal ou Ville (optionnel)")
      .as("locationInput")
      .type("7501");
    cy.get("@locationInput").type("8{downArrow}{enter}", {
      delay: 2000,
      force: true,
    });
    cy.get('button[type="submit"]').last().click();
    cy.contains("BOUILLON PIGALLE").click();

    cy.contains("1 convention collective trouvée pour :");

    cy.contains("Précédent").click();
    cy.selectByLabel("Nom de votre entreprise ou numéro Siren/Siret")
      .clear()
      .type("C")
      .type("A")
      .type("R")
      .type("R")
      .type("E")
      .type("F")
      .type("O")
      .type("U")
      .type("R")
      .type(" ")
      .type("B")
      .type("A")
      .type("N")
      .type("Q")
      .type("U")
      .type("E");
    // @ts-ignore
    cy.selectByLabel("Code postal ou Ville (optionnel)").clear();
    cy.get('button[type="submit"]').last().click();
    cy.contains("CARREFOUR BANQUE").click();
    cy.contains("2 conventions collectives trouvées pour :");
    cy.contains("Banque")
      .should("have.prop", "href")
      .and(
        "equal",
        `${Cypress.config().baseUrl}/convention-collective/2120-banque`
      );
  });
});
