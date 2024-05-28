describe("Conventions collectives", () => {
  it("je vois la liste de toutes les cc", () => {
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

  it("je suis pas indexé si la convention collective n'est pas traitée", () => {
    cy.request({
      method: "GET",
      url: "/convention-collective/9972-convention-collective-departementale-des-exploitations-agricoles-guyane",
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.headers["x-robots-tag"]).to.equal(
        "noindex, nofollow, nosnippet"
      );
    });
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
