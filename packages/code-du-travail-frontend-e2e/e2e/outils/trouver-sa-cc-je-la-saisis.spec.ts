describe("Outil - Trouver sa convention collective", () => {
  it("Recherche de convention collective je la saisis", () => {
    cy.visit("/outils/convention-collective");
    cy.get("h1").should("have.text", "Trouver sa convention collective");
    cy.contains("Je la saisis").click();

    cy.get("#agreement-search").type("boulangerie");
    cy.get('ul[role="listbox"] li').should(
      "contain",
      "Boulangerie-pâtisserie (entreprises artisanales)"
    );
    cy.get('ul[role="listbox"] li').should(
      "contain",
      "Activités industrielles de boulangerie et pâtisserie"
    );
    cy.get("#agreement-search").clear();
    cy.get("#agreement-search").type("2247");
    cy.get('ul[role="listbox"] li').should(
      "contain",
      "Entreprises de courtage d'assurances et/ou de réassurances"
    );
  });
});
