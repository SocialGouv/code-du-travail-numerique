describe("Navigation par thème", () => {
  beforeEach(() => {
    cy.visit("/themes");
  });

  it("affiche les informations sur le contenu de la page", () => {
    cy.findByRole("heading", { level: 1 }).should("have.text", "Thèmes");
    cy.get("p").should(
      "contain",
      "Découvrez l’intégralité de nos contenus organisés par grands thèmes"
    );
  });

  it('redirige vers la page "/themes/embauche" lorsque je clique sur "Embauche"', () => {
    cy.get("#main a[href]").contains("Embauche").click();
    cy.urlEqual("/themes/embauche");
    cy.findByRole("heading", { level: 1 }).should("have.text", "Embauche");
    cy.get("body").should("contain", "Méthodes de recrutement");
    cy.get("body").should("contain", "Formalités d'embauche");
    cy.get("body").should("contain", "Période d'essai");
  });

  it('redirige vers la page "/themes/contrat-de-travail" lorsque je clique sur "Contrat de travail"', () => {
    cy.get("#main a").contains("Contrat de travail").click();
    cy.urlEqual("/themes/contrat-de-travail");
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Contrat de travail"
    );
    cy.get("body").should("contain", "Principales caractéristiques");
    cy.get("body").should("contain", "CDI");
    cy.get("body").should("contain", "CDD");
  });
});
