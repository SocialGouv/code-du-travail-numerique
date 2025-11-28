describe("Pages quoi de neuf ?", () => {
  it("je vois une page classique", () => {
    cy.visit("/quoi-de-neuf");
    cy.isIndexable();
    cy.canonicalUrlEqual("/quoi-de-neuf");
    cy.titleAndMetaDescriptionEqual(
      "Quoi de neuf",
      "Consultez les dernières évolutions et mises à jour du Code du travail numérique."
    );
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Quoi de neuf sur le code du travail ?"
    );
  });
});
