describe("Outil - Préavis de licenciement", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/preavis-licenciement");
    cy.contains("Calculer le préavis de licenciement");
  });
});
