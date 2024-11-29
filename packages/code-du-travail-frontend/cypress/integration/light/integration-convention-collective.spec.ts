describe("Pages integration convention collective", () => {
  it("should display iframe convention collective", () => {
    cy.visit("/integration/convention-collective", {
      onBeforeLoad(win) {
        cy.spy(win, "postMessage").as("postMessage");
      },
    });

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
