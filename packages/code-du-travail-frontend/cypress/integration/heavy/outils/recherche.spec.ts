describe("Outil - Moteur de recherche", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/recherche");
    cy.contains("Trouvez les réponses à vos questions en droit du travail");
  });
});
