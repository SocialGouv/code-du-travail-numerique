describe("Outil - Préavis de licenciement", () => {
  it("Parcours sans convention collective", () => {
    cy.visit("/outils/preavis-licenciement");

    cy.get("h1").should("have.text", "Calculer le préavis de licenciement");

    cy.get("button").contains("Commencer").click({ force: true });

    cy.contains("Le licenciement est-il dû à une faute grave (ou lourde)");
    cy.get('label:contains("Oui")').eq(0).click();
    cy.contains("Pas de préavis en cas de faute grave");
    cy.get('label:contains("Non")').eq(0).click();

    cy.contains(
      "Le salarié concerné est-il reconnu en tant que travailleur handicapé"
    );
    cy.get('label:contains("Non")').eq(1).click();

    cy.contains("Quelle est l'ancienneté du salarié ?");
    cy.get('[id="input-seniority"]').select("2 ans et plus");

    cy.contains("Suivant").click();

    cy.contains("Quel est le nom de la convention collective applicable ?");
    cy.contains("Suivant").click();
    cy.contains("Vous devez répondre à cette question");
    cy.contains(
      "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
    ).click();
    cy.contains("Suivant").click();

    cy.contains("Durée du préavis");
    cy.contains("2 mois");
    cy.contains("Plus de 2 ans");
    cy.contains("convention collective non renseignée");
  });

  it("Parcours en connaissant sa convention collective", () => {
    cy.visit("/outils/preavis-licenciement");

    cy.get("h1").should("have.text", "Calculer le préavis de licenciement");

    cy.get("button").contains("Commencer").click({ force: true });

    cy.get('label:contains("Non")').eq(0).click();
    cy.get('label:contains("Non")').eq(1).click();
    cy.get('[id="input-seniority"]').select("2 ans et plus");
    cy.contains("Suivant").click();

    cy.get(
      'label:contains("Je sais quelle est ma convention collective et je la saisis.")'
    )
      .first()
      .click();
    cy.contains("Précisez et sélectionnez votre convention collective");
    cy.get('input[type="text"]').eq(1).type("843");
    cy.get('ul[role="listbox"] li').contains("Boulangerie").click();
    cy.get("button").contains("Suivant").click();

    cy.contains("Quelle est la catégorie professionnelle du salarié");
    cy.get(
      '[id="input-infos-contrat-salarié-convention-collective-boulangerie-patisserie-catégorie-professionnelle"]'
    ).select(
      "Personnel de fabrication, personnel de vente et personnel de services"
    );

    cy.contains("Quelle est l'ancienneté du salarié");
    cy.get(
      '[id="input-infos-contrat-salarié-convention-collective-boulangerie-patisserie-catégorie-professionnelle-Personnel-de-fabrication,-personnel-de-vente-et-personnel-de-services-ancienneté"]'
    ).select("Plus de 2 ans");
    cy.get("button").contains("Suivant").click();

    cy.contains("Durée du préavis");
    cy.contains("2 mois");
    cy.contains("Boulangerie-pâtisserie (entreprises artisanales)");
    cy.contains(
      "Personnel de fabrication, personnel de vente et personnel de services"
    );
    cy.contains("Plus de 2 ans");
    cy.contains("Article 32");
  });
});
