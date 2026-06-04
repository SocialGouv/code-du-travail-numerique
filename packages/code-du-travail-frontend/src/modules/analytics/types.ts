import { IndemniteDepartType } from "../outils/indemnite-depart/types";

export enum MatomoBaseEvent {
  OUTIL = "outil",
  WIDGET_SEARCH = "widget_search",
  PAGE_HOME = "page_home",
  PAGE_MODELS = "page_modeles_de_documents",
  SELECT_RESULT = "selectResult",
}

export enum MatomoSearchAgreementCategory {
  ENTERPRISE_SELECT = "enterprise_select",
  AGREEMENT_SELECT_P1 = "cc_select_p1",
  AGREEMENT_SELECT_P2 = "cc_select_p2",
  PARCOURS_1 = "click_p1",
  PARCOURS_2 = "click_p2",
  PARCOURS_3 = "click_p3",
  ENTERPRISE_SEARCH = "enterprise_search",
  AGREEMENT_SEARCH_TYPE_OF_USERS = "cc_search_type_of_users",
}

export enum MatomoSimulatorEvent {
  CLICK_PRINT = "click_print",
  STEP_RESULT_INELIGIBLE = "results_ineligible",
  CLICK_NO_COMPANY = "click_je_n_ai_pas_d_entreprise",
  SELECT_NO_COMPANY = "select_je_n_ai_pas_d_entreprise",
}

export enum MatomoAgreementEvent {
  CC_TREATED = "cc_select_traitée",
  CC_UNTREATED = "cc_select_non_traitée",
  CC_BLOCK_USER = "user_blocked_info_cc",
}

export enum MatomoRetirementEvent {
  MISE_RETRAITE = "mise",
  DEPART_RETRAITE = "depart",
  ANCIENNETE_PLUS_2_ANS = "anciennete_plus_2_ans",
  ANCIENNETE_MOINS_2_ANS = "anciennete_moins_2_ans",
}

export enum MatomoActionEvent {
  PREAVIS_RETRAITE = "view_step_Préavis de départ ou de mise à la retraite",
  HEURES_RECHERCHE_EMPLOI = "view_step_Heures d'absence pour rechercher un emploi",
  PREAVIS_DEMISSION = "view_step_Préavis de démission",
  PREAVIS_LICENCIEMENT = "view_step_Préavis de licenciement",
  INDEMNITE_LICENCIEMENT = `view_step_${IndemniteDepartType.LICENCIEMENT}`,
  RUPTURE_CONVENTIONNELLE = `view_step_${IndemniteDepartType.RUPTURE_CONVENTIONNELLE}`,
  VIEW_STEP = "view_step",
  CLICK_PREVIOUS = "click_previous",
  TYPE_CTRL_C = "type_CTRL_C",
}
