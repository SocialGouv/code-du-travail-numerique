describe("Outil - Préavis de démission", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/preavis-demission");
    cy.contains("Calculer le préavis de démission");
  });
});
