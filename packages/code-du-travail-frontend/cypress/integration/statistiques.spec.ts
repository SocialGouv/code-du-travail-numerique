describe("Statistique", () => {
  it("should display the page correctly", () => {
    cy.visit("/stats");

    cy.contains("Statistiques d’utilisation").click();

    cy.contains("Statistiques d’utilisation depuis le");
  });
});
