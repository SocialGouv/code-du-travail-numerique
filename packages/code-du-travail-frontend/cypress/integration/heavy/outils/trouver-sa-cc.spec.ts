describe("Outil - Trouver sa convention collective", () => {
  it("should display the widget", () => {
    cy.visit(
      "https://socialgouv.github.io/cdtn-admin/trouver-sa-convention-collective"
    );
    cy.contains("Trouver sa convention collective");
  });
});
