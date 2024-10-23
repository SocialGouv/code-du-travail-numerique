import "cypress-iframe";

describe("Widget - Préavis de démission", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/preavis-demission");
    cy.iframe()
      .contains("Calculer le préavis de démission")
      .should("be.visible");
  });
});
