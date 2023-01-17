describe("Contributions", () => {
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
