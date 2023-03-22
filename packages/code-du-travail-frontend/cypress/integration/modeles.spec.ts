describe("Modèles de documents", () => {
  it("liste les modèles", () => {
    cy.visit("/modeles-de-courriers");

    cy.contains("Rupture du contrat en période d’essai par le salarié").click();

    cy.url().should(
      "include",
      "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie"
    );
  });

  it("cherche un modèle", () => {
    cy.visit("/");

    cy.get("#searchbar")
      .type("modele rupture contrat periode d'essai")
      .type("{enter}");

    cy.contains("Rupture du contrat en période d’essai par le salarié").click();

    cy.url().should(
      "include",
      "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie"
    );
  });

  it("télécharge un modèle", () => {
    cy.visit(
      "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie"
    );

    cy.contains("Objet : Rupture de la période d’essai");

    cy.window()
      .document()
      .then(function (doc) {
        doc.addEventListener("click", () => {
          setTimeout(function () {
            doc.location.reload();
          }, 3000);
        });
        cy.contains("Télécharger le modèle").click();
      });

    cy.readFile("cypress/downloads/rupture_periode_d-essai_salarie.docx").then(
      (file) => {
        expect(file).to.exist;
      }
    );
  });
});
