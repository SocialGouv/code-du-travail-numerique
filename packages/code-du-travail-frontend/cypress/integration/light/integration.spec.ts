Cypress.Commands.add("getIframe" as any, () => {
  return cy
    .get("iframe")
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
});

describe("Pages integration", () => {
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

  it("should display iframe modèle de courrier", () => {
    cy.visit("/integration/modeles-de-courriers");
    // @ts-ignore
    cy.getIframe().contains(
      "Affichage obligatoire relatif au harcèlement sexuel"
    );
  });

  it("should display iframe indemnité licenciement", () => {
    cy.visit("/integration/indemnite-licenciement");

    // @ts-ignore
    cy.getIframe().contains("Calculer l'indemnité de licenciement");
  });

  it("should display iframe préavis de démission", () => {
    cy.visit("/integration/preavis-demission");

    // @ts-ignore
    cy.getIframe().contains("Calculer le préavis de démission");
  });

  it("should display iframe indemnité de précarité", () => {
    cy.visit("/integration/indemnite-precarite");

    // @ts-ignore
    cy.getIframe().contains("Calculer l'indemnité de précarité");
  });

  it("should display iframe préavis de licenciement", () => {
    cy.visit("/integration/preavis-licenciement");

    // @ts-ignore
    cy.getIframe().contains("Calculer le préavis de licenciement");
  });

  it("should display iframe préavis de retraite", () => {
    cy.visit("/integration/preavis-retraite");

    // @ts-ignore
    cy.getIframe().contains("Calculer le préavis de départ à la retraite");
  });

  it("should display iframe procédure de licenciement", () => {
    cy.visit("/integration/procedure-licenciement");

    // @ts-ignore
    cy.getIframe().contains("Comprendre sa procédure de licenciement");
  });
});
