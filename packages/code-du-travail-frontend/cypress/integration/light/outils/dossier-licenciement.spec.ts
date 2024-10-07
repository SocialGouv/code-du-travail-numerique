describe("Outil - Dossier Licenciement", () => {
  it("Parcours Licenciement pour motif non disciplinaire", () => {
    cy.visit("/outils/procedure-licenciement");
    cy.get("h1").should("have.text", "Comprendre sa procédure de licenciement");

    cy.contains("Quelle est votre situation ?");
    cy.contains("Salarié");
    cy.contains("Employeur");

    cy.get('label:contains("Salarié")').click();

    cy.contains("Un licenciement pour motif personnel");
    cy.contains("Un licenciement pour motif économique");
    cy.contains(
      "Un licenciement suite à un accord de performance collective (APC)",
    );

    cy.get('label:contains("Un licenciement pour motif personnel")').click();

    cy.contains("Une faute qui vous est reprochée (motif disciplinaire)");
    cy.contains("Une inaptitude constatée par le médecin du travail");
    cy.contains(
      "Vous n'êtes concerné par aucun de ces cas (motif non disciplinaire)",
    );

    cy.get(
      'label:contains("Vous n\'êtes concerné par aucun de ces cas (motif non disciplinaire)")',
    ).click();

    cy.contains("Afficher les informations personnalisées");

    cy.get("button")
      .contains("Afficher les informations personnalisées")
      .click();

    cy.url().should(
      "equal",
      `${
        Cypress.config().baseUrl
      }/information/licenciement-pour-motif-non-disciplinaire`,
    );
  });
});
