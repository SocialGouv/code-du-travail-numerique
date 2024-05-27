describe("Widget - Trouver sa convention collective", () => {
  it("should display the widget", () => {
    cy.visit(
      "https://socialgouv.github.io/cdtn-admin/trouver-sa-convention-collective",
      {
        timeout: 10000,
      }
    );
    cy.contains("Trouver sa convention collective");
  });

  it("should display iframe convention collective", () => {
    cy.visit(
      "https://socialgouv.github.io/cdtn-admin/trouver-sa-convention-collective",
      {
        onBeforeLoad(win) {
          cy.spy(win, "postMessage").as("postMessage");
        },
      }
    );

    cy.get("@iframe").contains("Trouver sa convention collective");
    cy.get("@iframe").find("#enterprise-search").as("entreprise-search");
    cy.get("@entreprise-search").type("carrefour");
    cy.get("@iframe").find("button[type=submit]").as("button-submit");
    cy.get("@button-submit").click();
    cy.get("@iframe").contains("CARREFOUR HYPERMARCHES").as("entreprise");
    cy.get("@entreprise").click();
    cy.get("@iframe").contains("Conventions collectives").as("cc");
    cy.get("@cc").click();
    cy.get("@postMessage")
      .should("have.been.calledOnce")
      .and(
        "have.been.calledWithExactly",
        {
          name: "agreement",
          kind: "select",
          extra: {
            idcc: 2216,
            title:
              "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
          },
        },
        "*"
      );
  });
});
