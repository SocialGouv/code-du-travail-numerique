describe("Outil - Préavis de démission", () => {
  it("Parcours avec convention collective non traitée", () => {
    cy.visit("/outils/preavis-demission");
    // Intro
    cy.get("h1").should("have.text", "Calculer le préavis de démission");
    cy.get("button").contains("Commencer").click({ force: true });

    // Convention collective
    cy.get(
      'label:contains("Je sais quelle est ma convention collective et je la saisis.")'
    )
      .first()
      .click();
    cy.contains("Précisez et sélectionnez votre convention collective");
    cy.get('input[type="text"]').eq(1).type("1388");
    cy.get('ul[role="listbox"] li').contains("Industrie du pétrole").click();

    cy.contains(
      "La convention collective sélectionnée n'est pas traitée par nos services."
    );
    cy.get("button").contains("Suivant").click();
    cy.contains(
      "La simulation ne peut pas se poursuivre avec cette convention collective"
    );
  });

  it("Parcours en connaissant sa convention collective", () => {
    cy.visit("/outils/preavis-demission");
    // Intro
    cy.get("h1").should("have.text", "Calculer le préavis de démission");
    cy.get("button").contains("Commencer").click({ force: true });

    // Convention collective
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
    cy.contains("Quelle est la catégorie professionnelle du salarié");
    cy.get(
      '[id="input-infos.contrat salarié - convention collective - boulangerie patisserie - catégorie professionnelle"]'
    ).select(
      "Personnel de fabrication, personnel de vente et personnel de services"
    );

    cy.contains("Quelle est l'ancienneté du salarié");
    cy.get(
      '[id="input-infos.contrat salarié - convention collective - boulangerie patisserie - catégorie professionnelle Personnel de fabrication, personnel de vente et personnel de services - ancienneté"]'
    ).select("Plus de 6 mois");
    cy.get("button").contains("Suivant").click();

    // Résultat
    cy.contains("Durée du préavis");
    cy.contains("2 semaines");
    cy.contains("Boulangerie-pâtisserie (entreprises artisanales)");
    cy.contains(
      "Personnel de fabrication, personnel de vente et personnel de services"
    );
    cy.contains("Plus de 6 mois");
  });
});
