describe("Contributions", () => {
  it("je vois la liste de toutes les contributions par thèmes", () => {
    cy.visit("/contribution");
    cy.get("h1").should("have.text", "Ma convention collective");
    cy.get("body").should(
      "contain",
      "Retrouvez les questions/réponses fréquentes organisées par thème pour votre convention collective"
    );
    cy.get('h2[class^="contribution__"]').should("have.length", 126);
    cy.get('ul *[class^="convention-collective__ListItem"]').should(
      "have.length",
      126
    );
    cy.get('ul *[class^="convention-collective__ListItem"]').first().click();
    cy.url().should(
      "include",
      "/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd"
    );
  });
  it("je vois une page contribution", () => {
    cy.visit("/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd");
    cy.get("h1").should(
      "have.text",
      "Quelle peut être la durée maximale d'un CDD ?"
    );
    cy.get("body").should("contain", "Que dit le code du travail");
    cy.get("body").should("contain", "Texte applicable");
    cy.get("body").should("contain", "Références");
    cy.get("body").should("contain", "L1242-8-1");
    cy.get("body").should("contain", "Que dit votre convention collective");
  });
});
