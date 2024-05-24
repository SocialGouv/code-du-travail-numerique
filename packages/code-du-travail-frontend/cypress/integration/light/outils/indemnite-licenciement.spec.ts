describe("Outil - Indemnité de licenciement", () => {
  it("Calcul de l'indemnité de licenciement", () => {
    cy.visit("/outils/indemnite-licenciement");
    cy.get("h1").should("have.text", "Calculer l'indemnité de licenciement");
    cy.contains("Commencer").click();

    cy.contains("Contrat à durée indéterminée (CDI)").click();
    cy.get('label:contains("Non")').first().click();
    cy.get('label:contains("Non")').eq(1).click();
    cy.get('label:contains("Non")').eq(2).click();
    cy.contains("Suivant").click();

    cy.get("#route-none").check();
    cy.contains("Suivant").click();

    cy.get("#dateEntree").type("2000-01-01");
    cy.get("#dateNotification").type("2023-06-01");
    cy.get("#dateSortie").type("2023-06-01");

    cy.contains("Oui").click();
    cy.get("[name='0.duration']").type("1");
    cy.contains("Ajouter une absence").click();
    cy.get("[name='1.duration']").type("1");
    cy.contains("Suivant").click();

    cy.contains("Non").click();
    cy.get('label:contains("Oui")').eq(1).click();
    cy.get("#salary").type("1000");
    cy.contains("Suivant").click();

    cy.get("form p").should(
      "contain",
      "À partir des éléments que vous avez saisis, l’indemnité de licenciement est estimée à :"
    );
    cy.get("form p strong").should("contain", "6916,67\u00a0€.");
    cy.get("form p").should(
      "contain",
      "Attention il peut exister un montant plus favorable"
    );
    cy.contains("Imprimer le résultat").should("be.visible");
  });
});
