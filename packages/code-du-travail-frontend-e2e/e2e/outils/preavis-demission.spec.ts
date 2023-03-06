describe("Outil - Préavis de démission", () => {
  it("Parcours avec convention collective non traité", () => {
    cy.visit("/outils/preavis-demission");
    cy.get("h1").should("have.text", "Calculer le préavis de démission");
    cy.contains("Commencer").click();

    cy.get("#agreement").check();
    cy.contains("Précisez et sélectionnez votre convention collective");
    cy.get("#agreement-search").type("1388");
    cy.get('ul[role="listbox"] li').contains("Industrie du pétrole").click();

    cy.contains("Convention collective non traitée");
    cy.contains("Suivant").click();
    cy.contains(
      "La simulation ne peut pas se poursuivre avec cette convention collective"
    );
  });

  it("Parcours en connaissant sa convention collective", () => {
    cy.visit("/outils/preavis-demission");
    cy.get("h1").should("have.text", "Calculer le préavis de démission");
    cy.contains("Commencer").click();

    cy.get("#agreement").check();
    cy.contains("Précisez et sélectionnez votre convention collective");
    cy.get("#agreement-search").type("843");
    cy.get('ul[role="listbox"] li').contains("Boulangerie").click();

    cy.contains("Cliquez sur Suivant pour poursuivre la simulation.");
    cy.get("button").contains("Suivant").click();

    cy.contains("Quelle est la catégorie professionnelle du salarié");
    cy.get('[data-testid="criteria.catégorie professionnelle"]').select(
      "Personnel de fabrication, personnel de vente et personnel de services"
    );

    cy.contains("Quelle est l'ancienneté du salarié");
    cy.get('[data-testid="criteria.ancienneté"]').select("Plus de 6 mois");
    cy.contains("Suivant").click();

    cy.contains("Durée du préavis");
    cy.contains("2 semaines");
    cy.get('div[role="button"]').contains("Voir le détail du calcul").click();
    cy.contains("Boulangerie-pâtisserie (entreprises artisanales)");
    cy.contains(
      "Personnel de fabrication, personnel de vente et personnel de services"
    );
    cy.contains("Plus de 6 mois");
  });
});
