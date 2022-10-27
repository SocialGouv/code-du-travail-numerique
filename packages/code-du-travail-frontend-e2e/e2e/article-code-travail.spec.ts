describe("Article Code du travail", () => {
  it("je vois une page code du travail", () => {
    cy.visit("/code-du-travail/l2312-1");
    cy.get("h1").should("have.text", "L2312-1");
    cy.get("body").should("contain", "Source: Code du travail");
    cy.get("body").should(
      "contain",
      "Les attributions du comité social et économique des entreprises de moins de cinquante salariés sont définies par la section 2 du présent chapitre."
    );
    cy.get("body").should("contain", "NOTA");
    cy.get("body").should(
      "contain",
      "Conformément à l'article 9 I de l'ordonnance n° 2017-1386 du 22 septembre 2017, les présentes dispositions entrent en vigueur à la date d'entrée en vigueur des décrets pris pour leur application, et au plus tard le 1er janvier 2018."
    );
  });
});
