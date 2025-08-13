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

  it('redirige vers la page "/themes/embauche-et-contrat-de-travail" lorsque je clique sur "Embauche et contrat de travail" puis sur "/themes/embauche" lorsque je clique sur "Embauche"', () => {
    cy.get("a[href]").contains("Embauche et contrat de travail").click();
    cy.urlEqual("/themes/embauche-et-contrat-de-travail");
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Embauche et contrat de travail"
    );
    cy.get("a[href]").should("contain", "Embauche");
    cy.get("a[href]").should("contain", "Contrat de travail");
    cy.get("a[href]").should("not.contain", "Méthodes de recrutement");

    cy.get("a[href]").contains("Embauche").click();
    cy.urlEqual("/themes/embauche");
    cy.findByRole("heading", { level: 1 }).should("have.text", "Embauche");
    cy.get("a[href]").should("contain", "Méthodes de recrutement");
    cy.get("a[href]").should("contain", "Période d’essai");
  });

  it('redirige vers la page "/themes/embauche-et-contrat-de-travail" et vérifie les liens', () => {
    cy.get("a").contains("Embauche et contrat de travail").click();
    cy.urlEqual("/themes/embauche-et-contrat-de-travail");
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Embauche et contrat de travail"
    );
    cy.get("a[href]").should("not.contain", "Embauche et contrat de travail");
    cy.get("a[href]").should("contain", "Embauche");
    cy.get("a[href]").should("contain", "Contrat de travail");
    cy.get("a[href]").should("not.contain", "Méthodes de recrutement");
  });
});
