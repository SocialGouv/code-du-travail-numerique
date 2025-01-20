describe("Page Ministère du travail", () => {
  it("je vois une page fiche ministère du travail", () => {
    cy.visit("/fiche-ministere-travail/entreprises-dinsertion-ei");
    cy.title().should(
      "eq",
      "Les entreprises d'insertion (EI) - Code du travail numérique"
    );
    cy.findAllByRole("heading", { level: 1 }).should(
      "have.text",
      "Les entreprises d'insertion (EI)"
    );
    cy.contains("a", "Fiche Ministère du travail")
      .should("have.attr", "href")
      .and("contain", "https://travail-emploi.gouv.fr");
    cy.findAllByRole("heading", { level: 2 }).should("have.length", 12);
    cy.get("h2")
      .first()
      .should("contain.text", "Qu'est-ce qu'une entreprise d’insertion");
  });
  it("je vois une page fiche ministère du travail avec un accordéon ouvert", () => {
    cy.visit(
      "/fiche-ministere-travail/la-demission#quelle-est-la-situation-du-salarie-a-la-fin-du-contrat"
    );
    cy.findByRole("heading", { level: 1 }).should("have.text", "La démission");
    cy.findByRole("heading", { level: 1 }).click();
    cy.get('[aria-expanded="true"]', { timeout: 10000 })
      .get("h2")
      .should(
        "contain",
        "Quelle est la situation du salarié à la fin du contrat"
      );
  });
});
