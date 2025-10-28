describe("Glossaire", () => {
  it("should works correctly", () => {
    cy.visit("/glossaire");

    cy.contains(
      "Les définitions de ce glossaire, disponibles en surbrillance dans les textes des réponses"
    );

    cy.contains("Abrogation").click();

    cy.contains("Définition");
    cy.contains("Sources");

    cy.get("#fr-header-main-navigation").contains("Code du travail").click();
    cy.get("#fr-header-main-navigation").contains("Glossaire").click();

    cy.contains(
      "Les définitions de ce glossaire, disponibles en surbrillance dans les textes des réponses"
    );
  });
});
