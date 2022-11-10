describe("Outil - Trouver sa convention collective", () => {
  it("Recherche de convention collective par entreprise", () => {
    cy.visit("/outils/convention-collective");
    cy.get("h1").should("have.text", "Trouver sa convention collective");
    cy.contains("Je la recherche").click();

    cy.get("#enterprise-search").type("82161143100015");
    cy.contains("CODEURS EN LIBERTE").click();

    cy.get("p").should(
      "contain",
      "1 convention collective trouvée pour « CODEURS EN LIBERTE »"
    );

    cy.contains("Précédent").click();
    cy.get("#enterprise-search").type("fnac");
    cy.get("#enterprise-search-address").type("75001");
    cy.contains("FNAC PARIS").click();
    cy.get("p").should(
      "contain",
      "2 conventions collectives trouvées pour « FNAC PARIS »"
    );
    cy.contains(
      "Commerces et services de l'audiovisuel, de l'électronique et de l'équipement ménager IDCC1686"
    )
      .should("have.prop", "href")
      .and(
        "equal",
        Cypress.config().baseUrl +
          "/convention-collective/1686-commerces-et-services-de-laudiovisuel-de-lelectronique-et-de-lequipemen"
      );
  });
});
