describe("Outil - Heures d'absence pour rechercher un emploi", () => {
  it("Parcours avec convention collective non traité", () => {
    cy.visit("/outils/heures-recherche-emploi");
    cy.get("h1").should(
      "have.text",
      "Calculer le nombre d'heures d'absence pour rechercher un emploi"
    );
    cy.contains("Commencer").click();

    cy.get("#agreement").check();
    cy.contains("Précisez et sélectionnez votre convention collective");
    cy.get("#agreement-search").type("1388");
    cy.get('ul[role="listbox"] li').contains("Industrie du pétrole").click();
    cy.contains("Convention collective non traitée");
    cy.get("button").contains("Suivant").click();
    cy.contains(
      "La simulation ne peut pas se poursuivre avec cette convention collective"
    );
  });

  it("Parcours en connaissant sa convention collective et sans information complémentaire", () => {
    cy.visit("/outils/heures-recherche-emploi");
    cy.get("h1").should(
      "have.text",
      "Calculer le nombre d'heures d'absence pour rechercher un emploi"
    );
    cy.contains("Commencer").click();

    cy.get("#agreement").check();
    cy.contains("Précisez et sélectionnez votre convention collective");
    cy.get("#agreement-search").type("843");
    cy.get('ul[role="listbox"] li').contains("Boulangerie").click();
    cy.contains("Cliquez sur Suivant pour poursuivre la simulation.");
    cy.get("button").contains("Suivant").click();

    cy.get("#input-typeRupture").select("Licenciement");
    cy.get("button").contains("Suivant").click();

    cy.contains(
      "Nombre d’heures d’absence autorisée pour rechercher un emploi"
    );
    cy.contains(
      "Nombre d’heures d’absence autorisée pour rechercher un emploi"
    );
    cy.contains(
      "2 heures d'absence par jour pendant la dernière semaine du préavis"
    );
    cy.contains("Rémunération pendant les heures d’absence autorisée");
    cy.contains(
      "Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération."
    );
    cy.contains("Conditions d’utilisation");
    cy.contains(
      "Les heures sont fixées un jour par l' employeur et le suivant par le salarié. Ils peuvent décider de regrouper tout ou partie de ces heures."
    );

    cy.get('div[role="button"]').contains("Voir le détail du calcul").click();
    cy.contains("Boulangerie-pâtisserie (entreprises artisanales)");
    cy.contains("Licenciement");
  });

  it.only("Parcours en connaissant sa convention collective et avec informations complémentaires", () => {
    cy.visit("/outils/heures-recherche-emploi");
    cy.get("h1").should(
      "have.text",
      "Calculer le nombre d'heures d'absence pour rechercher un emploi"
    );
    cy.contains("Commencer").click();

    cy.get("#agreement").check();
    cy.contains("Précisez et sélectionnez votre convention collective");
    cy.get("#agreement-search").type("787");
    cy.get('ul[role="listbox"] li')
      .contains(
        "Personnel des cabinets d'experts-comptables et de commissaires aux comptes"
      )
      .click();
    cy.contains("Cliquez sur Suivant pour poursuivre la simulation.");
    cy.get("button").contains("Suivant").click();
    cy.contains("Pour quelle raison le contrat de travail a-t-il été rompu");

    cy.get("#input-typeRupture").select("Démission");
    cy.get("button").contains("Suivant").click();

    cy.contains("Quelle est l'ancienneté du salarié");
    cy.get('[data-testid="criteria.ancienneté"]').select("Au moins 5 ans");
    cy.get("button").contains("Suivant").click();

    cy.contains(
      "Nombre d’heures d’absence autorisée pour rechercher un emploi"
    );
    cy.contains("2 heures par journée d'ouverture du cabinet");
    cy.contains("Rémunération pendant les heures d’absence autorisée");
    cy.contains("Le salaire est maintenu.");
    cy.contains("Conditions d’utilisation");
    cy.contains(
      "Les heures sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, ces absences sont fixées un jour par l'employeur et le salarié. Le salarié qui a retrouvé un emploi ne peut plus utiliser ces heures."
    );

    cy.get('div[role="button"]').contains("Voir le détail du calcul").click();
    cy.contains(
      "Personnel des cabinets d'experts-comptables et de commissaires aux comptes"
    );
    cy.contains("Démission");
    cy.contains("Au moins 5 ans");
  });
});
