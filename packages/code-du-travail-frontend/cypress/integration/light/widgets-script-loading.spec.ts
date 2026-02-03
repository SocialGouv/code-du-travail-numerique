import "cypress-iframe";

describe("Widgets - Chargement via script widget-loader.js", () => {
  const PORT = 8888;

  before(() => {
    // Démarrer un serveur HTTP simple pour servir le fichier HTML de test
    cy.task("startStaticServer", {
      port: PORT,
      filePath: "cypress/fixtures/widget-tests/index.html",
    });
  });

  after(() => {
    // Arrêter le serveur HTTP
    cy.task("stopStaticServer");
  });

  it("devrait charger tous les widgets via le script widget-loader.js", () => {
    // Visiter la page HTML de test servie par le serveur statique
    cy.visit(`http://localhost:${PORT}`);

    // Attendre que le script widget-loader.js soit chargé et que les iframes soient créées
    cy.wait(5000);

    // Vérifier que les iframes ont été créées pour chaque widget
    const widgets = [
      {
        iframeId: "cdtn-iframe-indemnite-licenciement",
        title: "Calculer l'indemnité de licenciement",
      },
      {
        iframeId: "cdtn-iframe-procedure-licenciement",
        title: "Comprendre sa procédure de licenciement",
      },
      {
        iframeId: "cdtn-iframe-indemnite-precarite",
        title: "Calculer l'indemnité de précarité",
      },
      {
        iframeId: "cdtn-iframe-preavis-demission",
        title: "Calculer le préavis de démission",
      },
      {
        iframeId: "cdtn-iframe-preavis-licenciement",
        title: "Calculer le préavis de licenciement",
      },
      {
        iframeId: "cdtn-iframe-preavis-retraite",
        title: "Calculer le préavis de départ à la retraite",
      },
      {
        iframeId: "cdtn-iframe-convention-collective",
        title: "Trouver sa convention collective",
      },
    ];

    widgets.forEach((widget) => {
      // Vérifier que l'iframe existe
      cy.get(`#${widget.iframeId}`).should("exist");

      // Vérifier que le contenu du widget est chargé dans l'iframe
      cy.get(`#${widget.iframeId}`)
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then((body) => {
          cy.wrap(body).contains(widget.title).should("be.visible");
        });
    });
  });
});
