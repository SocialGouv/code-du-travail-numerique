describe("Outil - Indemnité de Precarite", () => {
  it("Calcul de l'indemnité de precarite", () => {
    cy.visit("/outils/indemnite-precarite");
    cy.get("h1").should("have.text", "Calculer l'indemnité de précarité");
    cy.contains("Commencer").click();

    cy.get(
      'label:contains("Je sais quelle est ma convention collective et je la saisis.")'
    )
      .first()
      .click();
    cy.contains("Précisez et sélectionnez votre convention collective");
    cy.get('input[type="search"]').eq(1).type("843");
    cy.get('ul[role="listbox"] li').contains("Boulangerie-pâtisserie").click();
    cy.get("button").contains("Suivant").click();

    // Utiliser les name pour les tests
    cy.get('input[name="contractType"][value="ctt"]').click();
    cy.get('input[name="cttFormation"][value="false"]').click();
    cy.get('input[name="ruptureContratFauteGrave"][value="false"]').click();
    cy.get('input[name="propositionCDIFinContrat"][value="false"]').click();
    cy.get('input[name="refusSouplesse"][value="false"]').click();
    cy.contains("Suivant").click();

    // Sélectionner le type de rémunération et saisir un montant
    cy.get('input[value="total"]').click();
    cy.get("#input-salaireTotal").type("2000");
    cy.contains("Suivant").click();

    // Vérifier le résultat
    cy.contains("Détail du calcul").should("be.visible");
    cy.contains("200").should("be.visible");
    cy.contains("Imprimer le résultat").should("be.visible");
  });
});
