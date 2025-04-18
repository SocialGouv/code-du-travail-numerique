describe("Header", () => {
  it("doit afficher les liens d'évitement", () => {
    cy.visit("/mentions-legales");
    cy.get("[id^=fr-skiplinks]").as("skipLink").should("not.be.visible");
    cy.window().focus().realPress("Tab");
    cy.get("@skipLink").should("be.visible");
    cy.focused().should("have.attr", "href", "#main");
    cy.realPress("Tab");
    cy.focused().should("have.attr", "href", "#fr-header-main-navigation");
    cy.realPress("Tab");
    cy.focused().should("have.attr", "href", "#fr-header-search-input");
    cy.realPress("Tab");
    cy.focused().should("have.attr", "href", "#more-info");
    cy.realPress("Enter");
    cy.get("@skipLink").should("not.have.focus").and("not.be.visible");
    cy.realPress("Tab");
    cy.focused().should("have.text", "Trouver les services près de chez moi");
  });
});
