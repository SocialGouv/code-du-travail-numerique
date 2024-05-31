import "cypress-iframe";

describe("Widget - Modèles de courrier", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/modeles");
    cy.iframe()
      .contains("LUTTE CONTRE LE HARCELEMENT SEXUEL")
      .should("be.visible");
  });
});
