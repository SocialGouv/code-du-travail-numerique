/* eslint-disable jest/valid-expect */
describe("Not found", () => {
  it("page should returns 404", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  it("page should show valid page to user", () => {
    cy.visit("/banane", { failOnStatusCode: false });
    cy.get("main").should("contain", "ERREUR 404");
    cy.get("h1").should("have.text", "Oups, nous ne trouvons pas cette page…");

    cy.contains("Revenir à la page d’accueil")
      .should("have.prop", "href")
      .and("equal", Cypress.config().baseUrl + "/");
  });

  it("page outils should returns 404 if does not exist", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/outils/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
});
