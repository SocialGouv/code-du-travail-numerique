import {
  buildBreadcrumbListJsonLd,
  buildContentThemeJsonLd,
  buildGovernmentOrganizationJsonLd,
  buildLegislationJsonLd,
  buildNewsArticleJsonLd,
  buildWebSiteWithSearchActionJsonLd,
  JSON_LD_ENTITY_IDS,
} from "../builders";

describe("jsonld builders", () => {
  it("buildGovernmentOrganizationJsonLd()", () => {
    const jsonld = buildGovernmentOrganizationJsonLd();
    expect(jsonld["@type"]).toBe("GovernmentOrganization");
    expect(jsonld["@id"]).toBe(JSON_LD_ENTITY_IDS.organization);
    expect(jsonld).toMatchSnapshot();
  });

  it("buildWebSiteWithSearchActionJsonLd()", () => {
    const jsonld = buildWebSiteWithSearchActionJsonLd();
    expect(jsonld["@type"]).toBe("WebSite");
    expect(jsonld["@id"]).toBe(JSON_LD_ENTITY_IDS.website);
    expect(jsonld).toMatchSnapshot();
  });

  it("buildBreadcrumbListJsonLd()", () => {
    const jsonld = buildBreadcrumbListJsonLd({
      items: [{ label: "Section", href: "/section" }],
      currentPageLabel: "Page",
      currentPageHref: "/section/page",
    });
    expect(jsonld["@type"]).toBe("BreadcrumbList");
    expect(jsonld).toMatchSnapshot();
  });

  it("buildLegislationJsonLd()", () => {
    const jsonld = buildLegislationJsonLd({
      name: "Article L123",
      url: "/code-du-travail/l123",
      identifier: "L123",
      datePublished: "2020-01-01",
      isBasedOn: "https://www.legifrance.gouv.fr",
    });
    expect(jsonld["@type"]).toBe("Legislation");
    expect(jsonld).toMatchSnapshot();
  });

  it("buildContentThemeJsonLd() construit un Article daté, rattaché au site et thématisé", () => {
    const jsonld = buildContentThemeJsonLd({
      name: "Le préavis de licenciement",
      url: "/fiche-ministere-travail/le-preavis",
      datePublished: "29/05/2024",
      themes: [
        { label: "Rupture du contrat", slug: "/themes/rupture-du-contrat" },
        { label: "Licenciement", slug: "/themes/licenciement" },
      ],
    });
    expect(jsonld["@type"]).toBe("Article");
    // Rattachement au graphe du site (éditeur / auteur / site).
    expect(jsonld.isPartOf).toEqual({ "@id": JSON_LD_ENTITY_IDS.website });
    expect(jsonld.author).toEqual({ "@id": JSON_LD_ENTITY_IDS.organization });
    expect(jsonld.publisher).toEqual({
      "@id": JSON_LD_ENTITY_IDS.organization,
    });
    // Date FR convertie en ISO 8601, minuit heure de Paris avec fuseau.
    expect(jsonld.datePublished).toBe("2024-05-29T00:00:00+02:00");
    expect(jsonld.dateModified).toBe("2024-05-29T00:00:00+02:00");
    // Thème / sous-thème (titres complets).
    expect(jsonld.articleSection).toBe("Rupture du contrat");
    expect(jsonld.keywords).toEqual(["Rupture du contrat", "Licenciement"]);
    expect(jsonld.about).toEqual([
      {
        "@type": "Thing",
        name: "Rupture du contrat",
        url: "http://api.url/themes/rupture-du-contrat",
      },
      {
        "@type": "Thing",
        name: "Licenciement",
        url: "http://api.url/themes/licenciement",
      },
    ]);
    expect(jsonld).toMatchSnapshot();
  });

  it("buildContentThemeJsonLd() omet la date quand le format est inattendu", () => {
    const jsonld = buildContentThemeJsonLd({
      name: "Sans date",
      url: "/information/sans-date",
      datePublished: "pas une date",
      themes: [{ label: "Congés", slug: "/themes/conges" }],
    });
    expect(jsonld.datePublished).toBeUndefined();
    expect(jsonld.dateModified).toBeUndefined();
  });

  it("buildNewsArticleJsonLd() convertit la date admin JJ/MM/AAAA en ISO 8601 (minuit Paris)", () => {
    const jsonld = buildNewsArticleJsonLd({
      headline: "Titre actualite",
      url: "/actualite/mon-article",
      datePublished: "18/09/2026",
      description: "Description de l'actualite",
    });
    expect(jsonld["@type"]).toBe("NewsArticle");
    expect(jsonld.datePublished).toBe("2026-09-18T00:00:00+02:00");
    expect(jsonld.dateModified).toBe("2026-09-18T00:00:00+02:00");
    expect(jsonld).toMatchSnapshot();
  });

  it.each`
    input           | expected
    ${"15/01/2026"} | ${"2026-01-15T00:00:00+01:00"}
    ${"1/9/26"}     | ${"2026-09-01T00:00:00+02:00"}
  `(
    "buildNewsArticleJsonLd() tolère la saisie admin $input",
    ({ input, expected }) => {
      const jsonld = buildNewsArticleJsonLd({
        headline: "Titre",
        url: "/actualite/slug",
        datePublished: input,
      });
      expect(jsonld.datePublished).toBe(expected);
      expect(jsonld.dateModified).toBe(expected);
    }
  );

  it.each([undefined, "", "pas une date"])(
    "buildNewsArticleJsonLd() omet les dates quand elles sont invalides (%p)",
    (input) => {
      const jsonld = buildNewsArticleJsonLd({
        headline: "Titre",
        url: "/actualite/slug",
        datePublished: input,
      });
      expect(jsonld["@type"]).toBe("NewsArticle");
      expect(jsonld).not.toHaveProperty("datePublished");
      expect(jsonld).not.toHaveProperty("dateModified");
      expect(jsonld.headline).toBe("Titre");
    }
  );
});
