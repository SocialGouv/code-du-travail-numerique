/** @jest-environment node */

import { fetchContributionExploreThemes } from "../queries";
import { ContributionThemes } from "../parse-mapping-csv";

// Les contributions du mapping de production ne sont pas dans les fixtures :
// on injecte le mapping ici plutôt que de polluer la signature de
// `fetchContributionExploreThemes`.
const mockMapping: Record<string, ContributionThemes> = {};

jest.mock("../mapping", () => ({
  getContributionThemes: (genericSlug: string) => mockMapping[genericSlug],
}));

const demission = {
  slug: "demission",
  title: "Démission",
  // L'ancre est celle que pose `ListLayout` sur la page du thème racine.
  href: "/themes/depart-de-lentreprise#demission",
  // `demission` ne porte pas d'icône dans l'index : repli sur celle du thème
  // racine.
  iconName: "Depart",
  documentCount: 17,
  // Pas de description dans la fixture : la carte affichera le décompte.
  description: undefined,
};

describe("Sous-thèmes mis en avant sur une contribution", () => {
  beforeEach(() => {
    Object.keys(mockMapping).forEach((key) => delete mockMapping[key]);
  });

  it("ne renvoie rien pour une contribution absente du mapping", async () => {
    expect(await fetchContributionExploreThemes("ma-contribution")).toEqual([]);
  });

  it("résout titre, ancre, icône du thème racine et nombre de contenus", async () => {
    mockMapping["ma-contribution"] = {
      theme: "theme-qui-nexiste-pas",
      subThemes: ["demission"],
    };

    expect(await fetchContributionExploreThemes("ma-contribution")).toEqual([
      demission,
    ]);
  });

  it("écarte un sous-thème introuvable dans l'index", async () => {
    mockMapping["ma-contribution"] = {
      theme: "theme-qui-nexiste-pas",
      subThemes: ["autre-theme-qui-nexiste-pas", "demission"],
    };

    const themes = await fetchContributionExploreThemes("ma-contribution");

    expect(themes.map(({ slug }) => slug)).toEqual(["demission"]);
  });

  it("retombe sur le thème de rattachement quand un sous-thème manque", async () => {
    mockMapping["ma-contribution"] = {
      theme: "demission",
      subThemes: ["theme-qui-nexiste-pas"],
    };

    expect(await fetchContributionExploreThemes("ma-contribution")).toEqual([
      demission,
    ]);
  });

  it("écarte un thème racine : aucune page ne porterait son ancre", async () => {
    mockMapping["ma-contribution"] = {
      theme: "depart-de-lentreprise",
      subThemes: ["embauche-et-contrat-de-travail"],
    };

    expect(await fetchContributionExploreThemes("ma-contribution")).toEqual([]);
  });
});
