describe("Page d'acceuil", () => {
  it("Affiche les éléments requis", () => {
    cy.visit("/");
    cy.get("h1").should(
      "have.text",
      "Bienvenue sur le Code du travail numérique"
    );
    cy.contains("Recherchez par mots-clés");
    cy.contains("Rechercher");

    cy.get("h2").should("contain", "À la une");

    cy.get("#highlights-element").find("a").should("have.length", 4);

    cy.contains("Voir tous les outils").should("have.attr", "href", "/outils");

    cy.contains("Voir tous les modèles de documents").should(
      "have.attr",
      "href",
      "/modeles-de-courriers"
    );
    cy.get("#home-modeles-de-courriers").find("a").should("have.length", 5);

    cy.contains("Voir toutes les fiches pratiques").should(
      "have.attr",
      "href",
      "/contribution"
    );
    cy.get("#home-fiches-pratiques").find("a").should("have.length", 5);

    cy.contains("Voir toutes les conventions collectives").should(
      "have.attr",
      "href",
      "/convention-collective"
    );
    cy.get("#home-convention-collective").find("a").should("have.length", 5);

    cy.contains("Voir tous les thèmes").should("have.attr", "href", "/themes");
    cy.contains("Thèmes");
    cy.contains("Embauche et contrat de travail");
    cy.contains("Salaire et Rémunération");
    cy.contains("Temps de travail");
    cy.contains("Congés et repos");
    cy.contains("Emploi et formation professionnelle");
    cy.contains("Santé, sécurité et conditions de travail");
    cy.contains("Représentation du personnel et négociation collective");
    cy.contains("Départ de l’entreprise");
    cy.contains("Conflits au travail et contrôle de la réglementation");
  });
});
