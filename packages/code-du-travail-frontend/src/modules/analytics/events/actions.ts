// Action Matomo = CE QUE L'USAGER A FAIT. Anglais, snake_case, sans accent ni
// espace (les accents et les espaces se retrouvaient encodés dans les URLs de
// tracking et dans les exports CSV de l'ancien schéma).
//
// Union FERMÉE : `track("nimporte_quoi")` ne compile pas. Ajouter un event passe
// obligatoirement par ce fichier, donc par une relecture — c'est ce qui empêche
// le catalogue de rediverger.
//
// Règle de nommage : `<verbe>` ou `<verbe>_<variante>`. La variante ne monte
// dans l'action que dans deux cas :
//   1. elle change la NATURE de l'interaction (`submit_feedback_positive` vs
//      `_negative`, `select_agreement_p1` vs `_p2`) ;
//   2. c'est une NOTE dont le métier veut la distribution et non la somme
//      (`rate_content_3`, `submit_nps_7`) — Matomo additionne `value`, alors que
//      la lecture attendue est « combien de 1, combien de 2… ».
// Tout le reste — cible, identifiant, libellé, requête, étape, titre de
// simulateur — va dans le payload.

// Notes de clarté d'un contenu (widget de notation, 1 à 5).
export const RATE_CONTENT_ACTIONS = [
  "rate_content_1",
  "rate_content_2",
  "rate_content_3",
  "rate_content_4",
  "rate_content_5",
] as const;

// Score NPS (0 à 10).
export const SUBMIT_NPS_ACTIONS = [
  "submit_nps_0",
  "submit_nps_1",
  "submit_nps_2",
  "submit_nps_3",
  "submit_nps_4",
  "submit_nps_5",
  "submit_nps_6",
  "submit_nps_7",
  "submit_nps_8",
  "submit_nps_9",
  "submit_nps_10",
] as const;

export const EVENT_ACTIONS = [
  // ── Commun, toutes pages ────────────────────────────────────────────────
  "click_share", // { network }
  "click_theme_tag", // { theme }
  "click_related_content", // { target }
  "click_shortcut", // { target } — boutons « voir tout » de l'accueil
  "click_guided_question", // { target } — « De la question à l'action »
  "click_table_fullscreen",
  "copy_letter_template",

  // ── Avis de page & contact ──────────────────────────────────────────────
  "submit_feedback_positive",
  "submit_feedback_negative",
  "submit_feedback_reason", // { reason } — clé stable, plus la phrase française
  "submit_feedback_comment", // { comment }
  "click_contact_form",
  "select_contact_theme", // { theme }
  "click_phone_number",

  // ── Notation de contenu & NPS (relayés côté serveur) ────────────────────
  ...RATE_CONTENT_ACTIONS,
  ...SUBMIT_NPS_ACTIONS,
  "display_nps", // { trigger }
  "refuse_nps", // { trigger }
  "optout_nps", // { trigger }

  // ── Contributions ───────────────────────────────────────────────────────
  "view_answer",
  "click_show_agreement_content",
  "click_show_general_content",
  "click_show_content_without_agreement",
  "click_agreement_declination", // { target }

  // ── Recherche ───────────────────────────────────────────────────────────
  "search_instant", // { query, class, definition }
  "search_full", // { query, class }
  "click_all_results", // { query, class }
  "select_instant_result", // { algo, class, target }
  "select_result", // { algo, target }
  "select_suggestion", // { query, suggestion }
  "next_result_page", // { query }
  "widget_submit_search", // { query }
  "widget_click_logo",

  // ── Simulateurs ─────────────────────────────────────────────────────────
  "view_step", // { simulator, step }
  "click_previous_step", // { simulator, step }
  "print_result", // { simulator }
  "view_result_ineligible", // { simulator }
  "block_on_agreement", // { simulator }
  "select_retirement_origin", // { origin }
  "select_seniority", // { seniority }
  "submit_simulator_feedback_global", // { simulator, answer }
  "submit_simulator_feedback_easiness", // { simulator, answer } + value
  "submit_simulator_feedback_question_clarity", // { simulator, answer } + value
  "submit_simulator_feedback_result_clarity", // { simulator, answer } + value
  "submit_simulator_feedback_comment", // { simulator, comment }

  // ── Convention collective (simulateurs, contributions, page dédiée) ─────
  "select_agreement_path_p1", // { context } — je connais ma CC
  "select_agreement_path_p2", // { context } — je cherche mon entreprise
  "select_agreement_path_p3", // { context } — je ne la renseigne pas
  "select_agreement_p1", // { idcc }
  "select_agreement_p2", // { idcc }
  "select_agreement_supported", // { idcc } — CC prise en charge
  "select_agreement_unsupported", // { idcc }
  "search_enterprise", // { query, city }
  "select_enterprise", // { label, siren }
  "show_enterprise_agreements", // { count } + value
  "click_no_enterprise",
  "select_no_enterprise",
  "click_previous_step_agreement_p1", // { context }
  "click_previous_step_agreement_p2", // { context }
  "search_legifrance", // { agreement, query }
  "click_enterprise_accord", // { target }
  "click_all_enterprise_accords", // { siret }
  "show_enterprise_accords", // { count } + value
  "load_enterprise_accords_failed", // { siret }
] as const;

export type EventAction = (typeof EVENT_ACTIONS)[number];

export type RateContentAction = (typeof RATE_CONTENT_ACTIONS)[number];
export type SubmitNpsAction = (typeof SUBMIT_NPS_ACTIONS)[number];

/**
 * Action de notation pour une note 1..5. Lève si la note est hors bornes plutôt
 * que de fabriquer une action absente du catalogue : un event hors catalogue
 * ferait échouer le drift-check CI sans qu'on sache d'où il vient.
 */
export const rateContentAction = (value: number): RateContentAction => {
  const action = `rate_content_${value}`;
  if (!(RATE_CONTENT_ACTIONS as readonly string[]).includes(action)) {
    throw new RangeError(`Note de contenu hors bornes 1..5 : ${value}`);
  }
  return action as RateContentAction;
};

/** Action NPS pour un score 0..10. Même contrat que `rateContentAction`. */
export const submitNpsAction = (score: number): SubmitNpsAction => {
  const action = `submit_nps_${score}`;
  if (!(SUBMIT_NPS_ACTIONS as readonly string[]).includes(action)) {
    throw new RangeError(`Score NPS hors bornes 0..10 : ${score}`);
  }
  return action as SubmitNpsAction;
};
