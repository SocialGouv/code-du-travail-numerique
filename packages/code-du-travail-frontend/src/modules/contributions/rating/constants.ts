// Shared source of truth for the contribution clarity rating widget (#7333,
// #7587). This file must NOT depend on React or the DOM: it is imported both
// client side (components, stars) and server side (the controller validates the
// payload against these bounds and keys, and owns the Matomo category/action).

export const RATING_MIN = 1;
export const RATING_MAX = 3;

// Available scores, one star per score. None is preselected: clicking a star
// records the score immediately.
export const RATING_VALUES: number[] = Array.from(
  { length: RATING_MAX - RATING_MIN + 1 },
  (_, index) => RATING_MIN + index
);

// Score -> text label, always visible under its star and part of the star's
// accessible name (visible label contained in the name, RGAA 11.2).
export const RATING_LABELS: Record<number, string> = {
  1: "Pas clair",
  2: "En partie",
  3: "Très clair",
};

// Scores that open the "what was not clear?" panel instead of thanking
// directly.
export const isLowRating = (value: number): boolean => value < RATING_MAX;

// Heading block (Figma mock-up): intro line + question. The question is also
// the accessible name of the star group.
export const RATING_WIDGET_INTRO = "Aidez-nous à nous améliorer";
export const RATING_WIDGET_TITLE =
  "Le contenu de cette page est-il clair\u00a0?";
export const RATING_CONFIRMATION_TEXT =
  "Merci d'avoir pris le temps de nous aider.";

// Visually hidden start of a star's accessible name: followed by the visible
// label, it gives e.g. "1 étoile sur 3 : Pas clair".
export const ratingStarPrefix = (value: number): string =>
  `${value} étoile${value > 1 ? "s" : ""} sur ${RATING_MAX} : `;

// Closed set of reasons offered after a low score. The values are the Matomo
// action suffixes (`raison_<value>`) and the keys accepted by the API.
export enum RatingReason {
  DIFFICULT_TEXT = "texte_difficile",
  APPLIES_TO_SITUATION = "applicable_situation",
  HOW_TO_APPLY = "comment_appliquer",
  WRONG_INFORMATION = "informations_fausses",
}

export const RATING_REASON_LABELS: Record<RatingReason, string> = {
  [RatingReason.DIFFICULT_TEXT]: "Le texte est difficile à comprendre.",
  [RatingReason.APPLIES_TO_SITUATION]:
    "Je ne sais pas si cela s'applique à ma situation.",
  [RatingReason.HOW_TO_APPLY]:
    "Je ne sais pas comment appliquer cela à ma situation.",
  [RatingReason.WRONG_INFORMATION]: "Les informations me semblent fausses.",
};

export const RATING_REASONS: RatingReason[] = Object.values(RatingReason);

// Free text suggestion limit (same as the site-wide feedback form).
export const RATING_SUGGESTION_MAX_LENGTH = 500;

// Panel copy. Non-breaking spaces before "?" and "!" (French typography).
export const RATING_REASONS_TITLE = "Qu'est-ce qui n'était pas clair\u00a0?";
export const RATING_REASONS_HINT =
  "Choisissez une ou plusieurs réponses, ou faites une suggestion pour valider.";
export const RATING_REMARK_BUTTON = "Une remarque\u00a0?";
export const RATING_REMARK_TITLE =
  "Une suggestion pour améliorer cette page\u00a0?";
export const RATING_REMARK_HINT =
  "Donnez-nous votre avis\u00a0! Pour protéger votre vie privée, veillez à ne pas mentionner d'informations personnelles dans ce formulaire (500 caractères maximum).";
// Label of the suggestion textarea in the reasons panel (in the remark panel,
// the same text is split into the heading and the hint).
export const RATING_SUGGESTION_LABEL = `${RATING_REMARK_TITLE} ${RATING_REMARK_HINT}`;
export const RATING_SEND_BUTTON = "Envoyer";
export const RATING_REASONS_ERROR =
  "Veuillez sélectionner au moins une option ou faire une suggestion";
export const RATING_SUGGESTION_WITH_REASONS_ERROR =
  "Veuillez renseigner au minimum ce champ ou sélectionner une option";
export const RATING_SUGGESTION_ERROR = "Veuillez renseigner ce champ";

// Matomo identity of the widget events, owned by the server: the controller
// uses it to emit the events when relaying server -> server. Enums (not
// `const`) for consistency with the other event identifiers of the project and
// so that `cdtn-stats` resolves them statically.
// `clarte_contribution` replaces the historical 5-point `notation_contribution`
// category: the 3-point scale must never be mixed with the old history.
export enum RatingMatomoCategory {
  CLARITY = "clarte_contribution",
  SUGGESTION = "clarte_contribution_suggestion",
}

// The score travels in the ACTION as a string ("note_1" … "note_3") and not in
// the numeric `e_v`: Matomo sums `e_v` in its reports, whereas we want to count
// the occurrences of each score per content.
export enum RatingMatomoAction {
  NOTE_PREFIX = "note_",
  REASON_PREFIX = "raison_",
  REMARK = "remarque",
}

// Closed set "note_1" … "note_3" (the score is bounded RATING_MIN/RATING_MAX by
// the controller before the call: no injection).
export const ratingActionForValue = (value: number): string =>
  `${RatingMatomoAction.NOTE_PREFIX}${value}`;

// Closed set "raison_<RatingReason>" (validated against the enum by the
// controller).
export const ratingActionForReason = (reason: RatingReason): string =>
  `${RatingMatomoAction.REASON_PREFIX}${reason}`;
