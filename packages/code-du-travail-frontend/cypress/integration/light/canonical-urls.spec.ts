describe("référencement", () => {
  it("vérification des balises canonical", () => {
    cy.visit("/");
    cy.canonicalUrlEqual("/");

    cy.visit("/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd");
    cy.canonicalUrlEqual(
      "/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd"
    );

    cy.visit("/contribution/1090-quelle-peut-etre-la-duree-maximale-dun-cdd");
    cy.canonicalUrlEqual(
      "/contribution/1090-quelle-peut-etre-la-duree-maximale-dun-cdd"
    );

    cy.visit(
      "/contribution/1090-quelle-peut-etre-la-duree-maximale-dun-cdd?queryParam=ab"
    );
    cy.canonicalUrlEqual(
      "/contribution/1090-quelle-peut-etre-la-duree-maximale-dun-cdd"
    );
  });
});
