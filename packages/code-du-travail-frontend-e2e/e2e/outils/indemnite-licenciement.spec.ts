describe("Outil - Indemnité de licenciement", () => {
  it("Calcul de l'ndemnité de licenciement", () => {
    cy.visit("/outils/indemnite-licenciement");
    cy.get("h1").should("have.text", "Calculer l'indemnité de licenciement");
    cy.contains("Commencer").click();

    cy.contains("Contrat à durée indeterminé (CDI)").click();
    cy.get('label:contains("Non")').first().click();
    cy.get('label:contains("Non")').eq(1).click();
    cy.contains("Suivant").click();

    cy.get("#dateEntree").type("01/01/2000");
    cy.get("#dateNotification").type("01/01/2022");
    cy.get("#dateSortie").type("01/01/2022");

    cy.contains("Oui").click();
    cy.get("[name='0.duration']").type("1");
    cy.contains("Ajouter une absence").click();
    cy.get("[name='1.duration']").type("1");
    cy.contains("Suivant").click();

    cy.contains("Non").click();
    cy.get('label:contains("Oui")').eq(1).click();
    cy.get("#salaireBrut").type("1000");
    cy.contains("Suivant").click();

    cy.get("form p").should(
      "contain",
      "Le code du travail prévoit un montant minimum de : 6 444,45 € brut."
    );
    cy.contains("Imprimer le résultat").should("be.visible");
  });
});
