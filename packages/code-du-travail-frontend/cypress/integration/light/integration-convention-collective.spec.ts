describe("Pages integration convention collective", () => {
  it("should display iframe convention collective", () => {
    cy.visit("/integration/convention-collective");

    cy.frameLoaded({ url: "/widgets/convention-collective" });

    cy.iframe()
      .findByRole("heading", { level: 1 })
      .should("have.text", "Trouver sa convention collective")
      .click();

    cy.iframe()
      // @ts-ignore
      .findByLabel("Nom de votre entreprise ou numéro Siren/Siret")
      .as("inputSiret");

    cy.get("@inputSiret").type("carrefour", { force: true });

    cy.iframe().find("button[type=submit]").contains("Rechercher").click();
    cy.iframe().contains("CARREFOUR HYPERMARCHES").click();
    cy.iframe()
      .contains("Commerce de détail et de gros à prédominance alimentaire")
      .as("cc");
    cy.get("@cc").click();
  });
});
