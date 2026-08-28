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

// Un event dont le `name` transporte un comptage ne doit JAMAIS envoyer la
// chaîne "0" nue : Matomo la traite comme vide (`empty("0")` vaut `true` en PHP)
// et jette le nom. L'event est bien compté, mais il atterrit sans nom — le seau
// « aucun résultat » devient invisible dans les rapports.
//
// Constaté en production (site 4, 15-28 août 2026) : sur 13 091 `show_accords`
// reçus, 3 078 seulement portaient un nom ; idem 2 426 des 15 841
// `show_agreements`. Sur les 500 noms d'events distincts du site, "1", "2",
// "16", "3248" existent — "0" pas une seule fois.
//
// On étiquette donc le zéro plutôt que de l'envoyer en chiffre nu. Les valeurs
// non nulles restent inchangées, pour ne pas rompre la continuité des rapports
// existants (noms "1" à "164" déjà en base).
export const ZERO_COUNT_EVENT_NAME = "aucun";

export const toCountEventName = (count: number): string =>
  count === 0 ? ZERO_COUNT_EVENT_NAME : String(count);
