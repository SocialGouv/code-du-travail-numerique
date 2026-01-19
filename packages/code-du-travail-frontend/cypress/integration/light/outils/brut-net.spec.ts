describe("Outil - Salaire brut/net", () => {
  it("Valider que le simulateur s'affiche correctement dans l'iframe", () => {
    const EXTERNAL_SCRIPT_URL =
      "https://mon-entreprise.urssaf.fr/simulateur-iframe-integration.js";
    const IFRAME_SELECTOR = "iframe#simulateurEmbauche";
    const IFRAME_LOAD_TIMEOUT = 30_000;

    // Le contenu de cet outil est injecté via un script tiers.
    // En CI, ce script peut être bloqué / lent => test flaky.
    // On stub le script pour rendre le test déterministe (smoke test).
    cy.intercept("GET", EXTERNAL_SCRIPT_URL, {
      statusCode: 200,
      headers: { "content-type": "application/javascript" },
      body: `(() => {
  const root = document.currentScript && document.currentScript.parentElement;
  if (!root) return;
  const iframe = document.createElement('iframe');
  iframe.id = 'simulateurEmbauche';
  root.appendChild(iframe);
})();`,
    }).as("simulateurEmbaucheScript");

    cy.visit("/outils/simulateur-embauche");
    cy.titleAndMetaDescriptionEqual(
      "Simulateur - Calcul du salaire brut/net - Code du travail numérique",
      "Réalisez vos conversions et calculs de salaire (brut en net, net en brut, net après impôt, heures supplémentaires et coût total employeur) avec notre simulateur."
    );

    cy.findByRole("heading", {
      level: 1,
      name: "Calculer le salaire brut/net",
    }).should("be.visible");

    cy.wait("@simulateurEmbaucheScript");

    cy.get("script#script-simulateur-embauche", {
      timeout: IFRAME_LOAD_TIMEOUT,
    })
      .should("exist")
      .and("have.attr", "src", EXTERNAL_SCRIPT_URL);

    cy.get(IFRAME_SELECTOR, { timeout: IFRAME_LOAD_TIMEOUT }).should("exist");
  });
});
