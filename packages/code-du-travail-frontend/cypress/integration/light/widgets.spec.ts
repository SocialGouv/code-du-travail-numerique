describe("Widgets - Chargement local", () => {
  const widgets = [
    {
      path: "/widgets/indemnite-licenciement",
      title: "Calculer l'indemnité de licenciement",
      canonicalPath: "/outils/indemnite-licenciement",
    },
    {
      path: "/widgets/procedure-licenciement",
      title: "Comprendre sa procédure de licenciement",
      canonicalPath: "/outils/procedure-licenciement",
    },
    {
      path: "/widgets/indemnite-precarite",
      title: "Calculer l'indemnité de précarité",
      canonicalPath: "/outils/indemnite-precarite",
    },
    {
      path: "/widgets/preavis-demission",
      title: "Calculer le préavis de démission",
      canonicalPath: "/outils/preavis-demission",
    },
    {
      path: "/widgets/preavis-licenciement",
      title: "Calculer le préavis de licenciement",
      canonicalPath: "/outils/preavis-licenciement",
    },
    {
      path: "/widgets/preavis-retraite",
      title: "Calculer le préavis de départ à la retraite",
      canonicalPath: "/outils/preavis-retraite",
    },
    {
      path: "/widgets/indemnite-rupture-conventionnelle",
      title: "Calculer l'indemnité de rupture conventionnelle",
      canonicalPath: "/outils/indemnite-rupture-conventionnelle",
    },
    {
      path: "/widgets/modeles-de-courriers/9a6cf1b40c",
      title: "Lettre de démission",
      canonicalPath: "/modeles-de-courriers/lettre-de-demission",
    },
    {
      path: "/widgets/search",
      title: "Trouvez les réponses à vos questions en droit du travail",
      canonicalPath: "/recherche",
    },
    {
      path: "/widgets/convention-collective",
      title: "Trouver sa convention collective",
      canonicalPath: "/outils/convention-collective",
    },
  ];

  widgets.forEach((widget) => {
    it(`devrait charger le widget ${widget.path}`, () => {
      cy.visit(widget.path);
      cy.checkNoIndex();
      cy.canonicalUrlEqual(widget.canonicalPath);
      cy.contains(widget.title).should("be.visible");
    });
  });

  it("Vérification du lien de téléchargement du modèle de lettre de démission", () => {
    cy.visit("/widgets/modeles-de-courriers/9a6cf1b40c");
    cy.contains("Télécharger le Modèle de lettre - Lettre de démission")
      .should("have.attr", "href")
      .and("match", /\/preview\/default\/lettre_de_demission\.docx$/);
  });

  it("Page widget preavis de retraite", () => {
    cy.visit("/widgets/preavis-retraite");
    cy.contains("Calculer le préavis de départ à la retraite", {
      timeout: 10000,
    }).should("be.visible");
    cy.contains("Étape");
    cy.contains(
      "Ce simulateur vous permet de calculer la durée de préavis à respecter en cas de départ ou de mise à la retraite"
    );

    cy.get("button").contains("Commencer").should("be.visible").click();
    cy.contains("Qui est à l'origine du départ en retraite ?", {
      timeout: 10000,
    });
  });

  it("Page widget preavis de licenciement", () => {
    cy.visit("/widgets/preavis-licenciement");
    cy.contains("Calculer le préavis de licenciement", {
      timeout: 10000,
    }).should("be.visible");
    cy.contains("Étape");
    cy.contains(
      "Ce simulateur permet de calculer la durée du préavis accordée au salarié en cas de licenciement"
    );

    cy.get("button").contains("Commencer").should("be.visible").click();
    cy.contains("Le licenciement est-il dû à une faute grave (ou lourde) ?", {
      timeout: 10000,
    });
  });
});
