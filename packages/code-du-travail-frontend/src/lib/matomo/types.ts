export enum MatomoBaseEvent {
  TRACK_EVENT = "trackEvent",
  OUTIL = "outil",
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
  RETIREMENT = "view_step_Préavis de départ ou de mise à la retraite",
  HOUR = "view_step_Heure recherche emploi",
  RESIGNATION = "view_step_Préavis de démission",
  DISMISSAL = "view_step_Préavis de licenciement",
}

export enum MatomoTrackUrl {
  PREAVIS_RETRAITE = "/outils/preavis-retraite",
  PREAVIS_DEMISSION = "/outils/preavis-demission",
  PREAVIS_LICENCIEMENT = "/outils/preavis-licenciement",
  INDEMNITE_PRECARITE = "/outils/indemnite-precarite",
  HEURE_RECHERCHE_EMPLOI = "/outils/heures-recherche-emploi",
}

type Mapping = Array<{
  helpEvent: MatomoSimulatorEvent;
  synonyms: Array<string>;
  selectEvent?: MatomoSimulatorEvent;
}>;

export const MatomoMapping: Mapping = [
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_ANCIENNETE,
    synonyms: ["Ancienneté", "ancienneté"],
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_CAT_PRO,
    selectEvent: MatomoSimulatorEvent.SELECT_CAT_PRO,
    synonyms: ["Catégorie professionnelle"],
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_ECHELON,
    selectEvent: MatomoSimulatorEvent.SELECT_ECHELON,
    synonyms: ["Échelon", "échelon"],
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_GROUPE,
    selectEvent: MatomoSimulatorEvent.SELECT_GROUPE,
    synonyms: ["groupe", "Groupe"],
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_NIVEAU,
    selectEvent: MatomoSimulatorEvent.SELECT_NIVEAU,
    synonyms: ["niveau"],
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_CLASSE,
    selectEvent: MatomoSimulatorEvent.SELECT_CLASSE,
    synonyms: ["classe"],
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_POSITION,
    selectEvent: MatomoSimulatorEvent.SELECT_POSITION,
    synonyms: ["position"],
  },
  {
    helpEvent: MatomoSimulatorEvent.CLICK_HELP_COEFFICIENT,
    selectEvent: MatomoSimulatorEvent.SELECT_COEFFICIENT,
    synonyms: ["coefficient"],
  },
];
