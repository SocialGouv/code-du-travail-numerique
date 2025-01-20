describe("Outil - Trouver sa convention collective", () => {
  it("Recherche de convention collective je la saisis", () => {
    cy.visit("/widgets/convention-collective");
    cy.checkNoIndex();
    cy.canonicalUrlEqual("/outils/convention-collective");
  });
});
