describe("Dossiers", () => {
  it("je vois une page dossier", () => {
    cy.visit("/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus");
    cy.get("h1").should("have.text", "Covid-19");
    cy.get("body").should("contain", "Sommaire");

    cy.contains("Covid-19 : le régime post-crise sanitaire").click();
    cy.get("h1").should(
      "have.text",
      "Covid-19 : le régime post-crise sanitaire."
    );
    cy.get("body").should(
      "contain",
      "Le ministère du Travail a mis fin à ses recommandations telles qu’elles figuraient dans le protocole national en entreprise"
    );
  });
});
