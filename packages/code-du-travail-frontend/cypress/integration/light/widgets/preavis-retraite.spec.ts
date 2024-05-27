describe("Widget - Préavis de retraite", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/preavis-retraite");
    cy.contains("Calculer le préavis de départ à la retraite", {
      timeout: 10000,
    });
  });
});
