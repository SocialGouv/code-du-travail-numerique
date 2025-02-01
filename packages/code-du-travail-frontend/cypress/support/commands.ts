import "@testing-library/cypress/add-commands";
import "cypress-iframe";

Cypress.Commands.add("urlEqual", (path) => {
  cy.url().should("equal", `${Cypress.config().baseUrl}${path}`);
});

Cypress.Commands.add("titleAndMetaDescriptionEqual", (title, description) => {
  cy.title().should("eq", title);
  cy.get(`head > meta[name="description"]`).should(
    "have.attr",
    "content",
    description
  );
});

Cypress.Commands.add("canonicalUrlEqual", (path) => {
  cy.get("head > link[rel='canonical']")
    .should("have.prop", "href")
    .and("equal", `${Cypress.config().baseUrl}${path}`);
});

Cypress.Commands.add("checkNoIndex", () => {
  cy.get("head > meta[name='robots']")
    .should("have.prop", "content")
    .and("equal", `noindex,nofollow`);
});

Cypress.Commands.add("isIndexable", () => {
  cy.get("head > meta[name='robots']").should("not.exist");
});

Cypress.Commands.add("selectByLabel", (labelText) => {
  cy.contains("label", labelText)
    .invoke("attr", "for")
    .then((id) => {
      return id && cy.get(`#${CSS.escape(id)}`);
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
