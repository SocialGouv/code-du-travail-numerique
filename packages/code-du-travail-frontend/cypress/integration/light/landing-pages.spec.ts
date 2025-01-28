describe("Landing pages", () => {
  it("je vois une page convention collective", () => {
    cy.visit(
      "/convention-collective/1686-commerces-et-services-de-laudiovisuel-de-lelectronique-et-de-lequipemen"
    );
    cy.get("h1").should(
      "have.text",
      "Commerces et services de l'audiovisuel, de l'électronique et de l'équipement ménager"
    );
    cy.get("body").should("contain", "Source: Légifrance");
  });

  it("je vois la page à propos", () => {
    cy.visit("/a-propos");
    cy.findByRole("heading", { level: 1 }).should("have.text", "À propos");
    cy.contains("Qu’est-ce que le Code du travail numérique");
    cy.contains("Qui sommes-nous");
  });

  it("je vois la page déclaration d'accessibilité", () => {
    cy.visit("/accessibilite");
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Déclaration d'accessibilité"
    );
    cy.contains("État de conformité");
    cy.contains("[75%] des critères du RGAA version 4.1 sont respectés");
  });

  it("je vois la page droit du travail", () => {
    cy.visit("/droit-du-travail");

    cy.contains("Qu’est-ce que le droit du travail");
    cy.contains("Quels sont les textes à l’origine du droit du travail");
    cy.contains("Existe-t-il une hiérarchie entre les textes");
  });

  it("je vois la page mention légale", () => {
    cy.visit("/mentions-legales");

    cy.contains("Directeur de la publication");
    cy.contains("Hébergement");
    cy.contains("Accessibilité");
    cy.contains("Sécurité");
  });
});
