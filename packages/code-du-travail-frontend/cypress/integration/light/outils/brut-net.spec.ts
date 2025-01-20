import "cypress-iframe";

describe("Outil - Salaire brut/net", () => {
  it("Valider que le simulateur s'affiche correctement dans l'iframe", () => {
    cy.visit("/outils/simulateur-embauche");
    cy.titleAndMetaDescriptionEqual(
      "Simulateur - Calcul du salaire brut/net - Code du travail numérique",
      "Réalisez vos conversions et calculs de salaire (brut en net, net en brut, net après impôt, heures supplémentaires et coût total employeur) avec notre simulateur."
    );
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Calculer le salaire brut/net"
    );
    cy.iframe("#simulateurEmbauche")
      .contains("Coût total employeur")
      .should("be.visible");
    cy.iframe("#simulateurEmbauche")
      .find("#salarié___coût_total_employeur")
      .as("salaireInput")
      .click();
    cy.get("@salaireInput").type("1000");
    cy.iframe("#simulateurEmbauche")
      .contains("De quel type de contrat s'agit-il ?")
      .should("be.visible");
  });
});
