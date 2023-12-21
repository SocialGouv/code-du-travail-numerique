Cypress.Commands.add("checkCanonical", (path) => {
  cy.get("head > link[rel='canonical']")
    .should("have.prop", "href")
    .and("equal", `${Cypress.config().baseUrl}${path}`);
});
Cypress.Commands.overwrite(
  "type",
  (originalFn, subject, text, options = {}) => {
    options.delay = 0;
    //@ts-ignore
    return originalFn(subject, text, options);
  }
);
