describe("Outil - Dossier Licenciement", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/procedure-licenciement");
    cy.contains("Comprendre sa procédure de licenciement");
  });
});
