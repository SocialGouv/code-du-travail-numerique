describe("Dossiers", () => {
  it("je vois une page dossier", () => {
    cy.visit("/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus");
    cy.get("h1").should("have.text", "Covid-19");
    cy.get("body").should("contain", "Sommaire");

    cy.contains(
      "Covid-19 : le régime post-crise sanitaire à compter du 14 mars 2022"
    ).click();
    cy.get("h1").should("have.text", "Covid-19 : fin du protocole sanitaire");
    cy.get("body").should(
      "contain",
      "Un allègement des mesures à partir du 14 mars 2022"
    );
  });
});
