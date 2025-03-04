describe("Modèles de documents", () => {
  it("liste les modèles", () => {
    cy.visit("/modeles-de-courriers");

    cy.contains("Rupture du contrat en période d’essai par le salarié").click();

    cy.urlEqual(
      "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie"
    );
    cy.titleAndMetaDescriptionEqual(
      "Modèle de document : Rupture du contrat en période d’essai par le salarié - Code du travail numérique",
      "Pendant la période d’essai, le contrat de travail peut être rompu librement par le salarié. Téléchargez et personnalisez notre modèle pour informer votre employeur de votre intention de mettre fin à la période d’essai."
    );
  });

  it("cherche un modèle", () => {
    cy.visit("/");

    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();
    cy.selectByLabel("Recherchez par mots-clés").as("home-searchbar");

    cy.get("@home-searchbar").type("modele rupture contrat periode d'essai");

    cy.get("@home-searchbar").type("{enter}");

    cy.get("@home-searchbar").should(
      "have.value",
      "modele rupture contrat periode d'essai"
    );

    cy.urlEqual("/recherche?q=modele+rupture+contrat+periode+d%27essai");

    cy.contains("Rupture du contrat en période d’essai par le salarié").click();

    cy.urlEqual(
      "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie?q=modele%20rupture%20contrat%20periode%20d%27essai"
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
