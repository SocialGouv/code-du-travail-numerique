describe("Statistiques", () => {
  it("should display the page correctly", () => {
    cy.visit("/stats");

    cy.contains("Statistiques d’utilisation");

    cy.contains("Contenus référencés");

    cy.contains("Recherches");

    cy.contains("Visites");

    cy.contains("Consultations");

    cy.contains("Statistiques d’utilisation depuis le");
  });
});
