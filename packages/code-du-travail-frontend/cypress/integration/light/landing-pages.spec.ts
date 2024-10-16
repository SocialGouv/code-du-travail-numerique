describe("Landing pages", () => {
  it("je vois une page fiche ministère du travail", () => {
    cy.visit("/fiche-ministere-travail/entreprises-dinsertion-ei");
    cy.get("h1").should("have.text", "Entreprises d’insertion (EI)");
    cy.get("body").should("contain", "Source: Fiche Ministère du travail");
    cy.get("h2")
      .first()
      .should("contain", "Qu’est-ce qu’une entreprise d’insertion");
  });

  it("je vois une page fiche ministère du travail avec un accordéon ouvert", () => {
    cy.visit(
      "/fiche-ministere-travail/la-demission#Quelle-est-la-situation-du-salarie-a-la-fin-du-contrat"
    );
    cy.get("h1").should("have.text", "La démission");
    cy.get('[aria-expanded="true"]', { timeout: 10000 })
      .find("h2")
      .should(
        "contain",
        "Quelle est la situation du salarié à la fin du contrat"
      );
  });

  it("je vois une page fiche service public", () => {
    cy.visit("/fiche-service-public/salaire-primes-et-avantages#salaire");
    cy.get("h1").should("contain", "Salaire, primes et avantages");
    cy.get("body").should("contain", "Source: Fiche service-public.fr");
    cy.get("h2").first().should("contain", "Salaire");
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

  it("je vois la page mention légale", () => {
    cy.visit("/mentions-legales");

    cy.contains("Directeur de la publication");
    cy.contains("Hébergement");
    cy.contains("Accessibilité");
    cy.contains("Sécurité");
  });
});
