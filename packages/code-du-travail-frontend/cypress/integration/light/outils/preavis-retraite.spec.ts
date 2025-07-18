describe("Outil - Préavis de retraite", () => {
  it("Parcours sans convention collective avec validation des erreurs", () => {
    cy.visit("/outils/preavis-retraite");
    // Intro
    cy.get("h1").should(
      "have.text",
      "Calculer le préavis de départ à la retraite"
    );
    cy.get("button").contains("Commencer").click({ force: true });

    // Origine du départ à la retraite
    cy.contains("Qui est à l'origine du départ en retraite ?");
    cy.get("button").contains("Suivant").click();
    cy.contains("Vous devez répondre à cette question");
    cy.get(
      'label:contains("L\'employeur décide de mettre le salarié à la retraite")'
    )
      .first()
      .click();
    cy.contains("Vous devez répondre à cette question").should("not.exist");
    cy.contains("À noter");
    cy.contains(
      "L'employeur qui décide une mise à la retraite doit en avoir informé son salarié"
    );
    cy.contains("L'employeur peut-il mettre d'office un salarié à la retraite")
      .should("have.prop", "href")
      .and(
        "equal",
        `${Cypress.config().baseUrl}/fiche-service-public/un-employeur-peut-il-mettre-doffice-un-salarie-a-la-retraite`
      );
    cy.get(
      'label:contains("Le salarié décide lui-même de partir à la retraite")'
    )
      .first()
      .click();
    cy.contains("À noter").should("not.exist");
    cy.contains(
      "L'employeur qui décide une mise à la retraite doit en avoir informé son salarié"
    ).should("not.exist");
    cy.get("button").contains("Suivant").click();

    // Convention collective
    cy.contains("Quel est le nom de la convention collective applicable ?");
    cy.get("button").contains("Suivant").click();
    cy.contains("Vous devez répondre à cette question");
    cy.get(
      'label:contains("Je ne souhaite pas renseigner ma convention collective (je passe l\'étape)")'
    )
      .first()
      .click();
    cy.contains("Vous devez répondre à cette question").should("not.exist");
    cy.contains("Attention");
    cy.contains(
      "Vous pouvez passer cette étape et poursuivre la simulation qui vous fournira un résultat basé sur le code du travail."
    );
    cy.get("button").contains("Suivant").click();

    // Informations
    cy.contains(
      "Le salarié concerné est-il reconnu en tant que travailleur handicapé ?"
    );
    cy.get("button").contains("Suivant").click();
    cy.contains("Vous devez répondre à cette question");
    cy.get('label:contains("Non")').first().click();
    cy.contains("Vous devez répondre à cette question").should("not.exist");
    cy.get("button").contains("Suivant").click();

    // Ancienneté
    cy.contains(
      "Le salarié a-t-il plus de 2 ans d'ancienneté dans l'entreprise (2 ans + 1 jour)"
    );
    cy.get("button").contains("Suivant").click();
    cy.contains("Vous devez répondre à cette question");
    cy.get('label:contains("Oui")').first().click();
    cy.contains("Vous devez répondre à cette question").should("not.exist");
    cy.get("button").contains("Suivant").click();

    // Résultat
    cy.contains("2 mois");
    cy.contains("Durée prévue par le code du travail (durée légale) : 2 mois");
    cy.contains(
      "Durée prévue par la convention collective (durée conventionnelle) : convention collective non renseignée"
    );
    cy.contains(
      "La convention collective n'ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale."
    );
  });

  it("Parcours en connaissant sa convention collective", () => {
    cy.visit("/outils/preavis-retraite");
    // Intro
    cy.get("button").contains("Commencer").click({ force: true });

    // Origine du départ à la retraite
    cy.get(
      'label:contains("Le salarié décide lui-même de partir à la retraite")'
    )
      .first()
      .click();
    cy.get("button").contains("Suivant").click();

    // Convention collective
    cy.contains("Quel est le nom de la convention collective applicable ?");
    cy.get(
      'label:contains("Je sais quelle est ma convention collective et je la saisis.")'
    )
      .first()
      .click();
    cy.contains("Précisez et sélectionnez votre convention collective");
    cy.get('input[type="text"]').eq(1).type("843");
    cy.get('ul[role="listbox"] li').contains("Boulangerie").click();
    cy.get("button").contains("Suivant").click();

    // Informations
    cy.get('label:contains("Oui")').first().click();
    cy.get("button").contains("Suivant").click();

    // Ancienneté
    cy.contains(
      "Le salarié a-t-il plus de 2 ans d'ancienneté dans l'entreprise (2 ans + 1 jour)"
    );
    cy.get('label:contains("Non")').first().click();
    cy.contains(
      "Quelle est l'ancienneté du salarié dans l'entreprise en mois ?"
    );
    cy.get('input[name="seniorityInMonths"]').type("10");
    cy.get("button").contains("Suivant").click();

    // Résultat
    cy.contains("Préavis de départ à la retraite");
    cy.contains("2 mois");
    cy.contains("Travailleur handicapé : Oui*");
    cy.contains(
      "Le salarié étant reconnu en tant que travailleur handicapé, la durée du préavis de départ à la retraite est doublée mais ne peut pas dépasser un maximum de 3 mois."
    );
    cy.contains("Durée prévue par le code du travail (durée légale) : 2 mois");
    cy.contains(
      "Durée prévue par la convention collective (durée conventionnelle) : 2 mois"
    );
    cy.contains(
      "Ce résultat tient compte de la majoration pour les travailleurs handicapés."
    );
  });

  it("Parcours en ne connaissant pas sa convention collective", () => {
    cy.visit("/outils/preavis-retraite");
    // Intro
    cy.get("button").contains("Commencer").click({ force: true });

    // Origine du départ à la retraite
    cy.get(
      'label:contains("Le salarié décide lui-même de partir à la retraite")'
    )
      .first()
      .click();
    cy.get("button").contains("Suivant").click();

    // Convention collective
    cy.contains("Quel est le nom de la convention collective applicable ?");
    cy.get(
      'label:contains("Je ne sais pas quelle est ma convention collective et je la recherche.")'
    )
      .first()
      .click();
    cy.contains("Précisez votre entreprise");
    cy.get("button").contains("Suivant").click();
    cy.contains("Vous devez sélectionner une entreprise");
    cy.selectByLabel("Nom de votre entreprise ou numéro Siren/Siret").type(
      "CARREFOUR BANQUE"
    );
    cy.get('button[type="submit"]').last().click();
    cy.contains("CARREFOUR BANQUE").click();
    cy.contains("2 conventions collectives trouvées");
    cy.contains("Sociétés financières IDCC 0478");
    cy.contains("Banque IDCC 2120");
    cy.get('label:contains("Sociétés financières IDCC 0478")').first().click();
    cy.contains("Vous devez sélectionner une entreprise").should("not.exist");
    cy.contains("Nous n'avons pas de réponse pour cette convention collective");
    cy.get("button").contains("Modifier").click();
    cy.selectByLabel("Nom de votre entreprise ou numéro Siren/Siret").clear();
    cy.selectByLabel("Nom de votre entreprise ou numéro Siren/Siret").type(
      "boursorama"
    );
    cy.selectByLabel("Code postal ou Ville").type("9210");
    cy.selectByLabel("Code postal ou Ville").type("0{downArrow}{enter}", {
      delay: 2000,
      force: true,
    });
    cy.get('button[type="submit"]').last().click();
    cy.contains(
      "BOURSORAMA (BOURSORAMA - BOURSORAMA BANQUE - BOURSOBANK)"
    ).click();
    cy.contains("Vous avez sélectionné la convention collective");

    cy.get("button").contains("Suivant").click();

    // Informations
    cy.get('label:contains("Non")').first().click();
    cy.get("button").contains("Suivant").click();

    // Ancienneté
    cy.get('label:contains("Oui")').first().click();
    cy.get("button").contains("Suivant").click();

    // Résultat
    cy.contains("Préavis de départ à la retraite");
    cy.contains("2 mois");
    cy.contains("Durée prévue par le code du travail (durée légale) : 2 mois");
    cy.contains(
      "Durée prévue par la convention collective (durée conventionnelle) : pas de préavis"
    );
    cy.contains(
      "En l'absence de durée prévue par la convention collective, la durée de préavis à appliquer pour le salarié est donc la durée légale."
    );
  });
});
