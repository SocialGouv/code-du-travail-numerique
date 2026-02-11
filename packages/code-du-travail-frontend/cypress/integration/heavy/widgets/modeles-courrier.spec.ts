import "cypress-iframe";

describe("Widget - Modèles de courrier", () => {
  it("should display the legacy widget", () => {
    cy.visit(
      "https://socialgouv.github.io/code-du-travail-numerique/modeles-legacy"
    );
    cy.iframe()
      .contains("LUTTE CONTRE LE HARCELEMENT SEXUEL")
      .should("be.visible");
  });

  it("s'affiche bien sur un site externe", () => {
    cy.visit("https://socialgouv.github.io/code-du-travail-numerique/modeles");
    cy.iframe()
      .contains("LUTTE CONTRE LE HARCELEMENT SEXUEL")
      .should("be.visible");
  });
});
