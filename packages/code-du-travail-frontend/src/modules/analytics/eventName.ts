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

// ---------------------------------------------------------------------------
// Noms d'events falsy : le piège commun
// ---------------------------------------------------------------------------
//
// Matomo JETTE le nom d'un event quand celui-ci est une chaîne falsy — la chaîne
// vide, mais aussi "0" (`empty("0")` vaut `true` en PHP). L'event est bien
// compté dans le total de son action, mais il atterrit sans nom : la ligne
// correspondante n'existe simplement pas dans le rapport « Noms d'événements ».
//
// Constaté en production (site 4, 15-28 août 2026) :
//
//   show_accords         13 091 events reçus,  3 078 avec un nom → 10 013 perdus
//   show_agreements      15 841 events reçus, 13 415 avec un nom →  2 426 perdus
//   display_exit_intent  78 171 events reçus, 76 805 avec un nom →  1 366 perdus
//   submit_search           407 events reçus,    110 avec un nom →    297 perdus
//
// Sur les 500 noms d'events distincts du site, "1", "2", "16", "3248" existent
// — "0" pas une seule fois.
//
// Les deux helpers ci-dessous produisent donc un nom toujours non vide. Ils
// n'altèrent que le cas falsy : les autres valeurs restent inchangées, pour ne
// pas rompre la continuité des rapports existants.

// Comptage : "0" devient "aucun", le reste reste un chiffre.
export const ZERO_COUNT_EVENT_NAME = "aucun";

export const toCountEventName = (count: number): string =>
  count === 0 ? ZERO_COUNT_EVENT_NAME : String(count);

// Chemin de page : la racine "/" donne une chaîne vide une fois le slash retiré
// (c'est la page d'accueil), et perdrait donc son nom.
export const HOME_EVENT_NAME = "accueil";

export const toPageEventName = (path: string): string =>
  toEventName(path) || HOME_EVENT_NAME;
