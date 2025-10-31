describe("Contributions", () => {
  it("je vois la liste de toutes les contributions par thèmes", () => {
    cy.visit("/");
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();
    cy.get("#fr-header-main-navigation").contains("Fiches pratiques").click();
    cy.get("#fr-header-main-navigation")
      .contains("Voir toutes les fiches par thème")
      .click();
    cy.isIndexable();
    cy.urlEqual("/contribution");
    cy.canonicalUrlEqual("/contribution");
    cy.titleAndMetaDescriptionEqual(
      "Vos fiches pratiques - Code du travail numérique",
      "Obtenez une réponse personnalisée selon votre convention collective"
    );
    cy.get("h1").should("have.text", "Vos fiches pratiques");
    cy.get("body").should(
      "contain",
      "Obtenez une réponse personnalisée selon votre convention collective"
    );
    cy.findAllByRole("heading", { level: 2 }).should("have.length", 9);
    cy.findAllByRole("heading", { level: 2 }).eq(0).should("contain", "Résumé");
    cy.findAllByRole("heading", { level: 2 })
      .eq(1)
      .should("contain", "Contenus populaires");
    cy.findAllByRole("heading", { level: 2 })
      .eq(2)
      .should("contain", "Embauche et contrat de travail");
    cy.findAllByRole("heading", { level: 3 }).should("have.length.at.least", 1);
    cy.findAllByRole("heading", { level: 3 }).first().click();
    cy.urlEqual(
      "/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire"
    );
  });
  it("je vois une page contribution", () => {
    cy.visit("/contribution/la-periode-dessai-peut-elle-etre-renouvelee");
    cy.get("h1").should("have.text", "Renouvellement de la période d'essai");

    cy.contains(
      "Afficher les informations sans sélectionner une convention collective"
    ).click();
    cy.get("body").should(
      "contain",
      "La convention collective ou l’accord de branche étendu prévoit le renouvellement de la période d’essai"
    );
    cy.get("body").should("contain", "Références");
    cy.get("body").should("contain", "L1221-21");
  });

  it("je vois une page contribution pour une CC", () => {
    cy.visit("/contribution/675-la-periode-dessai-peut-elle-etre-renouvelee");
    cy.contains(
      "Maisons à succursales de vente au détail d'habillement (IDCC 0675)"
    );

    cy.get("body").should(
      "contain",
      "Les conditions de renouvellement de la période d’essai varient selon la catégorie professionnelle du salarié."
    );

    cy.get("a")
      .contains("Maisons à succursales de vente au détail d'habillement")
      .should(
        "have.attr",
        "href",
        "/convention-collective/675-maisons-a-succursales-de-vente-au-detail-dhabillement"
      );

    cy.get("a").should(
      "contain",
      "Demande d’accord du salarié pour le renouvellement d’une période d’essai"
    );
  });

  it("je vois une contribution avec un accordéon ouvert", () => {
    cy.visit(
      "/contribution/3248-combien-de-fois-le-contrat-de-travail-peut-il-etre-renouvele#cdd"
    );
    cy.get('[aria-expanded="true"]').should("contain", "CDD");
  });
});
