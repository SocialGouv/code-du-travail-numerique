describe("Modèles de documents", () => {
  it("je vois la liste de toutes les modèles de documents par thèmes", () => {
    cy.visit("/");
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();
    cy.get("#fr-header-main-navigation")
      .contains("Modèles de documents")
      .click();
    cy.get("#fr-header-main-navigation")
      .contains("Voir tous les modèles par thème")
      .click();
    cy.isIndexable();
    cy.urlEqual("/modeles-de-courriers");
    cy.canonicalUrlEqual("/modeles-de-courriers");
    cy.titleAndMetaDescriptionEqual(
      "Modèles de documents - Code du travail numérique",
      "Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
    );
    cy.get("h1").should("have.text", "Modèles de documents");
    cy.get("body").should(
      "contain",
      "Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
    );
    cy.findAllByRole("heading", { level: 2 }).should("have.length.at.least", 3);
    cy.findAllByRole("heading", { level: 2 })
      .eq(0)
      .should("contain", "Sommaire");
    cy.findAllByRole("heading", { level: 2 })
      .eq(1)
      .should("contain", "Contenus populaires");
    cy.findAllByRole("heading", { level: 3 }).should("have.length.at.least", 1);
    cy.findAllByRole("heading", { level: 3 }).first().click();
    cy.urlEqual("/modeles-de-courriers/lettre-de-demission");
  });

  it("cherche un modèle", () => {
    cy.visit("/");

    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();

    cy.get("#search-home-autocomplete").as("home-searchbar");

    cy.get("@home-searchbar").type("modele rupture contrat periode d'essai");

    cy.get("@home-searchbar").type("{enter}");

    cy.get("@home-searchbar").should(
      "have.value",
      "modele rupture contrat periode d'essai"
    );

    cy.contains("button", "Voir tous les résultats").click();

    cy.urlEqual(
      "/recherche?query=modele%20rupture%20contrat%20periode%20d%27essai"
    );

    cy.contains("Rupture de période d’essai par le salarié").click();

    cy.urlEqual(
      "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie"
    );
  });

  it("télécharge un modèle", () => {
    cy.visit(
      "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie"
    );

    cy.contains("Objet : Rupture de la période d’essai").click();

    cy.window()
      .document()
      .then(function (doc) {
        doc.addEventListener("click", () => {
          setTimeout(function () {
            doc.location.reload();
          }, 3000);
        });
        cy.get("a:visible").contains("Télécharger le").first().click();
      });

    cy.readFile("cypress/downloads/rupture_periode_d-essai_salarie.docx").then(
      (file) => {
        expect(file).to.exist;
      }
    );
  });
});
