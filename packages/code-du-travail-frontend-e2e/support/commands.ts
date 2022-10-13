Cypress.Commands.add("checkCanonical", (path) => {
  cy.get("head > link[rel='canonical']")
    .should("have.prop", "href")
    .and("equal", Cypress.config().baseUrl + path);
});
