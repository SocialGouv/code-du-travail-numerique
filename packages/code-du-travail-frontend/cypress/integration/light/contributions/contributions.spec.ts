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
    cy.get("#content li").should("have.length", 42);
    cy.get("#content li").first().click();
    cy.url().should(
      "include",
      "/contribution/la-periode-dessai-peut-elle-etre-renouvelee"
    );
  });
  it("je vois une page contribution", () => {
    cy.visit("/contribution/la-periode-dessai-peut-elle-etre-renouvelee");
    cy.get("h1").should(
      "have.text",
      "La période d’essai peut-elle être renouvelée ?"
    );
    cy.contains(
      "Accéder aux informations générales sans renseigner ma convention collective"
    ).click();
    cy.get("body").should("contain", "Que dit le code du travail");
    cy.get("body").should(
      "contain",
      "La convention ou l’accord de branche étendu prévoit le renouvellement de la période d’essai"
    );
    cy.get("body").should("contain", "Références");
    cy.get("body").should("contain", "L1221-21");
    cy.get("body").should("contain", "Pour aller plus loin");
  });

  it("je vois une page contribution pour une CC", () => {
    cy.visit("/contribution/675-la-periode-dessai-peut-elle-etre-renouvelee");
    cy.get("h1").should(
      "have.text",
      "La période d’essai peut-elle être renouvelée ?"
    );
    cy.get("h2").should(
      "contain",
      "Votre réponse pour la convention collective Maisons à succursales de vente au détail d'habillement"
    );

    cy.get("body").should(
      "contain",
      "Les conditions de renouvellement de la période d’essai varient selon la catégorie professionnelle du salarié."
    );

    cy.get("a")
      .contains(
        "la convention collective Maisons à succursales de vente au détail d'habillement"
      )
      .should(
        "have.attr",
        "href",
        "/convention-collective/675-maisons-a-succursales-de-vente-au-detail-dhabillement"
      );
    cy.get("h2").should("contain", "Pour aller plus loin");
    cy.get("h3").should(
      "contain",
      "Demande d’accord du salarié pour le renouvellement d’une période d’essai"
    );
  });
});
