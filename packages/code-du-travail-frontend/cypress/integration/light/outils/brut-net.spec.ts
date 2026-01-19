import "cypress-iframe";

describe("Outil - Salaire brut/net", () => {
  it("Valider que le simulateur s'affiche correctement dans l'iframe", () => {
    const IFRAME_SELECTOR = "iframe#simulateurEmbauche";
    const SALAIRE_INPUT_SELECTOR =
      'input[id="salarié___coût_total_employeur-input"]';
    const IFRAME_LOAD_TIMEOUT = 60_000;

    cy.visit("/outils/simulateur-embauche");
    cy.titleAndMetaDescriptionEqual(
      "Simulateur - Calcul du salaire brut/net - Code du travail numérique",
      "Réalisez vos conversions et calculs de salaire (brut en net, net en brut, net après impôt, heures supplémentaires et coût total employeur) avec notre simulateur."
    );

    cy.findByRole("heading", {
      level: 1,
      name: "Calculer le salaire brut/net",
    }).should("be.visible");

    cy.get(IFRAME_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT }).should(
      "be.visible"
    );
    cy.frameLoaded(IFRAME_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT });

    cy.iframe(IFRAME_SELECTOR)
      .find(SALAIRE_INPUT_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT })
      .should("exist");
  });
});
