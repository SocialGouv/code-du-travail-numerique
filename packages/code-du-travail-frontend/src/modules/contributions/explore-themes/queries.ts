import { slugify } from "@socialgouv/cdtn-utils";
import { nonNullable } from "@socialgouv/modeles-social";
import { fetchRootThemes, fetchThemesBySlugs } from "../../themes/queries";
import { getContributionSubThemeSlugs } from "./mapping";
import { ExploreTheme } from "./type";

// `breadcrumbs[0].slug` porte une URL (`/themes/depart-de-lentreprise`) là où
// `parentSlug` porte un slug nu : on ramène les deux au slug.
const toThemeSlug = (value: string): string =>
  value.replace(/^\/?themes\//, "");

/**
 * Les deux sous-thèmes mis en avant sur une contribution (#7455), résolus côté
 * serveur. Renvoie `[]` — et masque donc la rubrique — dès que la contribution
 * n'est pas dans le mapping éditorial.
 */
export const fetchContributionExploreThemes = async (
  genericSlug: string
): Promise<ExploreTheme[]> => {
  const slugs = getContributionSubThemeSlugs(genericSlug);
  // Contribution non mappée : aucun aller-retour Elasticsearch.
  if (!slugs) return [];

  // Deux requêtes parallèles : les sous-thèmes ne portent pas d'icône, elle
  // vient du thème racine — inutile de chaîner « résoudre le parent puis lire
  // son icône », les racines tiennent en une requête (≤ 100 documents).
  const [subThemes, rootThemes] = await Promise.all([
    fetchThemesBySlugs([...slugs], [
      "slug",
      "title",
      "refs",
      "breadcrumbs",
      "parentSlug",
    ]),
    fetchRootThemes(["slug", "icon"]),
  ]);

  const bySlug = new Map(subThemes.map((theme) => [theme.slug, theme]));
  const iconByRootSlug = new Map(
    rootThemes.map((theme) => [theme.slug, theme.icon])
  );

  // L'ordre ss1 → ss2 vient du mapping, jamais des hits Elasticsearch.
  return slugs
    .map((slug): ExploreTheme | undefined => {
      const theme = bySlug.get(slug);
      if (!theme) return undefined;

      // `groupByThemes` ne crée pas de section pour un thème sans contenu :
      // l'ancre n'existerait pas et la carte annoncerait « 0 fiches ».
      const documentCount = theme.refs?.length ?? 0;
      if (documentCount === 0) return undefined;

      // `parentSlug` n'est pas systématiquement indexé : le fil d'Ariane est la
      // source principale, `parentSlug` un simple repli.
      const rootSlug = theme.breadcrumbs?.[0]?.slug
        ? toThemeSlug(theme.breadcrumbs[0].slug)
        : theme.parentSlug
          ? toThemeSlug(theme.parentSlug)
          : undefined;
      // Sans thème racine (thème de premier niveau), aucune page ne porte
      // l'ancre du sous-thème : la carte n'aurait nulle part où pointer.
      if (!rootSlug) return undefined;

      return {
        slug: theme.slug,
        title: theme.title,
        // `slugify(titre)` : la même fonction que celle qui pose les `id` de
        // section dans `ListLayout`, seule à matcher le DOM de la page thème.
        href: `/themes/${rootSlug}#${slugify(theme.title)}`,
        iconName: iconByRootSlug.get(rootSlug),
        documentCount,
      };
    })
    .filter(nonNullable);
};
