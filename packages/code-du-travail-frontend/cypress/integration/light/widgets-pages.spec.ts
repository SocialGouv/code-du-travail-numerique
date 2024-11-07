describe("Widgets", () => {
  it("Page widget preavis de retraite", () => {
    cy.visit("/widgets/preavis-retraite");
    cy.contains("Étapes");
    cy.contains("Calculer le préavis de départ à la retraite");
    cy.contains(
      "permet de calculer la durée de préavis à respecter en cas de départ ou de mise à la retraite"
    );

    cy.get("button").contains("Commencer").click();
    cy.contains("Qui est à l’origine du départ en retraite");
  });

  it("Page widget preavis de licenciement", () => {
    cy.visit("/widgets/preavis-licenciement");
    cy.contains("Étapes");
    cy.contains("Calculer le préavis de licenciement");
    cy.contains(
      "permet de calculer la durée du préavis accordée au salarié en cas de licenciement"
    );

    cy.get("button").contains("Commencer").click();
    cy.contains("Le licenciement est-il dû à une faute grave (ou lourde)");
  });

  it("Page widget modeles", () => {
    cy.visit("/widgets/modeles-de-courriers/9a6cf1b40c");
    cy.contains("Lettre de démission");

    cy.contains("Télécharger le Modèle de lettre - Lettre de démission").should(
      "have.attr",
      "href",
      "https://cdtn-prod-public.s3.gra.io.cloud.ovh.net/preview/default/lettre_de_demission.docx"
    );
  });
});
