import "cypress-iframe";

describe("Widget - Trouver sa convention collective", () => {
  it("should display the widget", () => {
    cy.visit(
      "https://socialgouv.github.io/cdtn-admin/trouver-sa-convention-collective"
    );

    cy.iframe()
      .contains("Trouver sa convention collective")
      .should("be.visible");
  });
});
