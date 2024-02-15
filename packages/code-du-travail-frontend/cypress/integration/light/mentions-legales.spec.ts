describe("Mentions Légales", () => {
  it("should works correctly", () => {
    cy.visit("/mentions-legales");

    cy.contains("Directeur de la publication");
    cy.contains("Hébergement");
    cy.contains("Accessibilité");
    cy.contains("Sécurité");
  });
});
