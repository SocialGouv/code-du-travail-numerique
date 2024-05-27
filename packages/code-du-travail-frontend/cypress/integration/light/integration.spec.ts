Cypress.Commands.add("getIframe" as any, () => {
  return cy
    .get("iframe")
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
});

describe("Intégrations", () => {
  it("should display iframe convention collective", () => {
    cy.visit("/integration/convention-collective", {
      onBeforeLoad(win) {
        cy.spy(win, "postMessage").as("postMessage");
      },
    });

    // @ts-ignore
    cy.getIframe().as("iframe");

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

  it("should display iframe moteur de recherche", () => {
    const postMessageStub = cy.stub().as("postMessage");

    cy.visit("/integration/moteur-recherche", {
      onBeforeLoad(win) {
        win.addEventListener("message", (e) => {
          postMessageStub(e.data);
        });
      },
    });

    // @ts-ignore
    cy.getIframe().as("iframe");

    cy.get("@iframe")
      .find("label", { timeout: 10000 })
      .should(
        "have.text",
        "Trouvez les réponses à vos questions en droit du travail"
      );
    cy.get("@iframe").find("#button-search").click();
    cy.get("@postMessage")
      .should("have.been.calledOnce")
      .and("have.been.calledWithExactly", {
        name: "button-search",
        kind: "click",
      });
  });
});
