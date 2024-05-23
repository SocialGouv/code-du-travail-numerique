describe("Outil - Modèles de courrier", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/modeles");
    cy.contains("LUTTE CONTRE LE HARCELEMENT SEXUEL");
  });
});
