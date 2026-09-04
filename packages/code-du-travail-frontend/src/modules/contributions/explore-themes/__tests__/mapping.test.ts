import {
  CONTRIBUTION_SUB_THEMES,
  getContributionSubThemeSlugs,
} from "../mapping";

// Slug tel que le produit `slugify` : minuscules, chiffres et tirets simples.
const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const IDCC_PREFIX = /^\d+-/;

// Garde-fou sur un fichier tenu à la main par le métier : la boucle est vide
// tant que le mapping l'est, et se met à mordre dès la première entrée.
describe("CONTRIBUTION_SUB_THEMES", () => {
  const entries = Object.entries(CONTRIBUTION_SUB_THEMES);

  it("indexe les entrées sur le slug générique de la contribution", () => {
    entries.forEach(([contributionSlug]) => {
      expect(contributionSlug).toMatch(KEBAB_CASE);
      // La page CC `1486-mon-slug` doit retomber sur l'entrée `mon-slug` : une
      // clé préfixée de l'IDCC ne serait jamais trouvée.
      expect(contributionSlug).not.toMatch(IDCC_PREFIX);
    });
  });

  it("associe à chaque contribution exactement deux sous-thèmes distincts", () => {
    entries.forEach(([, subThemeSlugs]) => {
      expect(subThemeSlugs).toHaveLength(2);
      // Deux fois le même sous-thème afficherait deux cartes identiques.
      expect(new Set(subThemeSlugs).size).toBe(2);
      subThemeSlugs.forEach((slug) => {
        expect(slug).toMatch(KEBAB_CASE);
        expect(slug).not.toMatch(IDCC_PREFIX);
      });
    });
  });
});

describe("getContributionSubThemeSlugs", () => {
  it("ne renvoie rien pour une contribution absente du mapping", () => {
    expect(
      getContributionSubThemeSlugs("une-contribution-jamais-mappee")
    ).toBeUndefined();
  });

  it("ne remonte pas les propriétés héritées d'Object", () => {
    // Sans garde, `CONTRIBUTION_SUB_THEMES["toString"]` renverrait une fonction
    // là où l'appelant attend un couple de slugs.
    expect(getContributionSubThemeSlugs("toString")).toBeUndefined();
  });
});
