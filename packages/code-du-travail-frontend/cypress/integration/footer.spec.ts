describe("Footer", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display modal for the Besoin de plus d'information", () => {
    cy.contains("Besoin de plus d’information").click();

    cy.contains("Contacter nos services en région").click();

    cy.get("#search-service").type("75");
    cy.get("#search-service").type("{enter}");

    cy.get(
      'a[href="https://idf.drieets.gouv.fr/Adresse-et-horaires-d-ouverture-de-l-unite-departementale-75"]'
    ).should("have.attr", "target", "_blank");

    cy.get('button[title="fermer la modale"]').click();
  });

  it("should display modal for Nous contacter", () => {
    cy.contains(/^\s*Nous contacter\s*$/).click();

    cy.contains("les services du ministère du Travail");
    cy.contains("vous pouvez nous contacter");

    cy.get('a[href="mailto:codedutravailnumerique@travail.gouv.fr"]');
  });
});
