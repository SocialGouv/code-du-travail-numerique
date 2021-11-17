export enum MatomoCommonEvent {
  TRACK_EVENT = "trackEvent",
  OUTIL = "outil",
}

export enum MatomoConventionCollectiveEvent {
  CC_TREATED = "cc_select_traitée",
  CC_UNTREATED = "cc_select_non_traitée",
}

export enum MatomoPreavisRetraiteEvent {
  MISE_RETRAITE = "mise",
  DEPART_RETRAITE = "depart",
  ANCIENNETE_PLUS_2_ANS = "anciennete_plus_2_ans",
  ANCIENNETE_MOINS_2_ANS = "anciennete_moins_2_ans",
  CLICK_CALCUL_DETAIL = "click_calcul_detail",
}

export enum MatomoTrackUrl {
  PREAVIS_RETRAITE = "/outils/preavis-retraite",
  PREAVIS_DEMISSION = "/outils/preavis-demission",
  PREAVIS_LICENCIEMENT = "/outils/preavis-licenciement",
  INDEMNITE_PRECARITE = "outils/indemnite-precarite",
  HEURE_RECHERCHE_EMPLOI = "/outils/heures-recherche-emploi",
}
