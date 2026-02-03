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
      cy.canonicalUrlEqual("/outils/" + widget.path.split("/").pop());
      cy.contains(widget.title).should("be.visible");
    });
  });
});
