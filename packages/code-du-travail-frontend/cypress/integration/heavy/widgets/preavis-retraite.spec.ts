import "cypress-iframe";

describe("Widget - Préavis de retraite", () => {
  it("should display the widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/preavis-retraite"
    );
    cy.iframe()
      .contains("Calculer le préavis de départ à la retraite")
      .should("be.visible");
  });
});
