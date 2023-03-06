describe("Outil - Indemnité de Precarite", () => {
  it("Calcul de l'ndemnité de precarite", () => {
    cy.visit("/outils/indemnite-precarite");
    cy.get("h1").should("have.text", "Calculer l'indemnité de précarité");
    cy.contains("Commencer").click();

    cy.contains(
      "Je sais quelle est ma convention collective (je la saisis)"
    ).click();
    cy.get("#agreement-search").type("843");
    cy.contains("Boulangerie-pâtisserie (entreprises artisanales)").click();
    cy.get("button").contains("Suivant").click();

    cy.contains("(Contrat d’intérim)").click();
    cy.get("#cttFormation-non").click();
    cy.get("#ruptureContratFauteGrave-non").click();
    cy.get("#propositionCDIFinContrat-non").click();
    cy.get("#refusSouplesse-non").click();
    cy.contains("Suivant").click();

    cy.contains("montant total").click();
    cy.get("#currency-2").type("2000");
    cy.contains("Suivant").click();

    cy.contains("La prime de précarité est estimée à").should("be.visible");
    cy.contains("200").should("be.visible");
    cy.contains("Imprimer le résultat").should("be.visible");
  });
});
