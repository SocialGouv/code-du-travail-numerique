describe("Plan du site", () => {
  it("je vois le plan du site", () => {
    // cy.visit("/");
    // cy.findByRole("heading", { level: 1 })
    //   .should("have.text", "Bienvenue sur le Code du travail numérique")
    //   .click();
    // cy.get("a").contains("Plan du site").click();
    cy.visit("/plan-du-site");
    cy.findByRole("heading", { level: 1 }).should("have.text", "Plan du site");
    cy.contains("a", "Page d'accueil");
    cy.contains("a", "Boîte à outils");
    cy.contains("a", "Vos fiches pratiques");
    cy.contains("a", "Votre convention collective");
    cy.contains("a", "Thèmes");
  });
});
