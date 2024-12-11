describe("Page d’accueil", () => {
  it("Affiche les éléments requis", () => {
    cy.visit("/");

    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();

    cy.findAllByRole("heading", {
      level: 2,
    })
      .first()
      .should(
        "have.text",
        "Obtenez les réponses à vos questions sur le droit du travail."
      );

    cy.contains("Recherchez par mots-clés");
    cy.get("button[aria-label='Lancer la recherche']").contains("Rechercher");

    cy.findAllByRole("heading", {
      level: 2,
    })
      .eq(1)
      .should("have.text", "À la une");

    cy.get("#home-highlights").find("a").should("have.length", 4);

    cy.contains("Voir tous les outils").should("have.attr", "href", "/outils");
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

  it("Devrait afficher les suggestions quand on cherche un mot", () => {
    cy.visit("/");
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();

    // @ts-ignore
    cy.selectByLabel("Recherchez par mots-clés").type("congés");

    cy.get('ul[role="listbox"]').should("be.visible");
    cy.get('ul[role="listbox"] li').should("have.length", 5);
    cy.contains("congés payés et fractionnement").should("be.visible");
    cy.contains("congés sans solde").should("be.visible");
    cy.contains("congés payés acquisition").should("be.visible");
    cy.contains("congés payés").should("be.visible");
    cy.contains("congés payés et maladie").should("be.visible");

    cy.get("button").contains("Rechercher");

    cy.contains("congés sans solde").click();

    cy.get('div[role="region"]>ul li').should("have.length", 7);
    cy.contains("Résultats de recherche pour “congés sans solde”");
    cy.contains("Que dit le code du travail");
    cy.contains("Vous n’avez pas trouvé ce que vous cherchiez");
    cy.contains("Les thèmes suivants peuvent vous intéresser");

    cy.get("button").contains("Plus de résultats").click();
    cy.get('div[role="region"]>ul li').should("have.length", 14);
  });

  it("Affiche la popup de recherche Besoin de plus d'information", () => {
    cy.visit("/");
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();

    cy.contains("Besoin de plus d'informations ?");

    cy.contains("Trouver les services près de chez moi").click();
    cy.get("h1").should("contain", "Les services du ministère du Travail");

    cy.get("#search-service").type("75");
    cy.get("#search-service").type("{enter}");

    cy.get(
      'a[href="https://idf.drieets.gouv.fr/Adresse-et-horaires-d-ouverture-de-l-unite-departementale-75"]'
    ).should("have.attr", "target", "_blank");

    cy.get(".fr-btn--close.fr-btn[title='Fermer']").click({
      multiple: true,
      force: true,
    });
  });
});
