import "cypress-iframe";

describe("Widget - Préavis de retraite", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/preavis-retraite");
    cy.iframe()
      .contains("Calculer le préavis de départ à la retraite")
      .should("be.visible");
  });
});
