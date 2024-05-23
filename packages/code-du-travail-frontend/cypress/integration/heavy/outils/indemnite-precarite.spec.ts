describe("Outil - Indemnité de Precarite", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/indemnite-precarite");
    cy.contains("Calculer l'indemnité de précarité");
  });
});
