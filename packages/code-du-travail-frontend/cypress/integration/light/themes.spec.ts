describe("Navigation par thème", () => {
  beforeEach(() => {
    cy.visit("/themes");
  });

  it('affiche "Contenus par thème" et "Besoin de plus d’informations" sur la page "/themes"', () => {
    cy.get("h1").should("contain", "Contenus par thème");
    cy.get("p").should("contain", "Besoin de plus d’informations");
  });

  it('redirige vers la page "/themes/embauche-et-contrat-de-travail" lorsque je clique sur "Embauche et contrat de travail" puis sur "/themes/embauche" lorsque je clique sur "Embauche"', () => {
    cy.get("a").contains("Embauche et contrat de travail").click();
    cy.urlEqual("/themes/embauche-et-contrat-de-travail");
    cy.get("h1").should("contain", "Embauche et contrat de travail");
    cy.get("a").should("contain", "Embauche");
    cy.get("a").should("contain", "Contrat de travail");
    cy.get("a").should("not.contain", "Méthodes de recrutement");
    cy.get("span").should("contain", "Contenu correspondant");

    cy.get("a").contains("Embauche").click();
    cy.urlEqual("/themes/embauche");
    cy.get("h1").should("contain", "Embauche");
    cy.get("a").should("contain", "Méthodes de recrutement");
    cy.get("a").should("contain", "Période d’essai");
    cy.get("p").should("contain", "Besoin de plus d’informations");
  });

  it('redirige vers la page "/themes/embauche-et-contrat-de-travail" et vérifie les liens', () => {
    cy.get("a").contains("Embauche et contrat de travail").click();
    cy.urlEqual("/themes/embauche-et-contrat-de-travail");
    cy.get("h1").should("contain", "Embauche et contrat de travail");
    cy.get("a").should("not.contain", "Embauche et contrat de travail");
    cy.get("a").should("contain", "Embauche");
    cy.get("a").should("contain", "Contrat de travail");
    cy.get("a").should("not.contain", "Méthodes de recrutement");
    cy.get("p").should("contain", "Besoin de plus d’informations");
  });
});
