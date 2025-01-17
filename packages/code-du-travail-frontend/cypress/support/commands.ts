import "@testing-library/cypress/add-commands";
import "cypress-iframe";

Cypress.Commands.add("checkCanonical", (path) => {
  cy.get("head > link[rel='canonical']")
    .should("have.prop", "href")
    .and("equal", `${Cypress.config().baseUrl}${path}`);
});

Cypress.Commands.add("checkNoIndex", (noIndex) => {
  if (!noIndex) {
    cy.get("head > meta[name='robots']").should("not.exist");
  } else {
    cy.get("head > meta[name='robots']")
      .should("have.prop", "content")
      .and("equal", `noindex,nofollow`);
  }
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
