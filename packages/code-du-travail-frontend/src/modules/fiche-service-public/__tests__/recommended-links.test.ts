import { fetchFicheSPRecommendedLinks } from "../recommended-links";
import { fetchExploreThemesBySlugs } from "../../contributions/explore-themes/queries";
import { elasticsearchClient } from "../../../api/utils";
import { RecommendedLink } from "../queries";
import { getRecommendedItemKey } from "../types";

jest.mock("../../contributions/explore-themes/queries", () => ({
  fetchExploreThemesBySlugs: jest.fn(),
}));

jest.mock("../../../api/utils", () => ({
  elasticDocumentsIndex: "cdtn",
  elasticsearchClient: { search: jest.fn() },
}));

const breadcrumbs = [
  {
    label: "Fin et rupture du contrat",
    position: 1,
    slug: "/themes/fin-et-rupture-du-contrat",
  },
  {
    label: "Préavis",
    position: 2,
    slug: "/themes/fin-et-rupture-du-contrat#preavis",
  },
];

const exploreTheme = (slug: string) => ({
  slug,
  title: slug,
  href: `/themes/parent#${slug}`,
  documentCount: 1,
});

const documentLink = (cdtnId: string, rank: number): RecommendedLink => ({
  type: "document",
  cdtnId,
  slug: `${cdtnId}-export`,
  source: "contributions",
  title: `${cdtnId} (export)`,
  confidence: "strong",
  score: 1,
  rank,
});

const themeLink = (l2: string, rank: number): RecommendedLink => ({
  type: "l2",
  l1: "parent",
  l2,
  title: l2,
  confidence: "strong",
  score: 1,
  rank,
});

// Seuls les documents passés ici sont « publiés » dans l'index.
const mockPublishedDocuments = (...cdtnIds: string[]) =>
  (elasticsearchClient.search as jest.Mock).mockResolvedValue({
    hits: {
      hits: cdtnIds.map((cdtnId) => ({
        _source: {
          cdtnId,
          source: "contributions",
          slug: cdtnId,
          title: cdtnId,
        },
      })),
    },
  });

describe("fetchFicheSPRecommendedLinks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchExploreThemesBySlugs as jest.Mock).mockImplementation(
      async (slugs: string[]) =>
        new Map(slugs.map((slug) => [slug, exploreTheme(slug)]))
    );
    mockPublishedDocuments("a", "b", "c", "d");
  });

  it("place le thème de la fiche en premier, puis les liens par rang", async () => {
    const items = await fetchFicheSPRecommendedLinks(breadcrumbs, [
      documentLink("b", 2),
      themeLink("conges", 3),
      documentLink("a", 1),
    ]);

    expect(items.map(getRecommendedItemKey)).toEqual([
      "/themes/parent#preavis",
      "/contribution/a",
      "/contribution/b",
      "/themes/parent#conges",
    ]);
  });

  it("limite l'affichage à 4 liens", async () => {
    const items = await fetchFicheSPRecommendedLinks(breadcrumbs, [
      documentLink("a", 1),
      documentLink("b", 2),
      documentLink("c", 3),
      documentLink("d", 4),
    ]);

    expect(items).toHaveLength(4);
    expect(items[0].type).toBe("theme");
  });

  it("écarte les documents introuvables ou dépubliés et remonte les suivants", async () => {
    mockPublishedDocuments("a", "c");

    const items = await fetchFicheSPRecommendedLinks(breadcrumbs, [
      documentLink("a", 1),
      documentLink("depublie", 2),
      documentLink("c", 3),
    ]);

    expect(items.map(getRecommendedItemKey)).toEqual([
      "/themes/parent#preavis",
      "/contribution/a",
      "/contribution/c",
    ]);
  });

  it("affiche le titre et le slug de l'index, pas ceux de l'export", async () => {
    const [, item] = await fetchFicheSPRecommendedLinks(breadcrumbs, [
      documentLink("a", 1),
    ]);

    expect(item).toEqual({
      type: "document",
      url: "/contribution/a",
      title: "a",
      desc: "Fiches pratiques",
    });
  });

  it("écarte les thèmes qui ne se résolvent pas", async () => {
    (fetchExploreThemesBySlugs as jest.Mock).mockResolvedValue(
      new Map([["conges", exploreTheme("conges")]])
    );

    const items = await fetchFicheSPRecommendedLinks(breadcrumbs, [
      themeLink("conges", 1),
      themeLink("inconnu", 2),
    ]);

    expect(items.map(getRecommendedItemKey)).toEqual(["/themes/parent#conges"]);
  });

  it("n'affiche pas deux fois le thème de la fiche", async () => {
    const items = await fetchFicheSPRecommendedLinks(breadcrumbs, [
      themeLink("preavis", 1),
      documentLink("a", 2),
    ]);

    expect(items.map(getRecommendedItemKey)).toEqual([
      "/themes/parent#preavis",
      "/contribution/a",
    ]);
  });

  it("affiche sur un document l'icône de son sous-thème de rattachement", async () => {
    (elasticsearchClient.search as jest.Mock).mockResolvedValue({
      hits: {
        hits: [
          {
            _source: {
              cdtnId: "a",
              source: "contributions",
              slug: "a",
              title: "a",
              breadcrumbs: [
                { label: "Congés", position: 1, slug: "/themes/parent#conges" },
              ],
            },
          },
        ],
      },
    });
    (fetchExploreThemesBySlugs as jest.Mock).mockImplementation(
      async (slugs: string[]) =>
        new Map(
          slugs.map((slug) => [
            slug,
            { ...exploreTheme(slug), iconName: `icon-${slug}` },
          ])
        )
    );

    const [, item] = await fetchFicheSPRecommendedLinks(breadcrumbs, [
      documentLink("a", 1),
    ]);

    // Le sous-thème du document part dans la même requête que les autres.
    expect(fetchExploreThemesBySlugs).toHaveBeenCalledTimes(1);
    expect(fetchExploreThemesBySlugs).toHaveBeenCalledWith([
      "preavis",
      "conges",
    ]);
    expect(item).toMatchObject({ type: "document", iconName: "icon-conges" });
  });
});
