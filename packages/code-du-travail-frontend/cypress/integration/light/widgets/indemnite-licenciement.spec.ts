describe("Widget - Indemnité de licenciement", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/indemnite-licenciement");
    cy.contains("Calculer l'indemnité de licenciement", {
      timeout: 10000,
    });
  });
});
