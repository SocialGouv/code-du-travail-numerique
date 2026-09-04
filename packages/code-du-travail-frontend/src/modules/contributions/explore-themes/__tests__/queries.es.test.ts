/** @jest-environment node */

import { fetchContributionExploreThemes } from "../queries";

// Le mapping de production est livré vide : on l'injecte ici plutôt que de
// polluer la signature de `fetchContributionExploreThemes`.
const mockMapping: Record<string, readonly string[]> = {};

jest.mock("../mapping", () => ({
  getContributionSubThemeSlugs: (genericSlug: string) =>
    mockMapping[genericSlug],
}));

describe("Sous-thèmes mis en avant sur une contribution", () => {
  beforeEach(() => {
    Object.keys(mockMapping).forEach((key) => delete mockMapping[key]);
  });

  it("ne renvoie rien pour une contribution absente du mapping", async () => {
    expect(await fetchContributionExploreThemes("ma-contribution")).toEqual([]);
  });

  it("résout titre, ancre, icône du thème racine et nombre de contenus", async () => {
    mockMapping["ma-contribution"] = ["demission"];

    expect(await fetchContributionExploreThemes("ma-contribution")).toEqual([
      {
        slug: "demission",
        title: "Démission",
        // L'ancre est celle que pose `ListLayout` sur la page du thème racine.
        href: "/themes/depart-de-lentreprise#demission",
        // Seuls les thèmes racines portent une icône.
        iconName: "Depart",
        documentCount: 17,
      },
    ]);
  });

  it("écarte un sous-thème introuvable dans l'index", async () => {
    mockMapping["ma-contribution"] = ["theme-qui-nexiste-pas", "demission"];

    const themes = await fetchContributionExploreThemes("ma-contribution");

    expect(themes.map(({ slug }) => slug)).toEqual(["demission"]);
  });

  it("écarte un thème racine : aucune page ne porterait son ancre", async () => {
    mockMapping["ma-contribution"] = ["depart-de-lentreprise"];

    expect(await fetchContributionExploreThemes("ma-contribution")).toEqual([]);
  });
});
