describe("Outil - Trouver sa convention collective", () => {
  it("Recherche de convention collective je la saisis", () => {
    cy.visit("/outils/convention-collective");
    cy.checkCanonical("/outils/convention-collective");
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Trouver sa convention collective")
      .click();
    cy.contains("Je connais ma convention collective je la saisis").click();
    cy.checkCanonical("/outils/convention-collective");
    // @ts-ignore
    cy.selectByLabel(
      "Nom de la convention collective ou son numéro d’identification IDCC (4 chiffres)"
    )
      .as("inputIdcc")
      .type("boulangerie");
    cy.get('ul[role="listbox"] li').should(
      "contain",
      "Boulangerie-pâtisserie (entreprises artisanales)"
    );
    cy.get('ul[role="listbox"] li').should(
      "contain",
      "Activités industrielles de boulangerie et pâtisserie"
    );
    cy.get("@inputIdcc").clear();
    cy.get("@inputIdcc").type("2247");
    cy.get('ul[role="listbox"] li').should(
      "contain",
      "Entreprises de courtage d'assurances et/ou de réassurances"
    );
  });
});
