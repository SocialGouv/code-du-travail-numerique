export enum MatomoBaseEvent {
  TRACK_EVENT = "trackEvent",
  OUTIL = "outil",
}

export enum MatomoSearchAgreementCategory {
  AGREEMENT_SEARCH_HELP = "cc_search_help",
  ENTERPRISE_SELECT = "enterprise_select",
  AGREEMENT_SELECT_P1 = "cc_select_p1",
  AGREEMENT_SELECT_P2 = "cc_select_p2",
  ENTERPRISE_SEARCH = "enterprise_search",
  AGREEMENT_SEARCH = "cc_search",
  AGREEMENT_SEARCH_TYPE_OF_USERS = "cc_search_type_of_users",
}

export enum MatomoSimulatorEvent {
  CLICK_CALCUL_DETAIL = "click_calcul_detail",
  CLICK_HELP_ANCIENNETE = "click_help_anciennete",
  CLICK_HELP_CAT_PRO = "click_help_button_categorie_pro",
  CLICK_HELP_ECHELON = "click_help_echelon",
  CLICK_HELP_GROUPE = "click_help_groupe",
  CLICK_HELP_NIVEAU = "click_help_niveau",
  CLICK_HELP_CLASSE = "click_help_classe",
  CLICK_HELP_POSITION = "click_help_position",
  CLICK_HELP_COEFFICIENT = "click_help_coefficient",
  SELECT_CAT_PRO = "select_value_categorie_pro",
  SELECT_ECHELON = "select_value_echelon",
  SELECT_GROUPE = "select_value_groupe",
  SELECT_NIVEAU = "select_value_niveau",
  SELECT_CLASSE = "select_value_classe",
  SELECT_POSITION = "select_value_position",
  SELECT_COEFFICIENT = "select_value_coefficient",
  CLICK_PRINT = "click_print",
}

export enum MatomoAgreementEvent {
  CC_TREATED = "cc_select_traitée",
  CC_UNTREATED = "cc_select_non_traitée",
}

export enum MatomoRetirementEvent {
  MISE_RETRAITE = "mise",
  DEPART_RETRAITE = "depart",
  ANCIENNETE_PLUS_2_ANS = "anciennete_plus_2_ans",
  ANCIENNETE_MOINS_2_ANS = "anciennete_moins_2_ans",
}

export enum MatomoActionEvent {
  PREAVIS_RETRAITE = "view_step_Préavis de départ ou de mise à la retraite",
  HEURE_RECHERCHE_EMPLOI = "view_step_Heure recherche emploi",
  PREAVIS_DEMISSION = "view_step_Préavis de démission",
  PREAVIS_LICENCIEMENT = "view_step_Préavis de licenciement",
  INDEMNITE_LICENCIEMENT = "view_step_Indemnité de licenciement",
}

type Mapping = Array<{
  helpEvent: MatomoSimulatorEvent;
  questionLabels: Array<string>;
  selectEvent?: MatomoSimulatorEvent;
}>;

export const MatomoMapping: Mapping = [
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_ANCIENNETE,
    questionLabels: ["ancienneté"],
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_CAT_PRO,
    questionLabels: ["catégorie professionnelle"],
    selectEvent: MatomoSimulatorEvent.SELECT_CAT_PRO,
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_ECHELON,
    questionLabels: ["échelon"],
    selectEvent: MatomoSimulatorEvent.SELECT_ECHELON,
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_GROUPE,
    questionLabels: ["groupe"],
    selectEvent: MatomoSimulatorEvent.SELECT_GROUPE,
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_NIVEAU,
    questionLabels: ["niveau"],
    selectEvent: MatomoSimulatorEvent.SELECT_NIVEAU,
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_CLASSE,
    questionLabels: ["classe"],
    selectEvent: MatomoSimulatorEvent.SELECT_CLASSE,
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_POSITION,
    questionLabels: ["position"],
    selectEvent: MatomoSimulatorEvent.SELECT_POSITION,
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_COEFFICIENT,
    questionLabels: ["coefficient"],
    selectEvent: MatomoSimulatorEvent.SELECT_COEFFICIENT,
  },
];
