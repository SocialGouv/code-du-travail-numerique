describe("Conventions collectives", () => {
  it.only("je vois la liste de toutes les cc", () => {
    cy.visit("/");
    cy.get("#navigation").contains("Votre convention collective").click();
    cy.url().should("include", "/convention-collective");

    cy.get("h1").should("have.text", "Votre convention collective");
    cy.get("body").should(
      "contain",
      "Retrouvez les questions/réponses fréquentes organisées par thème"
    );
    cy.get("#content li").should("have.length", 49);
    cy.get("#content li").first().click();
    cy.url().should(
      "include",
      "/convention-collective/2941-aide-accompagnement-soins-et-services-a-domicile-bad"
    );
    cy.get('[data-accordion-component="Accordion"]').eq(0).find('[data-accordion-component="AccordionItemButton"]').should("have.length", 6);
    cy.get('[data-accordion-component="Accordion"]').eq(0).find('[data-accordion-component="AccordionItemButton"]').first().should("have.text", "Congés et repos");
    cy.get('[data-accordion-component="Accordion"]').eq(0).find('[data-accordion-component="AccordionItem"] a').should("have.length", 40);
    cy.get('[data-accordion-component="Accordion"]').eq(0).find('[data-accordion-component="AccordionItem"] a').first().contains("Quelles sont les conditions d’indemnisation pendant le congé de maternité");

    cy.get('[data-accordion-component="Accordion"]').eq(1).find('[data-accordion-component="AccordionItemButton"]').should("have.length", 1);
    cy.get('[data-accordion-component="Accordion"]').eq(1).find('[data-accordion-component="AccordionItemButton"]').first().should("have.text", "En savoir plus");

    cy.get('[data-accordion-component="Accordion"]').eq(2).find('[data-accordion-component="AccordionItemButton"]').should("have.length", 3);
    cy.get('[data-accordion-component="Accordion"]').eq(2).find('[data-accordion-component="AccordionItemButton"]').first().should("have.text", "Salaires minima hiérarchiques");
    cy.get('[data-accordion-component="Accordion"]').eq(2).find('[data-accordion-component="AccordionItem"] a').should("have.length", 46);


    cy.get('[data-accordion-component="Accordion"]').eq(0).find('[data-accordion-component="AccordionItemButton"]').first().click();
    cy.get('[data-accordion-component="AccordionItem"] a').first().click();
    cy.url().should(
      "include",
      "/convention-collective/2941-aide-accompagnement-soins-et-services-a-domicile-bad"
    );
  });

  it("je suis redirigé vers la cc si je mets seulement l'idcc dans l'url", () => {
    cy.visit("/convention-collective/0029");
    cy.url().should(
      "include",
      "/convention-collective/29-hospitalisation-privee-etablissements-prives-dhospitalisation-de-soins-d"
    );
  });

  it("je suis redirigé vers la cc si je mets l'idcc en 4 chiffres", () => {
    cy.visit("/convention-collective/0650");
    cy.url().should("include", "/convention-collective/3248-metallurgie");
  });

  it("je suis redirigé vers la cc si je mets l'idcc en 3 chiffres", () => {
    cy.visit("/convention-collective/650");
    cy.url().should("include", "/convention-collective/3248-metallurgie");
  });

  it("je suis redirigé vers la cc si je mets l'idcc en 4 chiffres et deux zeros", () => {
    cy.visit("/convention-collective/0054");
    cy.url().should("include", "/convention-collective/3248-metallurgie");
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
});
