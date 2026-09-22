import { fetchContributionExploreThemes } from "../queries";
import { fetchRootThemes, fetchThemesBySlugs } from "../../../themes/queries";
import { ContributionThemes } from "../parse-mapping-csv";

// Les fixtures Elasticsearch ne contiennent qu'un seul sous-thème : l'ordre —
// qui doit venir du mapping et jamais des hits — se vérifie ici, en rendant
// délibérément les hits désordonnés.
jest.mock("../../../themes/queries", () => ({
  fetchThemesBySlugs: jest.fn(),
  fetchRootThemes: jest.fn(),
}));

const mockMapping: Record<string, ContributionThemes> = {};

jest.mock("../mapping", () => ({
  getContributionThemes: (genericSlug: string) => mockMapping[genericSlug],
}));

const themeDoc = (slug: string, title: string) => ({
  slug,
  title,
  refs: [{ slug: "un-contenu" }],
  breadcrumbs: [
    { label: "Départ de l’entreprise", position: 8, slug: "/themes/depart" },
  ],
});

const mapped = (theme: string, ...subThemes: string[]): ContributionThemes => ({
  theme,
  subThemes,
});

describe("fetchContributionExploreThemes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(mockMapping).forEach((key) => delete mockMapping[key]);
    (fetchRootThemes as jest.Mock).mockResolvedValue([
      { slug: "depart", icon: "Depart" },
    ]);
  });

  it("affiche les deux sous-thèmes quand ils sont disponibles, sans le thème", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "demission", "retraite");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      themeDoc("retraite", "Retraite"),
      themeDoc("preavis", "Préavis"),
      themeDoc("demission", "Démission"),
    ]);

    const themes = await fetchContributionExploreThemes("ma-contribution");

    expect(themes.map(({ slug }) => slug)).toEqual(["demission", "retraite"]);
  });

  it("demande le thème et les sous-thèmes en une seule requête", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "demission", "retraite");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([]);

    await fetchContributionExploreThemes("ma-contribution");

    expect(fetchThemesBySlugs).toHaveBeenCalledTimes(1);
    expect((fetchThemesBySlugs as jest.Mock).mock.calls[0][0]).toEqual([
      "preavis",
      "demission",
      "retraite",
    ]);
  });

  it("suit l'ordre du mapping, pas celui des hits Elasticsearch", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "demission", "retraite");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      themeDoc("retraite", "Retraite"),
      themeDoc("demission", "Démission"),
    ]);

    const themes = await fetchContributionExploreThemes("ma-contribution");

    expect(themes.map(({ slug }) => slug)).toEqual(["demission", "retraite"]);
  });

  it("met le thème en première carte quand un seul sous-thème est mappé", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "retraite");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      themeDoc("retraite", "Retraite"),
      themeDoc("preavis", "Préavis"),
    ]);

    const themes = await fetchContributionExploreThemes("ma-contribution");

    expect(themes.map(({ slug }) => slug)).toEqual(["preavis", "retraite"]);
  });

  it("met le thème en première carte quand un sous-thème est sans contenu", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "demission", "retraite");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      // `groupByThemes` ne crée pas de section pour lui : l'ancre n'existerait
      // pas.
      { ...themeDoc("demission", "Démission"), refs: [] },
      themeDoc("retraite", "Retraite"),
      themeDoc("preavis", "Préavis"),
    ]);

    const themes = await fetchContributionExploreThemes("ma-contribution");

    expect(themes.map(({ slug }) => slug)).toEqual(["preavis", "retraite"]);
  });

  it("met le thème en première carte quand un sous-thème est introuvable", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "demission", "retraite");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      themeDoc("retraite", "Retraite"),
      themeDoc("preavis", "Préavis"),
    ]);

    const themes = await fetchContributionExploreThemes("ma-contribution");

    expect(themes.map(({ slug }) => slug)).toEqual(["preavis", "retraite"]);
  });

  it("garde le sous-thème seul quand le thème de repli est lui-même indisponible", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "retraite");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      themeDoc("retraite", "Retraite"),
    ]);

    const themes = await fetchContributionExploreThemes("ma-contribution");

    expect(themes.map(({ slug }) => slug)).toEqual(["retraite"]);
  });

  it("garde le thème seul quand aucun sous-thème n'est disponible", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "demission", "retraite");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      themeDoc("preavis", "Préavis"),
    ]);

    const themes = await fetchContributionExploreThemes("ma-contribution");

    expect(themes.map(({ slug }) => slug)).toEqual(["preavis"]);
  });

  it("masque la rubrique quand rien ne se résout", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "demission", "retraite");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([]);

    expect(await fetchContributionExploreThemes("ma-contribution")).toEqual([]);
  });

  it("porte la description éditoriale du sous-thème", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "demission");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      {
        ...themeDoc("demission", "Démission"),
        description: " Lettre de démission, préavis, rétractation. ",
      },
    ]);

    const [theme] = await fetchContributionExploreThemes("ma-contribution");

    expect(theme.description).toBe(
      "Lettre de démission, préavis, rétractation."
    );
  });

  it("laisse la description vide quand l'index n'en porte pas : la carte retombe sur le décompte", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "demission");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      { ...themeDoc("demission", "Démission"), description: "   " },
    ]);

    const [theme] = await fetchContributionExploreThemes("ma-contribution");

    expect(theme.description).toBeUndefined();
    expect(theme.documentCount).toBe(1);
  });

  it("retombe sur parentSlug quand le fil d'Ariane n'est pas indexé", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "demission");
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

  it("ancre la carte sur le parent DIRECT, pas sur la racine", async () => {
    // Un niveau 3 : la page de la racine ne liste que ses enfants immédiats,
    // l'ancre du niveau 3 n'y existe pas — le lien y serait mort.
    mockMapping["ma-contribution"] = mapped(
      "preavis",
      "licenciement-economique"
    );
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      {
        ...themeDoc("licenciement-economique", "Licenciement économique"),
        breadcrumbs: [
          {
            label: "Départ de l’entreprise",
            position: 8,
            slug: "/themes/depart",
          },
          { label: "Licenciement", position: 2, slug: "/themes/licenciement" },
        ],
      },
    ]);

    const [theme] = await fetchContributionExploreThemes("ma-contribution");

    expect(theme.href).toBe("/themes/licenciement#licenciement-economique");
    // L'icône, elle, reste celle de la racine : un niveau intermédiaire n'en
    // porte pas davantage qu'une feuille.
    expect(theme.iconName).toBe("Depart");
  });

  it("préfère l'icône du sous-thème à celle du thème racine", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "demission");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      { ...themeDoc("demission", "Démission"), icon: "Resignation" },
    ]);

    const [theme] = await fetchContributionExploreThemes("ma-contribution");

    expect(theme.iconName).toBe("Resignation");
  });

  it("retombe sur l'icône du thème racine quand le sous-thème n'en porte pas", async () => {
    mockMapping["ma-contribution"] = mapped("preavis", "demission");
    (fetchThemesBySlugs as jest.Mock).mockResolvedValue([
      themeDoc("demission", "Démission"),
    ]);

    const [theme] = await fetchContributionExploreThemes("ma-contribution");

    expect(theme.iconName).toBe("Depart");
  });

  it("n'interroge pas Elasticsearch pour une contribution non mappée", async () => {
    expect(await fetchContributionExploreThemes("ma-contribution")).toEqual([]);
    expect(fetchThemesBySlugs).not.toHaveBeenCalled();
    expect(fetchRootThemes).not.toHaveBeenCalled();
  });
});
