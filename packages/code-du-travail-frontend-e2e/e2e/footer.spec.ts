describe("Footer", () => {
  it("should display all footer links and modals correctly", () => {
    cy.visit("/");

    cy.contains("Besoin de plus d’information").click();

    cy.contains("Contacter nos services en région").click();

    cy.get("#search-service").type("75").type("{enter}");

    cy.get(
      'a[href="https://idf.drieets.gouv.fr/Adresse-et-horaires-d-ouverture-de-l-unite-departementale-75"]'
    ).should("have.attr", "target", "_blank");

    cy.get('button[title="fermer la modale"]').click();

    cy.contains("Le droit du travail").click();

    cy.contains("Qu’est-ce que le droit du travail");
    cy.contains("Quels sont les textes à l’origine du droit du travail");
    cy.contains("Existe-t-il une hiérarchie entre les textes");

    cy.contains("Glossaire").click();

    cy.contains("Abrogation").click();

    cy.contains("Définition");
    cy.contains("Sources");

    cy.contains("Retour").click();

    cy.contains("À propos").click();

    cy.contains("Qu’est-ce que le Code du travail numérique");
    cy.contains("Qui sommes-nous");

    cy.contains("Mentions légales").click();

    cy.contains("Directeur de la publication");
    cy.contains("Hébergement");
    cy.contains("Accessibilité");
    cy.contains("Sécurité");

    cy.contains("Politique de confidentialité").click();

    cy.contains("Traitement des données à caractère personnel");
    cy.contains("Cookies");

    cy.contains("Statistiques d’utilisation").click();

    cy.contains("Statistiques d’utilisation depuis le");

    cy.contains(/^\s*Contact\s*$/).click();

    cy.contains("les services du ministère du Travail");
    cy.contains("vous pouvez nous contacter");

    cy.get('a[href="mailto:codedutravailnumerique@travail.gouv.fr"]');
  });
});
