import "cypress-iframe";

describe("Widget - Préavis de démission", () => {
  it("should display the legacy widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/preavis-demission-legacy"
    );
    cy.iframe()
      .contains("Calculer le préavis de démission")
      .should("be.visible");
  });

  it("should display the widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/preavis-demission"
    );
    cy.iframe()
      .contains("Calculer le préavis de démission")
      .should("be.visible");
  });
});
