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

    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();
    // @ts-ignore
    cy.selectByLabel("Recherchez par mots-clés")
      .as("home-searchbar")
      .type("modele rupture contrat periode d'essai");

    cy.get("@home-searchbar").type("{enter}");

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
