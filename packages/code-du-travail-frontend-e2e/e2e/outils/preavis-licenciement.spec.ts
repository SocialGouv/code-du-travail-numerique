describe("Outil - Préavis de licenciement", () => {
  it("Parcours sans convention collective", () => {
    cy.visit("/outils/preavis-licenciement");
    cy.get("h1").should("have.text", "Calculer le préavis de licenciement");
    cy.contains("Commencer").click();

    cy.contains("Le licenciement est-il dû à une faute grave (ou lourde)");
    cy.get('label:contains("Oui")').first().click();
    cy.contains("Suivant").click();

    cy.contains(
      "Dans le cas d’un licenciement pour faute grave ou lourde, il n’y pas d’obligation de respecter un préavis."
    );
    cy.get('label:contains("Non")').first().click();
    cy.contains(
      "Le salarié concerné est-il reconnu en tant que travailleur handicapé"
    );
    cy.get('label:contains("Non")').eq(1).click();
    cy.contains("Quelle est l'ancienneté du salarié");
    cy.get('[data-testid="cdt.ancienneté"]').select("Plus de 2 ans");
    cy.contains("Suivant").click();

    cy.contains("Quel est le nom de la convention collective applicable ?");
    cy.contains("Suivant").click();
    cy.contains("Vous devez répondre à cette question");
    cy.get("#not-selected").check();
    cy.contains(
      "Vous pouvez passer cette étape et poursuivre la simulation qui vous fournira un résultat basé sur le code du travail."
    );
    cy.get("button").contains("Suivant").click();

    cy.contains("Durée du préavis");
    cy.contains("2 mois");
    cy.contains("Voir le détail du calcul").click();
    cy.contains("Plus de 2 ans");
    cy.contains("La convention collective n'a pas été renseignée");
  });
  it("Parcours en connaissant sa convention collective", () => {
    cy.visit("/outils/preavis-licenciement");
    cy.get("h1").should("have.text", "Calculer le préavis de licenciement");
    cy.contains("Commencer").click();

    cy.contains("Le licenciement est-il dû à une faute grave (ou lourde)");
    cy.get('label:contains("Oui")').first().click();
    cy.contains("Suivant").click();

    cy.contains(
      "Dans le cas d’un licenciement pour faute grave ou lourde, il n’y pas d’obligation de respecter un préavis."
    );
    cy.get('label:contains("Non")').first().click();
    cy.contains(
      "Le salarié concerné est-il reconnu en tant que travailleur handicapé"
    );
    cy.get('label:contains("Non")').eq(1).click();
    cy.contains("Quelle est l'ancienneté du salarié");
    cy.get('[data-testid="cdt.ancienneté"]').select("Plus de 2 ans");
    cy.contains("Suivant").click();

    cy.contains("Quel est le nom de la convention collective applicable ?");
    cy.contains("Suivant").click();
    cy.contains("Vous devez répondre à cette question");
    cy.get("#agreement").check();
    cy.get("#agreement-search").type("843");
    cy.get('ul[role="listbox"] li').contains("Boulangerie").click();
    cy.get("button").contains("Suivant").click();

    cy.contains("Quelle est la catégorie professionnelle du salarié");
    cy.get('[data-testid="criteria.catégorie professionnelle"]').select(
      "Personnel de fabrication, personnel de vente et personnel de services"
    );
    cy.contains("Quelle est l'ancienneté du salarié");
    cy.get('[data-testid="criteria.ancienneté"]').select("Plus de 2 ans");
    cy.contains("Suivant").click();

    cy.contains("Durée du préavis");
    cy.contains("2 mois");
    cy.contains("Voir le détail du calcul").click();
    cy.contains("Boulangerie-pâtisserie (entreprises artisanales)");
    cy.contains(
      "Personnel de fabrication, personnel de vente et personnel de services"
    );
    cy.contains("Plus de 2 ans");
  });
});
