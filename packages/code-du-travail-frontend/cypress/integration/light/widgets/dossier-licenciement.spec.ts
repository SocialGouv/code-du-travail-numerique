import "cypress-iframe";

describe("Widget - Dossier Licenciement", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/procedure-licenciement");
    cy.iframe()
      .contains("Comprendre sa procédure de licenciement")
      .should("be.visible");
  });
});
