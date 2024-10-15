describe("Outil - Trouver sa convention collective", () => {
  it("Recherche de convention collective par entreprise", () => {
    cy.visit("/outils/convention-collective");
    cy.get("h1").should("have.text", "Trouver sa convention collective");
    cy.contains("Je la recherche").click();
    cy.checkCanonical("/outils/convention-collective");
    cy.get("#enterprise-search").type("82129756100010", { delay: 0 });
    cy.get("#enterprise-search-address").type("7501");
    cy.get("#enterprise-search-address").type("8{downArrow}{enter}", {
      delay: 2000,
      force: true,
    });
    cy.get('button[type="submit"]').last().click();
    cy.contains("BOUILLON PIGALLE").click();

    cy.get("p").should(
      "contain",
      "1 convention collective trouvée pour « BOUILLON PIGALLE, 22 BOULEVARD DE CLICHY 75018 PARIS »"
    );

    cy.contains("Précédent").click();
    cy.get("#enterprise-search")
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
    cy.get("#enterprise-search-address").clear();
    cy.get('button[type="submit"]').last().click();
    cy.contains("CARREFOUR BANQUE").click();
    cy.get("p").should(
      "contain",
      "2 conventions collectives trouvées pour « CARREFOUR BANQUE, 37 AVENUE D'ESSOMES 02400 CHATEAU-THIERRY »"
    );
    cy.contains("Banque IDCC2120")
      .should("have.prop", "href")
      .and(
        "equal",
        `${Cypress.config().baseUrl}/convention-collective/2120-banque`
      );
  });
});
