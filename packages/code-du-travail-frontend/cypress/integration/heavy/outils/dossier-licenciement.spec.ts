import "cypress-iframe";

describe("Outil - Dossier Licenciement", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/procedure-licenciement");
    cy.iframe("#simulateurEmbauche")
      .contains("Coût total employeur")
      .should("be.visible");
  });
});
