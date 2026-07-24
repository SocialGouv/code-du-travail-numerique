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
    // Date FR convertie en ISO 8601.
    expect(jsonld.datePublished).toBe("2024-05-29");
    expect(jsonld.dateModified).toBe("2024-05-29");
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

  it("buildNewsArticleJsonLd()", () => {
    const jsonld = buildNewsArticleJsonLd({
      headline: "Titre actualite",
      url: "/actualite/mon-article",
      datePublished: "2024-01-01",
      description: "Description de l'actualite",
    });
    expect(jsonld["@type"]).toBe("NewsArticle");
    expect(jsonld).toMatchSnapshot();
  });
});
