describe("Outil - Indemnité de licenciement", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/indemnite-licenciement");
    cy.iframe("#simulateurEmbauche")
      .contains("Coût total employeur")
      .should("be.visible");
  });
});
