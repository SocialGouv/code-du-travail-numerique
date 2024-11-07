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

    cy.get("#searchbar").type("modele rupture contrat periode d'essai");

    cy.get("#searchbar").type("{enter}");

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
    cy.get("a:visible")
      .contains("Télécharger le")
      .should("have.prop", "href")
      .and(
        "equal",
        "https://cdtn-prod-public.s3.gra.io.cloud.ovh.net/preview/default/rupture_periode_d-essai_salarie.docx"
      );

    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "https://cdtn-prod-public.s3.gra.io.cloud.ovh.net/preview/default/rupture_periode_d-essai_salarie.docx",
    }).then((response) => {
      cy.readFile(
        "cypress/downloads/rupture_periode_d-essai_salarie.docx"
      ).then((file) => {
        expect(file).to.exist;
        expect(file.length).to.equal(18813);
      });
    });
  });
});
