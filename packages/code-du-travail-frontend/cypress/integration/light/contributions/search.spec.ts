describe("Contributions", () => {
  it("rechercher et voir une contribution", () => {
    cy.visit("/");
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();
    cy.selectByLabel("Recherchez par mots-clés").type("durée maximale CDD");
    cy.get("button[aria-label='Lancer la recherche']")
      .contains("Rechercher")
      .click();
    cy.findAllByRole("heading", { level: 3 }).should("have.length", 18);
    cy.contains("Durée maximale d'un CDD").click();

    cy.urlEqual(
      "/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd?q=dur%C3%A9e%20maximale%20CDD"
    );
  });
});
