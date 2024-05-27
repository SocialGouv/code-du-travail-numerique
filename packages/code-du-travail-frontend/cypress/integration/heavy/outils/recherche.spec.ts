Cypress.Commands.add("getIframe" as any, () => {
  return cy
    .get("iframe")
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
});

describe("Outil - Moteur de recherche", () => {
  it("should display the widget", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/recherche");
    cy.contains("Trouvez les réponses à vos questions en droit du travail");
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

    (cy as any).getIframe().as("iframe");

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
