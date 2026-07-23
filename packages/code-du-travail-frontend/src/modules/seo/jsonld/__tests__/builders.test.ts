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

  it("buildContentThemeJsonLd() tags le contenu par thème et sous-thème", () => {
    const jsonld = buildContentThemeJsonLd({
      name: "Le préavis de licenciement",
      url: "/fiche-ministere-travail/le-preavis",
      themes: [
        { label: "Rupture du contrat", slug: "/themes/rupture-du-contrat" },
        { label: "Licenciement", slug: "/themes/licenciement" },
      ],
    });
    expect(jsonld["@type"]).toBe("Article");
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
