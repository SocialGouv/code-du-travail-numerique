import "cypress-iframe";

describe("Outil - Salaire brut/net", () => {
  it("Valider que le simulateur s'affiche correctement dans l'iframe", () => {
    cy.visit("/outils/simulateur-embauche");
    cy.get("h1").should("have.text", "Calculer le salaire brut/net");
    cy.iframe("#simulateurEmbauche")
      .contains("Coût total employeur")
      .should("be.visible");
    cy.iframe("#simulateurEmbauche")
      .find("#salarié___coût_total_employeur")
      .type("1000");
    cy.iframe("#simulateurEmbauche")
      .contains("De quel type de contrat s'agit-il ?")
      .should("be.visible");
  });
});
