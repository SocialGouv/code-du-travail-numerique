describe("Landing pages", () => {
  it("je vois une page article code du travail", () => {
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
  it("je vois une page fiche ministère du travail", () => {
    cy.visit("/fiche-ministere-travail/entreprises-dinsertion-ei");
    cy.get("h1").should("have.text", "Entreprises d’insertion (EI)");
    cy.get("body").should("contain", "Source: Fiche Ministère du travail");
    // cy.get("h2")
    //   .first()
    //   .should("have.text", "Qu’est-ce qu’une entreprise d’insertion ?");
  });
  it("je vois une page fiche service public", () => {
    cy.visit("/fiche-service-public/conges-payes");
    cy.get("h1").should("have.text", "Congés payés");
    cy.get("body").should("contain", "Source: Fiche service-public.fr");
    // cy.get("h2")
    //   .first()
    //   .should("have.text", "Avez-vous droit aux congés payés");
  });
  it("je vois une page convention collective", () => {
    cy.visit(
      "/convention-collective/1686-commerces-et-services-de-laudiovisuel-de-lelectronique-et-de-lequipemen"
    );
    cy.get("h1").should(
      "have.text",
      "Commerces et services de l'audiovisuel, de l'électronique et de l'équipement ménager"
    );
    cy.get("body").should("contain", "Source: Légifrance");
  });
});
