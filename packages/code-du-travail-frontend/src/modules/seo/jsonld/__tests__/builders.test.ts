import {
  buildBreadcrumbListJsonLd,
  buildGovernmentOrganizationJsonLd,
  buildHowToJsonLd,
  buildLegislationJsonLd,
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

  it("buildHowToJsonLd()", () => {
    const jsonld = buildHowToJsonLd({
      name: "Simulateur",
      url: "/outils/xxx",
      steps: ["Étape 1", "Étape 2"],
    });
    expect(jsonld["@type"]).toBe("HowTo");
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
});
