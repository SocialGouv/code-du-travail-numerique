Cypress.Commands.add("getIframe" as any, () => {
  return cy
    .get("iframe")
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
});

describe("Pages integration convention collective", () => {
  it("should display iframe convention collective", () => {
    cy.visit("/integration/convention-collective", {
      onBeforeLoad(win) {
        cy.spy(win, "postMessage").as("postMessage");
      },
    });

    // @ts-ignore
    cy.getIframe().as("iframe");

    cy.get("@iframe")
      .findByRole("heading", { level: 1 })
      .should("have.text", "Trouver sa convention collective");

    cy.wait(1000);
    cy.get("@iframe")
      // @ts-ignore
      .findByLabel("Nom de votre entreprise ou numéro Siren/Siret")
      .type("carrefour", { force: true });
    cy.get("@iframe").find("button[type=submit]").as("button-submit");
    cy.get("@button-submit").click();
    cy.get("@iframe").contains("CARREFOUR HYPERMARCHES").as("entreprise");
    cy.get("@entreprise").click();
    cy.get("@iframe")
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
