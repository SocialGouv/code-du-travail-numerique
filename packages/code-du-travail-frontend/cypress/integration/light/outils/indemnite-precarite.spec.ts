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

    // Utiliser les id pour les tests
    cy.get("#contractType-ctt").click();
    cy.get("#cttFormation-non").click();
    cy.get("#ruptureContratFauteGrave-non").click();
    cy.get("#propositionCDIFinContrat-non").click();
    cy.get("#refusSouplesse-non").click();
    cy.contains("Suivant").click();

    // Sélectionner le type de rémunération et saisir un montant
    cy.get('input[value="total"]').click();
    cy.get("#input-salaireTotal").type("2000");
    cy.contains("Suivant").click();

    // Vérifier le résultat
    cy.contains("Résultat").should("be.visible");
    cy.contains("200").should("be.visible");
    cy.contains("Imprimer le résultat").should("be.visible");
  });
});
