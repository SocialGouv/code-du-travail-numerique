import "cypress-iframe";

describe("Outil - Salaire brut/net", () => {
  it("Valider que le simulateur s'affiche correctement dans l'iframe", () => {
    cy.visit("/outils/simulateur-embauche");
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Calculer le salaire brut/net"
    );
  });
});
