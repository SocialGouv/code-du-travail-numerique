describe("Outil externe", () => {
  it("l'outil egapro est référencé sur notre site", () => {
    cy.visit("/recherche?query=egapro");

    cy.contains("Index Egapro")
      .should("have.prop", "href")
      .and("equal", "https://egapro.travail.gouv.fr/");
  });
});
