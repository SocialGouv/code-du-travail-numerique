describe("Contributions", () => {
  it("je vois une page contribution", () => {
    cy.visit("/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd");
    cy.get("h1").should(
      "have.text",
      "Quelle peut être la durée maximale d'un CDD ?"
    );
    cy.get("body").should("contain", "Que dit le code du travail");
    cy.get("body").should("contain", "Texte applicable");
    cy.get("body").should("contain", "Références");
    cy.get("body").should("contain", "L1242-8-1");
    cy.get("body").should("contain", "Que dit votre convention collective");
  });

  it("je vois une page contribution pour une CC", () => {
    cy.visit("/contribution/2941-quelle-peut-etre-la-duree-maximale-dun-cdd");
    cy.get("h1").should(
      "have.text",
      "Quelle peut être la durée maximale d'un CDD ?"
    );
    cy.get("h2").should(
      "contain",
      "Que dit la convention Aide, accompagnement, soins et services à domicile (BAD) ?"
    );

    cy.get("body").should(
      "contain",
      "Consultez les questions-réponses fréquentes pour la convention collective Aide, accompagnement, soins et services à domicile (BAD)"
    );

    cy.contains(
      "la convention collective Aide, accompagnement, soins et services à domicile (BAD)"
    ).should(
      "have.attr",
      "href",
      "/convention-collective/2941-aide-accompagnement-soins-et-services-a-domicile-bad"
    );
  });
});
