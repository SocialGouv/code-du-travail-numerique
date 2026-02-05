import "cypress-iframe";

describe("Widget - Indemnité de Precarite", () => {
  it("should display the widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/indemnite-precarite"
    );
    cy.iframe()
      .contains("Calculer l'indemnité de précarité")
      .should("be.visible");
  });
});
