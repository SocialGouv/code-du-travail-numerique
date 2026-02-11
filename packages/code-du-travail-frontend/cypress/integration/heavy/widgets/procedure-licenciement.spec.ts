import "cypress-iframe";

describe("Widget - Procédure de licenciement", () => {
  it("should display the legacy widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/procedure-licenciement-legacy"
    );
    cy.iframe()
      .contains("Comprendre sa procédure de licenciement")
      .should("be.visible");
  });

  it("should display the widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/procedure-licenciement"
    );
    cy.iframe()
      .contains("Comprendre sa procédure de licenciement")
      .should("be.visible");
  });
});
