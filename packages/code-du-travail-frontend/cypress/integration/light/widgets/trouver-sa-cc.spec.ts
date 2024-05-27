import "cypress-iframe";

describe("Widget - Trouver sa convention collective", () => {
  it("should display the widget", () => {
    cy.visit(
      "https://socialgouv.github.io/cdtn-admin/trouver-sa-convention-collective"
    );

    cy.iframe()
      .contains("Trouver sa convention collective")
      .should("be.visible");
    cy.iframe().find("#enterprise-search").as("entreprise-search");
    cy.get("@entreprise-search").type("carrefour");
    cy.iframe().find("button[type=submit]").as("button-submit");
    cy.get("@button-submit").click();
    cy.iframe().contains("CARREFOUR HYPERMARCHES").as("entreprise");
    cy.get("@entreprise").click();
    cy.iframe().contains("Conventions collectives").as("cc");
    cy.get("@cc").click();
  });

  it("should display the widget", () => {
    cy.visit(
      "https://socialgouv.github.io/cdtn-admin/trouver-sa-convention-collective-sans-redirection"
    );

    cy.iframe()
      .contains("Trouver sa convention collective")
      .should("be.visible");
    cy.iframe().find("#enterprise-search").as("entreprise-search");
    cy.get("@entreprise-search").type("carrefour");
    cy.iframe().find("button[type=submit]").as("button-submit");
    cy.get("@button-submit").click();
    cy.iframe().contains("CARREFOUR HYPERMARCHES").as("entreprise");
    cy.get("@entreprise").click();
    cy.iframe().contains("Conventions collectives").as("cc");
    cy.get("@cc").click();
  });
});
