export enum MatomoCommonEvent {
  TRACK_EVENT = "trackEvent",
  OUTIL = "outil",
}

export enum MatomoPreavisRetraiteEvent {
  ACTION = "view_step_Préavis de départ ou de mise à la retraite",
  MISE_RETRAITE = "mise",
  DEPART_RETRAITE = "depart",
  ANCIENNETE_PLUS_2_ANS = "anciennete_plus_2_ans",
  ANCIENNETE_MOINS_2_ANS = "anciennete_moins_2_ans",
  CLICK_CALCUL_DETAIL = "click_calcul_detail",
  CLICK_HELP_ANCIENNETE = "click_help_anciennete",
  CLICK_HELP_BUTTON_CAT_PRO = "click_help_button_categorie_pro",
  CLICK_HELP_ECHELON = "click_help_echelon",
  CLICK_HELP_GROUPE = "click_help_groupe",
  SELECT_CAT_PRO = "select_value_categorie_pro",
  SELECT_ECHELON = "select_value_echelon",
  SELECT_GROUPE = "select_value_groupe",
}

export enum MatomoPreavisRetraiteTrackTitle {
  CAT_PRO = "Catégorie professionnelle",
  ANCIENNETE = "Ancienneté",
  ECHELON = "Échelon",
  GROUPE = "Groupe",
}

export enum MatomoTrackUrl {
  PREAVIS_RETRAITE = "/outils/preavis-retraite",
}
