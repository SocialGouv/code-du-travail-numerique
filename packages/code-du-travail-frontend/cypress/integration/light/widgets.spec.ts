describe("Widgets - Chargement local", () => {
  const widgets = [
    {
      path: "/widgets/indemnite-licenciement",
      title: "Calculer l'indemnité de licenciement",
    },
    {
      path: "/widgets/procedure-licenciement",
      title: "Comprendre sa procédure de licenciement",
    },
    {
      path: "/widgets/indemnite-precarite",
      title: "Calculer l'indemnité de précarité",
    },
    {
      path: "/widgets/preavis-demission",
      title: "Calculer le préavis de démission",
    },
    {
      path: "/widgets/preavis-licenciement",
      title: "Calculer le préavis de licenciement",
    },
    {
      path: "/widgets/preavis-retraite",
      title: "Calculer le préavis de départ à la retraite",
    },
    {
      path: "/widgets/indemnite-rupture-conventionnelle",
      title: "Calculer l'indemnité de rupture conventionnelle",
    },
    {
      path: "/widgets/modeles-de-courriers/9a6cf1b40c",
      title: "Lettre de démission",
    },
    {
      path: "/widgets/search",
      title: "Trouvez les réponses à vos questions en droit du travail",
    },
    {
      path: "/widgets/convention-collective",
      title: "Trouver sa convention collective",
    },
  ];

  widgets.forEach((widget) => {
    it(`devrait charger le widget ${widget.path}`, () => {
      cy.visit(widget.path);
      cy.checkNoIndex();
      const expectedUrl =
        widget.path === "/widgets/search"
          ? "/recherche"
          : "/outils/" + widget.path.split("/").pop();
      cy.canonicalUrlEqual(expectedUrl);
      cy.contains(widget.title).should("be.visible");
    });
  });

  it("Vérification du lien de téléchargement du modèle de lettre de démission", () => {
    cy.visit("/widgets/modeles-de-courriers/9a6cf1b40c");
    cy.contains("Télécharger le Modèle de lettre - Lettre de démission").should(
      "have.attr",
      "href",
      "https://cdtn-prod-public.s3.gra.io.cloud.ovh.net/preview/default/lettre_de_demission.docx"
    );
  });

  it("Page widget preavis de retraite", () => {
    cy.visit("/widgets/preavis-retraite");
    cy.contains("Étape");
    cy.contains("Calculer le préavis de départ à la retraite");
    cy.contains(
      "Ce simulateur vous permet de calculer la durée de préavis à respecter en cas de départ ou de mise à la retraite"
    );

    cy.get("button").contains("Commencer").click({ force: true });
    cy.contains("Qui est à l'origine du départ en retraite ?");
  });

  it("Page widget preavis de licenciement", () => {
    cy.visit("/widgets/preavis-licenciement");
    cy.contains("Étape");
    cy.contains("Calculer le préavis de licenciement");
    cy.contains(
      "Ce simulateur permet de calculer la durée du préavis accordée au salarié en cas de licenciement"
    );

    cy.get("button").contains("Commencer").click({ force: true });
    cy.contains("Le licenciement est-il dû à une faute grave (ou lourde) ?");
  });
});
