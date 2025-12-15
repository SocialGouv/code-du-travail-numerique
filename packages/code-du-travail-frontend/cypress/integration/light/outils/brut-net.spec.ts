import "cypress-iframe";

describe("Outil - Salaire brut/net", () => {
  it("Valider que le simulateur s'affiche correctement dans l'iframe", () => {
    const IFRAME_SELECTOR = "iframe#simulateurEmbauche";
    const IFRAME_LOAD_TIMEOUT = 60_000;

    cy.visit("/outils/simulateur-embauche");
    cy.titleAndMetaDescriptionEqual(
      "Simulateur - Calcul du salaire brut/net - Code du travail numérique",
      "Réalisez vos conversions et calculs de salaire (brut en net, net en brut, net après impôt, heures supplémentaires et coût total employeur) avec notre simulateur."
    );

    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Calculer le salaire brut/net"
    );

    // Le simulateur est injecté via un script externe (mon-entreprise.urssaf.fr),
    // donc l'iframe peut apparaître + se charger de façon asynchrone.
    cy.get(IFRAME_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT }).should(
      "be.visible"
    );
    cy.frameLoaded(IFRAME_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT });

    cy.iframe(IFRAME_SELECTOR)
      .contains("Coût total employeur", { timeout: IFRAME_LOAD_TIMEOUT })
      .should("be.visible");

    cy.iframe(IFRAME_SELECTOR)
      .find("#salarié___coût_total_employeur-input", {
        timeout: IFRAME_LOAD_TIMEOUT,
      })
      .should("be.visible")
      .as("salaireInput");

    cy.get("@salaireInput").clear().type("1000", { delay: 0 });

    cy.iframe(IFRAME_SELECTOR)
      .contains("De quel type de contrat s'agit-il ?", {
        timeout: IFRAME_LOAD_TIMEOUT,
      })
      .should("be.visible");
  });
});
