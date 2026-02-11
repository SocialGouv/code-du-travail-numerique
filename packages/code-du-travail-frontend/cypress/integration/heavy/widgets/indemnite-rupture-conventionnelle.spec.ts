import "cypress-iframe";

describe("Widget - Indemnité de rupture conventionnelle", () => {
  it("should display the legacy widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/indemnite-rupture-conventionnelle-legacy"
    );
    cy.iframe()
      .contains("Calculer l'indemnité de rupture conventionnelle")
      .should("be.visible");
  });

  it("should display the widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/indemnite-rupture-conventionnelle"
    );
    cy.iframe()
      .contains("Calculer l'indemnité de rupture conventionnelle")
      .should("be.visible");
  });
});
