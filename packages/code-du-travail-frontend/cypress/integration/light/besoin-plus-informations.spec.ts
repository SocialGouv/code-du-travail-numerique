describe("Page Besoin de plus d'information", () => {
  it("Permet de rechercher le lien vers un service de renseignement", () => {
    cy.visit("/besoin-plus-informations");
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Besoin de plus d'informations")
      .should("be.visible");

    cy.selectByLabel("Saisissez le numéro de votre département").as(
      "input-departement"
    );
    cy.get("@input-departement").type("75", { delay: 50 });
    cy.get("@input-departement").type("{enter}");

    cy.get(
      'a[href="https://idf.drieets.gouv.fr/Adresse-et-horaires-d-ouverture-de-l-unite-departementale-75"]'
    ).should("have.attr", "target", "_blank");
  });
});
