import { fetchContributionExploreThemes } from "../queries";
import { fetchRootThemes, fetchThemesBySlugs } from "../../../themes/queries";

// Les fixtures Elasticsearch ne contiennent qu'un seul sous-thème : l'ordre —
// qui doit venir du mapping et jamais des hits — se vérifie ici, en rendant
// délibérément les hits désordonnés.
jest.mock("../../../themes/queries", () => ({
  fetchThemesBySlugs: jest.fn(),
  fetchRootThemes: jest.fn(),
}));

const mockMapping: Record<string, readonly string[]> = {};

jest.mock("../mapping", () => ({
  getContributionSubThemeSlugs: (genericSlug: string) =>
    mockMapping[genericSlug],
}));

const themeDoc = (slug: string, title: string) => ({
  slug,
  title,
  refs: [{ slug: "un-contenu" }],
  breadcrumbs: [
    { label: "Départ de l’entreprise", position: 8, slug: "/themes/depart" },
  ],
});

describe("fetchContributionExploreThemes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(mockMapping).forEach((key) => delete mockMapping[key]);
    (fetchRootThemes as jest.Mock).mockResolvedValue([
      { slug: "depart", icon: "Depart" },
    ]);
  });

  it("suit l'ordre du mapping, pas celui des hits Elasticsearch", async () => {
    mockMapping["ma-contribution"] = ["demission", "retraite"];
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      themeDoc("retraite", "Retraite"),
      themeDoc("demission", "Démission"),
    ]);

    const themes = await fetchContributionExploreThemes("ma-contribution");

    expect(themes.map(({ slug }) => slug)).toEqual(["demission", "retraite"]);
  });

  it("écarte un sous-thème sans contenu : sa section n'existe pas", async () => {
    mockMapping["ma-contribution"] = ["demission", "retraite"];
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      { ...themeDoc("demission", "Démission"), refs: [] },
      themeDoc("retraite", "Retraite"),
    ]);

    const themes = await fetchContributionExploreThemes("ma-contribution");

    expect(themes.map(({ slug }) => slug)).toEqual(["retraite"]);
  });

  it("retombe sur parentSlug quand le fil d'Ariane n'est pas indexé", async () => {
    mockMapping["ma-contribution"] = ["demission"];
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      {
        ...themeDoc("demission", "Démission"),
        breadcrumbs: undefined,
        parentSlug: "depart",
      },
    ]);

    const [theme] = await fetchContributionExploreThemes("ma-contribution");

    expect(theme.href).toBe("/themes/depart#demission");
    expect(theme.iconName).toBe("Depart");
  });

  it("n'interroge pas Elasticsearch pour une contribution non mappée", async () => {
    expect(await fetchContributionExploreThemes("ma-contribution")).toEqual([]);
    expect(fetchThemesBySlugs).not.toHaveBeenCalled();
    expect(fetchRootThemes).not.toHaveBeenCalled();
  });
});
