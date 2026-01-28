describe("Contributions", () => {
  it("rechercher et voir une contribution", () => {
    cy.visit("/");
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();
    cy.get("#search-home-autocomplete").type("durée maximale CDD");
    cy.contains("button", "Voir tous les résultats").click();
    cy.findAllByRole("heading", { level: 3 }).its("length").should("be.gte", 1);
    cy.contains("Durée maximale d'un CDD").click();

    cy.urlEqual("/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd");
  });
});
