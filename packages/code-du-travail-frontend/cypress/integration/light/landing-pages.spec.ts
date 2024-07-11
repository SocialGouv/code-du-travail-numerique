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
    cy.get("h2")
      .first()
      .should("contain", "Qu’est-ce qu’une entreprise d’insertion");
  });

  it("je vois une page fiche ministère du travail avec un accordéon ouvert", () => {
    cy.visit("/fiche-ministere-travail/la-demission#Quelle-est-la-situation-du-salarie-a-la-fin-du-contrat");
    cy.get("h1").should("have.text", "La démission");
    cy.get('[aria-expanded="true"]', { timeout: 10000 }).find("h2").should("contain", "Quelle est la situation du salarié à la fin du contrat");
  });

  it("je vois une page fiche service public", () => {
    cy.visit("/fiche-service-public/conges-payes");
    cy.get("h1").should("contain", "Congés payés");
    cy.get("body").should("contain", "Source: Fiche service-public.fr");
    cy.get("h2").first().should("contain", "Quel salarié a droit aux congés payés");
  });

  it("je vois une fiche service public avec un accordéon ouvert", () => {
    cy.visit("/fiche-service-public/salaire-primes-et-avantages#salaire");
    cy.get("h1").should("have.text", "Salaire, primes et avantages");
    cy.get('[aria-expanded="true"]').find("h2").should("contain", "Salaire");
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

  it("je vois la page à propos", () => {
    cy.visit("/a-propos");

    cy.contains("Qu’est-ce que le Code du travail numérique");
    cy.contains("Qui sommes-nous");
  });

  it("je vois la page droit du travail", () => {
    cy.visit("/droit-du-travail");

    cy.contains("Qu’est-ce que le droit du travail");
    cy.contains("Quels sont les textes à l’origine du droit du travail");
    cy.contains("Existe-t-il une hiérarchie entre les textes");
  });

  it("je vois la page politique de confidentialité", () => {
    cy.visit("/politique-confidentialite");

    cy.contains("Traitement des données à caractère personnel");
    cy.contains("Cookies");
  });

  it("je vois la page mention légale", () => {
    cy.visit("/mentions-legales");

    cy.contains("Directeur de la publication");
    cy.contains("Hébergement");
    cy.contains("Accessibilité");
    cy.contains("Sécurité");
  });
});
