import "cypress-iframe";

describe("Widget - Indemnité de licenciement", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/indemnite-licenciement");
    cy.iframe()
      .contains("Calculer l'indemnité de licenciement")
      .should("be.visible");
  });
});
