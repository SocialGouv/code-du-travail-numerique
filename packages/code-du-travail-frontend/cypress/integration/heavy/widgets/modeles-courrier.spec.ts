import "cypress-iframe";

describe("Widget - Modèles de courrier", () => {
  it("Page widget modeles", () => {
    cy.visit("/widgets/modeles-de-courriers/9a6cf1b40c");
    cy.contains("Lettre de démission");

    cy.contains("Télécharger le Modèle de lettre - Lettre de démission").should(
      "have.attr",
      "href",
      "https://cdtn-prod-public.s3.gra.io.cloud.ovh.net/preview/default/lettre_de_demission.docx"
    );
    cy.checkCanonical("/modeles-de-courriers/lettre-de-demission");
  });

  it("s'affiche bien sur un site externe", () => {
    cy.visit("https://socialgouv.github.io/cdtn-admin/modeles");
    cy.iframe()
      .contains("LUTTE CONTRE LE HARCELEMENT SEXUEL")
      .should("be.visible");
  });
});
