import "cypress-iframe";

describe("Widget - Préavis de licenciement", () => {
  it("should display the legacy widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/preavis-licenciement-legacy"
    );
    cy.iframe()
      .contains("Calculer le préavis de licenciement")
      .should("be.visible");
  });

  it("should display the widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/preavis-licenciement"
    );
    cy.iframe()
      .contains("Calculer le préavis de licenciement")
      .should("be.visible");
  });
});
