describe("Droit du travail", () => {
  it("should works correctly", () => {
    cy.visit("/droit-du-travail");

    cy.contains("Qu’est-ce que le droit du travail");
    cy.contains("Quels sont les textes à l’origine du droit du travail");
    cy.contains("Existe-t-il une hiérarchie entre les textes");
  });
});
