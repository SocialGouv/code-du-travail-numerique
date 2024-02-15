describe("Politique de confidentialité", () => {
  it("should works correctly", () => {
    cy.visit("/politique-confidentialite");

    cy.contains("Traitement des données à caractère personnel");
    cy.contains("Cookies");
  });
});
