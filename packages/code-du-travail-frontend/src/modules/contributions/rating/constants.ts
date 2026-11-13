// Source de vérité partagée pour le widget de notation de la clarté d'une
// contribution (#7333). Ce fichier ne doit PAS dépendre de React ni du DOM :
// il est importé à la fois côté client (composants, étoiles) et côté serveur
// (le contrôleur borne la note via RATING_MIN/RATING_MAX et émet l'event Matomo
// avec le couple RatingMatomo.CATEGORY/ACTION).

export const RATING_MIN = 1;
export const RATING_MAX = 5;

// Available scores, one star per score (#7587). None is preselected: the user
// explicitly picks a score before submitting.
export const RATING_VALUES: number[] = Array.from(
  { length: RATING_MAX - RATING_MIN + 1 },
  (_, index) => RATING_MIN + index
);

// Score -> text label. Shown under the hovered or selected star, and used in
// each star's accessible name (screen readers).
export const RATING_LABELS: Record<number, string> = {
  1: "Trop compliqué",
  2: "Compliqué",
  3: "Neutre",
  4: "Clair",
  5: "Très clair",
};

// Bloc de titre (cf. maquette Figma) : ligne d'accroche + question.
export const RATING_WIDGET_INTRO = "Donnez votre avis !";
export const RATING_WIDGET_TITLE = "Le contenu de cette page est-il clair ?";
export const RATING_WIDGET_HINT =
  "Sélectionnez de 1 à 5 étoiles pour noter la page.";
export const RATING_CONFIRMATION_TEXT = "Merci !";

// Accessible name of the star group (visually hidden fieldset legend).
export const RATING_GROUP_LABEL = "Notez la clarté du contenu de cette page";

// Accessible name of one star, e.g. "4 étoiles sur 5 : Clair".
export const ratingStarLabel = (value: number): string =>
  `${value} étoile${value > 1 ? "s" : ""} sur ${RATING_MAX} : ${RATING_LABELS[value]}`;

// Identité Matomo de l'event de notation, appartenant au serveur : le contrôleur
// l'utilise pour émettre l'event lors du relai serveur->serveur. En enum (et non
// en `const`) par cohérence avec les autres identifiants d'events du projet.
// La note est portée par l'ACTION en chaîne (« note_1 » … « note_5 ») et non par
// la valeur numérique `e_v` : Matomo additionne les `e_v` dans ses rapports,
// alors qu'on veut compter les occurrences de chaque note par contenu.
export enum RatingMatomo {
  CATEGORY = "notation_contribution",
  ACTION_PREFIX = "note_",
}

// Action Matomo d'une note : ensemble fermé « note_1 » … « note_5 » (la note est
// bornée RATING_MIN/RATING_MAX par le contrôleur avant l'appel — pas d'injection).
export const ratingActionForValue = (value: number): string =>
  `${RatingMatomo.ACTION_PREFIX}${value}`;
