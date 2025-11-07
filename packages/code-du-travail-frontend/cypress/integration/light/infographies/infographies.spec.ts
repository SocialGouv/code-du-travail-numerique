describe("Pages infographies", () => {
  it("je vois une page infographie classique", () => {
    cy.visit("/infographie/abandon-de-poste-et-contrat-de-travail-infographie");
    cy.isIndexable();
    cy.canonicalUrlEqual(
      "/infographie/abandon-de-poste-et-contrat-de-travail-infographie"
    );

    cy.titleAndMetaDescriptionEqual(
      "Infographie que se passe-t-il en cas d'abandon de poste ? - Code du travail numérique",
      "Cette infographie explique la procédure applicable en cas d’abandon de poste. Elle précise les étapes à suivre par l’employeur, les conséquences de l’absence non justifiée du salarié, ainsi que les issues possibles selon que le salarié justifie son absence ou reprenne son poste dans le délai fixé."
    );
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Que se passe-t-il en cas d'abandon de poste ?"
    );
    cy.get("body").should(
      "contain",
      "Cette infographie explique la procédure applicable en cas d’abandon de poste."
    );
  });
});
