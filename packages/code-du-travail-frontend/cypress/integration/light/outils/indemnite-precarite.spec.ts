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
    cy.get('input[type="text"]').eq(1).type("843");
    cy.get('ul[role="listbox"] li').contains("Boulangerie-pâtisserie").click();
    cy.get("button").contains("Suivant").click();

    cy.get("fieldset")
      .contains("Quel est le type du contrat de travail ?")
      .parent()
      .within(() => {
        cy.contains(
          "Contrat de travail temporaire (Contrat d'intérim)"
        ).click();
      });
    cy.get("fieldset")
      .contains("S'agit-il d'un contrat de mission-formation ?")
      .parent()
      .within(() => {
        cy.contains("Non").click();
      });
    cy.get("fieldset")
      .contains(
        "Le contrat d'intérim a-t-il été rompu avant la fin prévue pour une des raisons suivantes : la propre initiative du salarié, la faute grave du salarié, cas de force majeure ?"
      )
      .parent()
      .within(() => {
        cy.contains("Non").click();
      });
    cy.get("fieldset")
      .contains(
        "À la fin du contrat d'intérim, le salarié a-t-il été immédiatement embauché en CDI au sein de l'entreprise dans laquelle il effectuait sa mission ?"
      )
      .parent()
      .within(() => {
        cy.contains("Non").click();
      });

    cy.get("fieldset")
      .contains(
        "Le salarié a-t-il refusé la mise en œuvre de la souplesse prévue dans le contrat d'intérim ?"
      )
      .parent()
      .within(() => {
        cy.contains("Non").click();
      });
    cy.contains("Suivant").click();

    cy.get("fieldset")
      .contains(
        "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail ?"
      )
      .parent()
      .within(() => {
        cy.contains("En indiquant le montant total des rémunérations.").click();
      });

    cy.get("#input-salaireTotal").type("2000");
    cy.contains("Suivant").click();

    cy.contains("Détail du calcul").should("be.visible");
    cy.contains("200").should("be.visible");
    cy.contains("Imprimer le résultat").should("be.visible");
  });
});
