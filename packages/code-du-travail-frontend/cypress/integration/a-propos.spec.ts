describe("A propos", () => {
  it("should works correctly", () => {
    cy.visit("/a-propos");

    cy.contains("Qu’est-ce que le Code du travail numérique");
    cy.contains("Qui sommes-nous");
  });
});
