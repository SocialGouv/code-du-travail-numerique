describe("Contributions", () => {
  it("je vois la liste de toutes les contributions par thèmes", () => {
    cy.visit("/");
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();
    cy.get("#fr-header-main-navigation")
      .contains("Vos fiches pratiques")
      .click();
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

    cy.get("div > p > span")
      .invoke("text")
      .should("match", /Mis à jour le/);
    cy.get("div > p > span")
      .invoke("text")
      .should("match", /\d\d\/\d\d\/\d\d\d\d/);

    cy.contains(
      "Accéder aux informations générales sans renseigner ma convention collective"
    ).click();
    cy.get("body").should("contain", "Que dit le code du travail");
    cy.get("body").should(
      "contain",
      "La convention collective ou l’accord de branche étendu prévoit le renouvellement de la période d’essai"
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
      "Votre convention collective est Maisons à succursales de vente au détail d'habillement (IDCC 0675)"
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

  it("je vois une contribution avec un accordéon ouvert", () => {
    cy.visit(
      "/contribution/3248-combien-de-fois-le-contrat-de-travail-peut-il-etre-renouvele#cdd"
    );
    cy.get("h1").should(
      "have.text",
      "Combien de fois le contrat de travail peut-il être renouvelé ?"
    );
    cy.get('[aria-expanded="true"]').find("h3").should("contain", "CDD");
  });
});
