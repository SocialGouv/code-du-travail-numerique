// Catégorie Matomo = TYPE de la page sur laquelle l'event se produit, jamais la
// feature ni le type d'interaction (« ce que l'usager a fait » vit dans l'action).
//
// Cette énumération est volontairement FERMÉE et PETITE. Matomo tronque ses
// tables à l'archivage — `datatable_archiving_maximum_rows_events` vaut 500 par
// défaut et s'applique aux trois tables Catégories / Actions / Noms — et agrège
// le surplus dans une ligne `- Others -`, irréversiblement pour la période déjà
// archivée. Tant que `PageCategory` reste très en deçà de 500, aucune catégorie
// ne peut disparaître dans `- Others -`.
//
// Les valeurs reprennent les routes canoniques du site (`routeBySource` de
// @socialgouv/cdtn-utils) pour qu'une catégorie Matomo se lise comme une URL.
// La correspondance est verrouillée par `__tests__/categories.test.ts` : les
// membres d'enum doivent être des littéraux, on ne peut donc pas les dériver de
// `routeBySource` au niveau du type.

export enum PageCategory {
  HOME = "home",

  // Contenus éditoriaux, une valeur par route de contenu.
  CONTRIBUTION = "contribution",
  INFORMATION = "information",
  CONVENTION_COLLECTIVE = "convention-collective",
  MODELES_DE_COURRIERS = "modeles-de-courriers",
  THEMES = "themes",
  ACTUALITE = "actualite",
  INFOGRAPHIE = "infographie",
  FICHE_SERVICE_PUBLIC = "fiche-service-public",
  FICHE_MINISTERE_TRAVAIL = "fiche-ministere-travail",
  CODE_DU_TRAVAIL = "code-du-travail",
  DROIT_DU_TRAVAIL = "droit-du-travail",
  GLOSSAIRE = "glossaire",
  QUOI_DE_NEUF = "quoi-de-neuf",
  REGLES_ENTREPRISE = "regles-entreprise",

  // Le listing des simulateurs et une page de simulateur sont distingués : la
  // première mesure un choix de parcours, la seconde un tunnel. Les confondre
  // rendrait illisible le taux d'entrée dans les simulateurs.
  OUTILS = "outils",
  OUTIL = "outil",

  RECHERCHE = "recherche",
  CONTACT = "contact",

  // Zones qui ne sont pas des routes de contenu.
  WIDGET = "widget",
  INSTITUTIONNEL = "institutionnel",

  // Filet de sécurité : une route inconnue tombe ici plutôt que de produire une
  // catégorie vide, que Matomo rejetterait.
  AUTRE = "autre",
}

// Premier segment du pathname -> catégorie. `outils` est traité à part (listing
// vs page de simulateur) et n'apparaît donc pas ici.
const CATEGORY_BY_ROOT_SEGMENT: Readonly<Record<string, PageCategory>> = {
  contribution: PageCategory.CONTRIBUTION,
  information: PageCategory.INFORMATION,
  "convention-collective": PageCategory.CONVENTION_COLLECTIVE,
  "modeles-de-courriers": PageCategory.MODELES_DE_COURRIERS,
  themes: PageCategory.THEMES,
  actualite: PageCategory.ACTUALITE,
  infographie: PageCategory.INFOGRAPHIE,
  "fiche-service-public": PageCategory.FICHE_SERVICE_PUBLIC,
  "fiche-ministere-travail": PageCategory.FICHE_MINISTERE_TRAVAIL,
  "code-du-travail": PageCategory.CODE_DU_TRAVAIL,
  "droit-du-travail": PageCategory.DROIT_DU_TRAVAIL,
  glossaire: PageCategory.GLOSSAIRE,
  "quoi-de-neuf": PageCategory.QUOI_DE_NEUF,
  "quelles-regles-s-appliquent-dans-votre-entreprise":
    PageCategory.REGLES_ENTREPRISE,
  recherche: PageCategory.RECHERCHE,
  "besoin-plus-informations": PageCategory.CONTACT,
  widgets: PageCategory.WIDGET,
  "a-propos": PageCategory.INSTITUTIONNEL,
  accessibilite: PageCategory.INSTITUTIONNEL,
  "mentions-legales": PageCategory.INSTITUTIONNEL,
  "politique-confidentialite": PageCategory.INSTITUTIONNEL,
  "plan-du-site": PageCategory.INSTITUTIONNEL,
  stats: PageCategory.INSTITUTIONNEL,
};

// Segment racine des pages de simulateur. `/outils` seul est le listing.
const TOOLS_ROOT_SEGMENT = "outils";

/**
 * Déduit la catégorie Matomo du chemin de la page courante.
 *
 * Tolère `null`/`undefined` (`usePathname()` peut les renvoyer) et une éventuelle
 * query string ou ancre : la catégorie ne doit jamais dépendre de paramètres
 * d'URL, sous peine de se fragmenter.
 */
export const pageCategoryFromPathname = (
  pathname: string | null | undefined
): PageCategory => {
  const cleanPath = (pathname ?? "").split(/[?#]/)[0];
  const segments = cleanPath.split("/").filter(Boolean);

  if (segments.length === 0) return PageCategory.HOME;

  const [rootSegment, childSegment] = segments;

  if (rootSegment === TOOLS_ROOT_SEGMENT) {
    return childSegment ? PageCategory.OUTIL : PageCategory.OUTILS;
  }

  return CATEGORY_BY_ROOT_SEGMENT[rootSegment] ?? PageCategory.AUTRE;
};
