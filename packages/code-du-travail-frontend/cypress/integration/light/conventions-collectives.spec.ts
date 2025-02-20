describe("Conventions collectives", () => {
  it("je vois la liste de toutes les cc", () => {
    cy.visit("/");
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Bienvenue sur le Code du travail numérique"
    );

    cy.get("#fr-header-main-navigation a")
      .contains("Votre convention collective")
      .click();

    cy.urlEqual("/convention-collective");

    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "Votre convention collective"
    );
    cy.get("body").should(
      "contain",
      "Les conventions collectives présentées sont les plus représentatives en termes de nombre de salariés"
    );
    cy.get("#content a").should("have.length", 49);

    cy.get("#content a").first().click();

    cy.urlEqual(
      "/convention-collective/2941-aide-accompagnement-soins-et-services-a-domicile-bad"
    );
    cy.get('[data-accordion-component="Accordion"]')
      .eq(0)
      .find('[data-accordion-component="AccordionItemButton"]')
      .should("have.length", 6);

    cy.get('[data-accordion-component="Accordion"]')
      .eq(0)
      .find('[data-accordion-component="AccordionItemButton"]')
      .first()
      .should("have.text", "Congés et repos");
    cy.get('[data-accordion-component="Accordion"]')
      .eq(0)
      .find('[data-accordion-component="AccordionItem"] a')
      .should("have.length", 40);
    cy.get('[data-accordion-component="Accordion"]')
      .eq(0)
      .find('[data-accordion-component="AccordionItem"] a')
      .first()
      .contains(
        "Quelles sont les conditions d’indemnisation pendant le congé de maternité"
      );

    cy.get('[data-accordion-component="Accordion"]')
      .eq(1)
      .find('[data-accordion-component="AccordionItemButton"]')
      .should("have.length", 1);
    cy.get('[data-accordion-component="Accordion"]')
      .eq(1)
      .find('[data-accordion-component="AccordionItemButton"]')
      .first()
      .should("have.text", "En savoir plus");

    cy.get('[data-accordion-component="Accordion"]')
      .eq(2)
      .find('[data-accordion-component="AccordionItemButton"]')
      .should("have.length", 3);
    cy.get('[data-accordion-component="Accordion"]')
      .eq(2)
      .find('[data-accordion-component="AccordionItemButton"]')
      .first()
      .should("have.text", "Salaires minima hiérarchiques");
    cy.get('[data-accordion-component="Accordion"]')
      .eq(2)
      .find('[data-accordion-component="AccordionItem"] a')
      .should("have.length", 46);

    cy.get('[data-accordion-component="Accordion"]')
      .eq(0)
      .find('[data-accordion-component="AccordionItemButton"]')
      .first()
      .click();
    cy.get('[data-accordion-component="AccordionItem"] a')
      .first()
      .contains(
        "Quelles sont les conditions d’indemnisation pendant le congé de maternité"
      )
      .click();
    cy.urlEqual(
      "/contribution/2941-quelles-sont-les-conditions-dindemnisation-pendant-le-conge-de-maternite"
    );
  });

  it("je suis redirigé vers la cc si je mets seulement l'idcc dans l'url", () => {
    cy.visit("/convention-collective/0029");
    cy.urlEqual(
      "/convention-collective/29-hospitalisation-privee-etablissements-prives-dhospitalisation-de-soins-d"
    );
  });

  it("je suis redirigé vers la cc si je mets l'idcc en 4 chiffres", () => {
    cy.visit("/convention-collective/0650");
    cy.urlEqual("/convention-collective/3248-metallurgie");
  });

  it("je suis redirigé vers la cc si je mets l'idcc en 3 chiffres", () => {
    cy.visit("/convention-collective/650");
    cy.urlEqual("/convention-collective/3248-metallurgie");
  });

  it("je suis redirigé vers la cc si je mets l'idcc en 4 chiffres et deux zeros", () => {
    cy.visit("/convention-collective/0054");
    cy.urlEqual("/convention-collective/3248-metallurgie");
  });

  it("je ne dois pas être redirigé s'il n'y a pas de redirection", () => {
    cy.request({
      method: "GET",
      url: "/convention-collective/007",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  describe("validation des balises noindex", () => {
    const NO_INDEX_TAG = '<meta name="robots" content="noindex, nofollow"/>';

    it("les cc non traités ont une balise noindex", () => {
      cy.request({
        method: "GET",
        url: "/convention-collective/5021-statut-de-la-fonction-publique-territoriale",
      }).then((response) => {
        expect(response.body).to.contains(NO_INDEX_TAG);
      });
    });
    it("les cc traités n'ont pas de balise noindex", () => {
      cy.request({
        method: "GET",
        url: "/convention-collective/3236-industrie-et-services-nautiques",
      }).then((response) => {
        expect(response.body).to.not.contains(NO_INDEX_TAG);
      });
    });
  });
});
