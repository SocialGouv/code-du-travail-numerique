describe("Pages informations", () => {
  it("je vois une page info classique", () => {
    cy.visit("/politique-confidentialite");
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Politique de confidentialité"
    );
    cy.get("body").should(
      "contain",
      "Le Code du travail numérique ne vous demande ni ne stocke d’information nominative."
    );
  });
});
