describe("Page Besoin de plus d'information", () => {
  it("Permet de rechercher le lien vers un service de renseignement", () => {
    cy.visit("/besoin-plus-informations");
    cy.findByRole("heading", { level: 1 })
      .first()
      .should("be.visible")
      .should("have.text", "Besoin de plus d'informations");

    cy.selectByLabel("Saisissez le numéro de votre département")
      .should("be.visible")
      .as("deptInput");
    cy.get("@deptInput").type("75{enter}");

    cy.get(
      'a[href="https://idf.drieets.gouv.fr/Adresse-et-horaires-d-ouverture-de-l-unite-departementale-75"]'
    ).should("have.attr", "target", "_blank");
  });
});
