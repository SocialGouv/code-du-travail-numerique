import "@testing-library/cypress/add-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      selectByLabel: Chainable<Element>;
      findByLabel: Chainable<Element>;
    }
  }
}

Cypress.Commands.add("checkCanonical", (path) => {
  cy.get("head > link[rel='canonical']")
    .should("have.prop", "href")
    .and("equal", `${Cypress.config().baseUrl}${path}`);
});

Cypress.Commands.add("selectByLabel", (labelText) => {
  cy.contains("label", labelText)
    .invoke("attr", "for")
    .then((id) => {
      cy.get(`#${CSS.escape(id)}`);
    });
});

Cypress.Commands.add(
  "findByLabel",
  {
    prevSubject: true,
  },
  (subject, labelText) => {
    if (subject) {
      cy.wrap(subject)
        .contains("label", labelText)
        .invoke("attr", "for")
        .then((id) => {
          if (id) {
            cy.wrap(subject).find(`#${CSS.escape(id)}`);
          }
        });
    }
  }
);
