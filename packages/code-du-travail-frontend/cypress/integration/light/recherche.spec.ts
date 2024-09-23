describe("Recherche", () => {
  it("Lancer uen recherche depuis l'accueil", () => {
    cy.visit("/");
    cy.get("#searchbar").type("prime de fin d'année");
    cy.get('ul[role="listbox"]').should("be.visible");
    cy.get('ul[role="listbox"] li').should("have.length", 5);

    cy.get("button").contains("Rechercher").click();
    cy.get('div[role="region"]>ul li').should("have.length", 7);
    cy.contains("Résultats de recherche pour “prime de fin d'année”");
    cy.contains("Que dit le code du travail");
    cy.contains("Vous n’avez pas trouvé ce que vous cherchiez");
    cy.contains("Les thèmes suivants peuvent vous intéresser");

    cy.get("button").contains("Plus de résultats").click();
    cy.get('div[role="region"]>ul li').should("have.length", 14);
  });
});
