describe("Page d’accueil", () => {
  it("Affiche les éléments requis", () => {
    cy.visit("/");
    cy.titleAndMetaDescriptionEqual(
      "Code du travail numérique",
      "Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (contrat de travail, congés payés, formation, démission, indemnités)."
    );
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Bienvenue sur le Code du travail numérique"
    );

    cy.findAllByRole("heading", {
      level: 2,
    })
      .first()
      .should(
        "have.text",
        "Obtenez les réponses à vos questions sur le droit du travail."
      );

    cy.findAllByRole("heading", {
      level: 2,
    })
      .eq(1)
      .should("have.text", "Comprendre le droit du travail");

    cy.contains("Que souhaitez-vous savoir ?");
    cy.get("#search-home-autocomplete").should("exist");
    cy.contains("button", "Voir tous les résultats").should("be.visible");

    cy.contains("Voir tous les simulateurs").should(
      "have.attr",
      "href",
      "/outils"
    );
    cy.get("#home-outils").find("a").should("have.length", 5);

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
    cy.contains("Embauche");
    cy.contains("Contrat de travail");
    cy.contains("Rémunération");
    cy.contains("Temps de travail");
    cy.contains("Congés");
    cy.contains("Formation");
    cy.contains("Hygiène, sécurité et conditions de travail");
    cy.contains("Représentation du personnel et négociation collective");
    cy.contains("Fin et rupture du contrat");
  });

  it("Devrait afficher les suggestions quand on cherche un mot", () => {
    cy.visit("/");
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();

    cy.get("#search-home-autocomplete").type("congés");

    // Pick the first available suggestion (content can evolve)
    cy.get("#search-home-autocomplete-listbox")
      .find("li[role='option']")
      .should("have.length.gte", 1)
      .first()
      .click();

    // Search V2 displays presearch results preview directly on home
    cy.get("#search-results-heading-home").should(
      "have.text",
      "Cela pourrait vous intéresser ?"
    );
    cy.get("#search-results-heading-home")
      .closest("section")
      .find("ul[role='list'] li")
      .its("length")
      .should("be.gte", 1);

    // And the CTA still navigates to the full search page
    cy.contains("button", "Voir tous les résultats").click();
    cy.url().should("include", "/recherche?query=");
    cy.contains("h1", "Rechercher").should("exist");
  });
});
