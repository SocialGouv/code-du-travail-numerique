describe("Pages infographies", () => {
  it("je vois la liste de toutes les infographies par thèmes", () => {
    // TODO : Remettre le test en place après la heatmap
    cy.visit("/infographie");
    /*
    cy.visit("/");
    cy.findByRole("heading", { level: 1 })
      .should("have.text", "Bienvenue sur le Code du travail numérique")
      .click();
    cy.get("#fr-header-main-navigation").contains("Code du travail").click();
    cy.get("#fr-header-main-navigation").contains("Nos infographies").click();
    cy.isIndexable();
     */
    cy.urlEqual("/infographie");
    cy.canonicalUrlEqual("/infographie");
    cy.titleAndMetaDescriptionEqual(
      "Infographies - Code du travail numérique",
      "Découvrez toutes nos infographies : des visuels clairs pour comprendre vos droits, obligations et démarches en un coup d'oeil."
    );
    cy.get("h1").should("have.text", "Infographies");
    cy.get("body").should(
      "contain",
      "Découvrez toutes nos infographies : des visuels clairs pour comprendre vos droits, obligations et démarches en un coup d'oeil."
    );
    cy.findAllByRole("heading", { level: 2 }).should("have.length", 8);
    cy.findAllByRole("heading", { level: 2 }).eq(0).should("contain", "Résumé");
    cy.findAllByRole("heading", { level: 2 })
      .eq(1)
      .should("contain", "Contenus populaires");
    cy.findAllByRole("heading", { level: 2 })
      .eq(2)
      .should("contain", "Embauche et contrat de travail");
    cy.findAllByRole("heading", { level: 3 }).should("have.length.at.least", 1);
    cy.findAllByRole("heading", { level: 3 }).first().click();
    cy.urlEqual("/infographie/licenciement-pour-inaptitude-medicale");
  });

  it("je vois une page infographie classique", () => {
    cy.visit("/infographie/que-se-passe-t-il-en-cas-dabandon-de-poste");
    cy.isIndexable();
    cy.canonicalUrlEqual(
      "/infographie/que-se-passe-t-il-en-cas-dabandon-de-poste"
    );

    cy.titleAndMetaDescriptionEqual(
      "Que se passe-t-il en cas d'abandon de poste ? - Code du travail numérique",
      "Cette infographie détaille la marche à suivre pour l’employeur en cas d’abandon de poste d’un salarié. Elle précise les effets possibles sur le contrat de travail selon que le salarié justifie son absence, reprenne son poste dans le délai imparti ou ne le fasse pas."
    );
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Que se passe-t-il en cas d'abandon de poste ?"
    );
    cy.get("body").should(
      "contain",
      "Cette infographie détaille la marche à suivre pour l’employeur en cas d’abandon de poste d’un salarié."
    );
  });
});
