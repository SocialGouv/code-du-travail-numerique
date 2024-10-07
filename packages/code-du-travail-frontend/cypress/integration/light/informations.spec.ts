describe("Pages informations", () => {
  it("je vois une page info classique", () => {
    cy.visit(
      "/information/metallurgie-lessentiel-de-la-nouvelle-convention-collective",
    );
    cy.get("h1").should(
      "have.text",
      "Métallurgie : l’essentiel de la nouvelle convention collective",
    );
    cy.get("body").should(
      "contain",
      "Le 1er janvier 2024, la nouvelle convention collective nationale de la métallurgie remplace les 76 conventions collectives territoriales et les conventions collectives nationales.",
    );
  });
  it("je vois une page information lié à la procédure de licenciement pour motif eco", () => {
    cy.visit(
      "/information/grand-licenciement-collectif-pour-motif-economique-dans-une-entreprise-de-50-salaries-et-plus-avec-cse-le-conge-de-reclassement",
    );
    cy.get("h1").should(
      "have.text",
      "Grand licenciement collectif (au moins 10 salariés) pour motif économique dans une entreprise de 50 salariés et plus avec CSE : le congé de reclassement (CR)",
    );
    cy.get("body").should("contain", "Négociation avec les syndicats");
  });

  it("je vois une page information lié à la procédure de licenciement pour motif disciplinaire", () => {
    cy.visit("/information/licenciement-pour-motif-disciplinaire");
    cy.get("h1").should("have.text", "Licenciement pour motif disciplinaire");
    cy.get("body").should(
      "contain",
      "Un licenciement suite à une faute qui est reprochée au salarié",
    );
  });
});
