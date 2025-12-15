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

    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Calculer le salaire brut/net"
    );

    cy.get(IFRAME_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT }).should(
      "be.visible"
    );
    cy.frameLoaded(IFRAME_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT });

    cy.iframe(IFRAME_SELECTOR)
      .contains("Coût total employeur", { timeout: IFRAME_LOAD_TIMEOUT })
      .should("be.visible");

    cy.iframe(IFRAME_SELECTOR)
      .find(SALAIRE_INPUT_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT })
      .should("be.visible")
      .scrollIntoView()
      .click({ force: true });

    cy.iframe(IFRAME_SELECTOR)
      .find(SALAIRE_INPUT_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT })
      .clear({ force: true });

    cy.iframe(IFRAME_SELECTOR)
      .find(SALAIRE_INPUT_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT })
      .type("1000", { delay: 0, force: true });

    // Le simulateur dans l'iframe peut déclencher des re-renders et/ou ne mettre à jour
    // certains écrans qu'après blur. On re-query puis on blur pour stabiliser.
    //
    // Attention: la valeur est formatée (espaces insécables / espace fine insécable),
    // donc on normalise avant d'asserter.
    cy.iframe(IFRAME_SELECTOR)
      .find(SALAIRE_INPUT_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT })
      .invoke("val")
      .should((value) => {
        const normalized = String(value).replace(/[\s\u00a0\u202f]/g, "");
        expect(normalized).to.eq("1000€");
      });

    cy.iframe(IFRAME_SELECTOR)
      .find(SALAIRE_INPUT_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT })
      .blur({ force: true });

    // Texte potentiellement variable (apostrophe typographique ’ vs ') => regex plus robuste
    cy.iframe(IFRAME_SELECTOR)
      .contains(/De quel type de contrat s(?:'|’)agit-il\s*\?/, {
        timeout: IFRAME_LOAD_TIMEOUT,
      })
      .should("be.visible");
  });
});
