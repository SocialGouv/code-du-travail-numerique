import "cypress-iframe";

describe("Widget - Préavis de licenciement", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/preavis-licenciement");
    cy.iframe()
      .contains("Calculer le préavis de licenciement")
      .should("be.visible");
  });
});
