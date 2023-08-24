describe("Contributions", () => {
  it("je vois la liste de toutes les contributions par thèmes", () => {
    cy.visit("/");
    cy.get("#navigation").contains("Vos fiches pratiques").click();
    cy.url().should("include", "/contribution");
    cy.get("h1").should("have.text", "Vos fiches pratiques");
    cy.get("body").should(
      "contain",
      "Obtenez une réponses personnalisée selon votre convention collective"
    );
    cy.get("#content h2").should("have.length", 6);
    cy.get("#content h2")
      .first()
      .should("contain", "Embauche et contrat de travail");
    cy.get("#content li").should("have.length", 41);
    cy.get("#content li").first().click();
    cy.url().should(
      "include",
      "/contribution/la-periode-dessai-peut-elle-etre-renouvelee"
    );
  });
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
