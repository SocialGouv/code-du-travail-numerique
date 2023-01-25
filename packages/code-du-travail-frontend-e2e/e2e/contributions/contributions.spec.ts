describe("Contributions", () => {
  it("je vois la liste de toutes les contributions par thèmes", () => {
    cy.visit("/");
    cy.get("#navigation").contains("Articles personnalisés").click();
    cy.url().should("include", "/contribution");
    cy.get("h1").should("have.text", "Articles personnalisés");
    cy.get("body").should(
      "contain",
      "Obtenez une réponses personnalisée selon votre convention collective"
    );
    cy.get('h2[class^="contribution__"]').should("have.length", 16);
    cy.get('li[class^="contribution__ListItem"]').should("have.length", 42);
    cy.get('li[class^="contribution__ListItem"]').first().click();
    cy.url().should(
      "include",
      "/contribution/la-periode-dessai-peut-elle-etre-renouvelee"
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
