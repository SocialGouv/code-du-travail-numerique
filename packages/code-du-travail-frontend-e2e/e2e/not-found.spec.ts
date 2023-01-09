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
  it("page fiche-ministere-travail should returns 404 if does not exist", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/fiche-ministere-travail/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
  it("page fiche-service-public should returns 404 if does not exist", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/fiche-service-public/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  it("page code-du-travail should returns 404 if does not exist", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/code-du-travail/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
  it("page contribution should returns 404 if does not exist", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/contribution/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
  it("page convention-collective should returns 404 if does not exist", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/convention-collective/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
  it("page dossiers should returns 404 if does not exist", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/dossiers/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
  it("page glossaire should returns 404 if does not exist", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/glossaire/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
  it("page information should returns 404 if does not exist", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/information/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
  it("page modeles-de-courriers should returns 404 if does not exist", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/modeles-de-courriers/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
  it("page themes should returns 404 if does not exist", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/themes/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
  it("page widgets should returns 404 if does not exist", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "/widgets/banane",
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
});
