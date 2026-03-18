describe("Pages informations", () => {
  it("je vois une page info classique", () => {
    cy.visit(
      "/information/metallurgie-lessentiel-de-la-nouvelle-convention-collective"
    );
    cy.isIndexable();
    cy.canonicalUrlEqual(
      "/information/metallurgie-lessentiel-de-la-nouvelle-convention-collective"
    );
    cy.titleAndMetaDescriptionEqual(
      "Métallurgie : l’essentiel de la nouvelle convention collective - Code du travail numérique",
      "Découvrez l’essentiel de la convention collective nationale de la métallurgie, applicable au 1er janvier 2024."
    );
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Métallurgie : l’essentiel de la nouvelle convention collective"
    );
    cy.get("body").should(
      "contain",
      "Le 1er janvier 2024, la nouvelle convention collective nationale de la métallurgie remplace les 76 conventions collectives territoriales et les conventions collectives nationales."
    );
  });
});
