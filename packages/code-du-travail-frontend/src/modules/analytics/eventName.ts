// Convention de nommage des events Matomo du site : le `name` d'un event qui
// désigne une page porte le chemin SANS le slash initial — `contribution/mon-slug`,
// `themes/mon-slug` — soit le type de page suivi du slug du contenu, et non
// l'URL complète. Les events qui construisent ce chemin eux-mêmes (à partir de
// `getRouteBySource` et d'un slug) le produisent déjà sous cette forme ; ceux
// qui partent d'un `pathname` ou d'un `href` Next passent par ici.
//
// Volontairement hors du barrel `../analytics` : celui-ci ré-exporte `types.ts`,
// qui tire `@socialgouv/modeles-social` et `zustand`. On importe donc ce module
// par son chemin (`../analytics/eventName`) pour ne pas embarquer ces
// dépendances dans les bundles qui n'ont besoin que de cette fonction.
export const toEventName = (path: string): string => path.replace(/^\/+/, "");
