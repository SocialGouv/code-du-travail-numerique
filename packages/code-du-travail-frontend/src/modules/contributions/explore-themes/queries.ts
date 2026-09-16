import { slugify } from "@socialgouv/cdtn-utils";
import { nonNullable } from "@socialgouv/modeles-social";
import { ThemeElasticDocument } from "@socialgouv/cdtn-types/build/elastic/theme";
import { fetchRootThemes, fetchThemesBySlugs } from "../../themes/queries";
import { getContributionThemes } from "./mapping";
import { ExploreTheme } from "./type";

// `breadcrumbs[0].slug` porte une URL (`/themes/depart-de-lentreprise`) là où
// `parentSlug` porte un slug nu : on ramène les deux au slug.
const toThemeSlug = (value: string): string =>
  value.replace(/^\/?themes\//, "");

const THEME_FIELDS = [
  "slug",
  "title",
  "refs",
  "breadcrumbs",
  "parentSlug",
  "icon",
  "description",
] as const;

type ThemeHit = Pick<ThemeElasticDocument, (typeof THEME_FIELDS)[number]>;

/**
 * Les sous-thèmes mis en avant sur une contribution (#7455), résolus côté
 * serveur. Les deux sous-thèmes complémentaires du mapping quand ils sont tous
 * deux disponibles ; sinon le sous-thème de rattachement de la contribution
 * suivi de celui des deux qui l'est. Renvoie `[]` — et masque donc la
 * rubrique — dès que la contribution n'est pas dans le mapping éditorial ou
 * que rien ne se résout.
 */
export const fetchContributionExploreThemes = async (
  genericSlug: string
): Promise<ExploreTheme[]> => {
  const mapped = getContributionThemes(genericSlug);
  // Contribution non mappée : aucun aller-retour Elasticsearch.
  if (!mapped) return [];

  // Deux requêtes parallèles : `icon` n'est pas garanti sur un sous-thème, le
  // thème racine sert de repli — inutile de chaîner « lire le sous-thème puis
  // son parent », les racines tiennent en une requête (≤ 100 documents).
  // Le thème de rattachement part dans la même requête que les sous-thèmes :
  // on ne sait qu'après coup s'il servira.
  const [themes, rootThemes] = await Promise.all([
    fetchThemesBySlugs([mapped.theme, ...mapped.subThemes], [...THEME_FIELDS]),
    fetchRootThemes(["slug", "icon"]),
  ]);

  const bySlug = new Map(themes.map((theme) => [theme.slug, theme]));
  const iconByRootSlug = new Map(
    rootThemes.map((theme) => [theme.slug, theme.icon])
  );
  const resolve = (slug: string): ExploreTheme | undefined => {
    const theme = bySlug.get(slug);
    return theme ? toExploreTheme(theme, iconByRootSlug) : undefined;
  };

  // L'ordre ss1 → ss2 vient du mapping, jamais des hits Elasticsearch.
  const subThemes = mapped.subThemes.map(resolve).filter(nonNullable);
  if (subThemes.length === 2) return subThemes;

  // Un sous-thème complémentaire manque (cellule vide ou introuvable dans
  // l'index) : le sous-thème de rattachement prend la première carte, celui
  // qui reste la seconde.
  return [resolve(mapped.theme), ...subThemes].filter(nonNullable);
};

const toExploreTheme = (
  theme: ThemeHit,
  iconByRootSlug: Map<string, string | undefined>
): ExploreTheme | undefined => {
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
    // La description éditoriale du sous-thème, telle que le back-office la
    // saisit. Une cellule vide ou faite d'espaces vaut absence : la carte
    // retombe alors sur le décompte de contenus.
    description: theme.description?.trim() || undefined,
  };
};
