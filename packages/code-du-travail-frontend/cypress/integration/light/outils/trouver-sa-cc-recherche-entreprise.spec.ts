describe("Outil - Trouver sa convention collective", () => {
  it("Recherche de convention collective par entreprise", () => {
    cy.visit("/outils/convention-collective");
    cy.get("h1").should("have.text", "Trouver sa convention collective");
    cy.contains("Je la recherche").click();

    cy.get("#enterprise-search").type("82129756100010", { delay: 0 });
    cy.get("#enterprise-search-address").type("75018{downArrow}{enter}", {
      delay: 3000,
      force: true,
    });
    cy.get('button[type="submit"]').last().click();
    cy.contains("BOUILLON PIGALLE").click();

    cy.get("p").should(
      "contain",
      "1 convention collective trouvée pour « BOUILLON PIGALLE, 22 BOULEVARD DE CLICHY 75018 PARIS »"
    );

    cy.contains("Précédent").click();
    cy.get("#enterprise-search").clear();
    cy.get("#enterprise-search").type("CARREFOUR BANQUE", { delay: 0 });
    cy.get("#enterprise-search-address").clear();
    cy.get('button[type="submit"]').last().click();
    cy.contains("CARREFOUR BANQUE").click();
    cy.get("p").should(
      "contain",
      "2 conventions collectives trouvées pour « CARREFOUR BANQUE, 13 QUAI DE LA MARNE 51200 EPERNAY »"
    );
    cy.contains("Banque IDCC2120")
      .should("have.prop", "href")
      .and(
        "equal",
        `${Cypress.config().baseUrl}/convention-collective/2120-banque`
      );
  });
});
