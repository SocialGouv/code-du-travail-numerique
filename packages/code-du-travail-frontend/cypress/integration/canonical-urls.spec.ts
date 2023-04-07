describe("référencement", () => {
  it("vérification des balises canonical", () => {
    cy.visit("/");
    cy.checkCanonical("/");

    cy.visit("/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd");
    cy.checkCanonical(
      "/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd"
    );

    cy.visit("/contribution/1090-quelle-peut-etre-la-duree-maximale-dun-cdd");
    cy.checkCanonical(
      "/contribution/1090-quelle-peut-etre-la-duree-maximale-dun-cdd"
    );

    cy.visit(
      "/contribution/1090-quelle-peut-etre-la-duree-maximale-dun-cdd?queryParam=ab"
    );
    cy.checkCanonical(
      "/contribution/1090-quelle-peut-etre-la-duree-maximale-dun-cdd"
    );
  });
});
