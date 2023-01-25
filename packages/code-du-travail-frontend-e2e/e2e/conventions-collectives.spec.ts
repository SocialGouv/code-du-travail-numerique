describe("Conventions collectives", () => {
  it("je vois la liste de toutes les cc", () => {
    cy.visit("/");
    cy.get("#navigation").contains("Votre convention collective").click();
    cy.url().should("include", "/convention-collective");

    cy.get("h1").should("have.text", "Votre convention collective");
    cy.get("body").should(
      "contain",
      "Retrouvez les questions/réponses fréquentes organisées par thème"
    );
    cy.get('ul *[class^="convention-collective__ListItem"]').should(
      "have.length",
      126
    );
    cy.get('ul *[class^="convention-collective__ListItem"]').first().click();
    cy.url().should(
      "include",
      "/convention-collective/2941-aide-accompagnement-soins-et-services-a-domicile-bad"
    );
  });
});
