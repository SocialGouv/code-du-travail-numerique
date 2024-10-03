describe("Not found", () => {
  it("page should show valid page to user", () => {
    cy.visit("/banane", { failOnStatusCode: false });
    cy.get("main").should("contain", "Erreur 404");
    cy.findByRole("heading", { level: 1 }).should("have.text", "Page non trouvée");

    cy.contains("Page d'accueil")
      .should("have.prop", "href")
      .and("equal", `${Cypress.config().baseUrl}/`);
  });

  describe("page should return 404 if does not exists", () => {
    [
      "/outils",
      "/fiche-ministere-travail",
      "/fiche-service-public",
      "/code-du-travail",
      "/contribution",
      "/convention-collective",
      "/dossiers",
      "/glossaire",
      "/information",
      "/modeles-de-courriers",
      "/themes",
      "/widgets",
      "/integration",
      "",
    ].forEach((fragment) => {
      it("page: " + fragment + "/banane", () => {
        cy.request({
          failOnStatusCode: false,
          method: "GET",
          url: fragment + "/banane",
        }).then((response) => {
          expect(response.status).to.equal(404);
        });
      });
    });

    it("page /widgets/simulateur-embauche should returns 404", () => {
      cy.request({
        failOnStatusCode: false,
        method: "GET",
        url: "/widgets/simulateur-embauche",
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });
  });
});
