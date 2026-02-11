import "cypress-iframe";

describe("Widget - Moteur de recherche", () => {
  it("should display the legacy widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/recherche-legacy"
    );
    cy.iframe()
      .contains("Trouvez les réponses à vos questions en droit du travail")
      .should("be.visible");
  });

  it("should display the widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/recherche"
    );
    cy.iframe()
      .contains("Trouvez les réponses à vos questions en droit du travail")
      .should("be.visible");
  });
});
