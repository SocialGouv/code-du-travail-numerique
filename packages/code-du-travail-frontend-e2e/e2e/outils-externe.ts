describe("Outil externe", () => {
  it("l'outil egapro est référencé sur notre site", () => {
    cy.visit("/recherche?q=egapro");

    cy.contains("Consulter")
      .should("have.prop", "href")
      .and("equal", "https://index-egapro.travail.gouv.fr");
  });
});
