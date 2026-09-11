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

  // Deux requêtes parallèles : `icon` n'est pas garanti sur un sous-thème, le
  // thème racine sert de repli — inutile de chaîner « lire le sous-thème puis
  // son parent », les racines tiennent en une requête (≤ 100 documents).
  const [subThemes, rootThemes] = await Promise.all([
    fetchThemesBySlugs(
      [...slugs],
      ["slug", "title", "refs", "breadcrumbs", "parentSlug", "icon"]
    ),
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

      // Le fil d'Ariane est trié racine → parent le plus proche, et ne contient
      // que les ancêtres. Deux maillons différents servent ici : le DERNIER
      // porte la section vers laquelle pointer, le PREMIER porte l'icône.
      const breadcrumbSlugs = (theme.breadcrumbs ?? []).map(({ slug: value }) =>
        toThemeSlug(value)
      );
      // `parentSlug` n'est pas systématiquement indexé : le fil d'Ariane est la
      // source principale, `parentSlug` un simple repli.
      const fallbackSlug = theme.parentSlug
        ? toThemeSlug(theme.parentSlug)
        : undefined;
      // La page d'un thème ne liste que ses enfants IMMÉDIATS : la section du
      // sous-thème n'existe que sur la page de son parent direct, pas sur celle
      // de la racine dès qu'on descend d'un niveau de plus.
      const parentSlug =
        breadcrumbSlugs[breadcrumbSlugs.length - 1] ?? fallbackSlug;
      const rootSlug = breadcrumbSlugs[0] ?? fallbackSlug;
      // Sans parent (thème de premier niveau), aucune page ne porte l'ancre du
      // sous-thème : la carte n'aurait nulle part où pointer.
      if (!parentSlug || !rootSlug) return undefined;

      return {
        slug: theme.slug,
        title: theme.title,
        // `slugify(titre)` : `app/themes/[slug]/page.tsx` passe le titre du
        // sous-thème en `label` de fil d'Ariane, et `ListLayout` pose
        // `id = slugify(label)`. C'est donc bien le titre qui matche le DOM.
        href: `/themes/${parentSlug}#${slugify(theme.title)}`,
        // L'icône du sous-thème d'abord : elle est plus parlante que celle du
        // thème racine, qui reste le repli tant que le back-office n'en pose
        // pas sur les niveaux 2.
        iconName: theme.icon ?? iconByRootSlug.get(rootSlug),
        documentCount,
      };
    })
    .filter(nonNullable);
};
