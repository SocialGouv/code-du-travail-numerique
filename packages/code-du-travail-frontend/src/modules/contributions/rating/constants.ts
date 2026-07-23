// Source de vérité partagée pour le widget de notation de la clarté d'une
// contribution (#7333). Ce fichier ne doit PAS dépendre de React ni du DOM :
// il est importé à la fois côté client (composants, slider) et côté serveur
// (le contrôleur borne la note via RATING_MIN/RATING_MAX et émet l'event Matomo
// avec le couple RatingMatomo.CATEGORY/ACTION).

export const RATING_MIN = 1;
export const RATING_MAX = 5;
export const RATING_STEP = 1;
export const RATING_DEFAULT = 3; // « Neutre » — position médiane

// Valeur -> libellé textuel. Sert au libellé dynamique visible et à
// `aria-valuetext` (lecteurs d'écran).
// Libellés intermédiaires (2, 4) à confirmer depuis Figma.
export const RATING_LABELS: Record<number, string> = {
  1: "Trop compliqué",
  2: "Compliqué",
  3: "Neutre",
  4: "Clair",
  5: "Très clair",
};

export const RATING_MIN_LABEL = RATING_LABELS[RATING_MIN];
export const RATING_MAX_LABEL = RATING_LABELS[RATING_MAX];

// Bloc de titre (cf. maquette Figma) : ligne d'accroche + question.
export const RATING_WIDGET_INTRO = "Donnez votre avis !";
export const RATING_WIDGET_TITLE = "Est-ce que le contenu de cette page est :";
export const RATING_WIDGET_HINT =
  "Faites bouger le curseur pour noter la page.";
export const RATING_CONFIRMATION_TEXT = "Merci !";

// Nom accessible stable du curseur (ne change pas avec la valeur : la valeur
// courante est portée par `aria-valuetext`).
export const RATING_SLIDER_LABEL = "Notez la clarté du contenu de cette page";

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
