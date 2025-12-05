describe("Conventions collectives", () => {
  describe("Page principale", () => {
    it("je vois la liste de toutes les cc", () => {
      cy.visit("/");
      cy.findByRole("heading", { level: 1 }).should(
        "have.text",
        "Bienvenue sur le Code du travail numérique"
      );

      cy.get("#fr-header-main-navigation a")
        .contains("Conventions collectives")
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
    });
  });

  describe("Page d'une convention collective", () => {
    it('je vois les "contributions" et les "articles"', () => {
      cy.visit(
        "/convention-collective/2941-aide-accompagnement-soins-et-services-a-domicile-bad"
      );

      cy.get("#frequent-questions").should("exist");
      cy.get("#frequent-questions h2").should(
        "have.text",
        "Questions-réponses fréquentes"
      );

      cy.get("#frequent-questions .fr-accordion__btn").should("have.length", 6);

      cy.get("#frequent-questions .fr-accordion__btn")
        .first()
        .should("contain", "Congés et repos");

      cy.get("#frequent-questions .fr-accordion__btn").first().click();

      cy.get("#frequent-questions-list-0").should("exist");

      cy.get("#frequent-questions-list-0 li").should("have.length", 6);

      cy.get("#agreement-articles").should("exist");

      cy.get("#agreement-articles h2").should(
        "have.text",
        "Articles de la convention collective"
      );

      cy.get("#agreement-articles .fr-accordion__title").should(
        "have.length",
        3
      );

      cy.get("#agreement-articles .fr-accordion__title")
        .first()
        .should("have.text", "Salaires minima hiérarchiques");

      cy.get("#agreement-articles a").should("have.length", 49);

      cy.get("#frequent-questions-list-0 a").first().click();

      cy.urlEqual(
        "/contribution/2941-quelles-sont-les-conditions-dindemnisation-pendant-le-conge-de-maternite"
      );
    });
  });

  describe("Redirections", () => {
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
  });

  describe("Validation des balises noindex", () => {
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

  describe("Recherche legifrance", () => {
    it("je peux faire une recherche par mots clés", () => {
      cy.visit("/convention-collective/2941");

      cy.window().then((win) => {
        cy.stub(win, "open").as("windowOpen");
      });

      cy.findByRole("heading", { level: 1 }).should(
        "have.text",
        "Aide, accompagnement, soins et services à domicile (BAD)"
      );

      cy.get('form[role="search"]').should("exist");

      cy.get('form[role="search"]').invoke("removeAttr", "target");

      cy.get("#search-agreement").should("be.visible");

      cy.get("#search-agreement").type("congés");

      cy.get("#search-agreement").type("{enter}");

      cy.get("@windowOpen").should("be.called");
      cy.get("@windowOpen")
        .should("have.been.calledOnce")
        .its("firstCall.args")
        .should("satisfy", ([url, target, features]) => {
          expect(target).to.eq("_blank");
          expect(features).to.eq("noopener,noreferrer");

          const expectedParams = new URLSearchParams({
            rawQuery: "congés",
            idcc: "2941",
            tab_selection: "kali",
            searchField: "ALL",
            query: "congés",
            searchType: "ALL",
            typePagination: "DEFAUT",
            sortValue: "PERTINENCE",
            pageSize: "10",
            page: "1",
          });

          const expectedUrl = `https://www.legifrance.gouv.fr/search/kali?${expectedParams.toString()}`;

          expect(url).to.eq(expectedUrl);
          return true;
        });
    });
  });
});
