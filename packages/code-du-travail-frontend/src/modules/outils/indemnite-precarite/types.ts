export enum IndemnitePrecariteStepName {
  Introduction = "start",
  ConventionCollective = "info_cc",
  TypeContrat = "type_contrat",
  TermeContrat = "terme_contrat",
  Remuneration = "remuneration",
  Resultat = "indemnite",
}

/**
 * Famille de contrat : elle détermine le wording de l'étape « Terme du
 * contrat » (chemin A pour les CDD, chemin B pour les CTT) et, pour la
 * famille `EXCLU`, l'absence d'indemnité dès l'étape « Type de contrat ».
 */
export const CONTRACT_FAMILY = {
  CDD: "CDD",
  CTT: "CTT",
  EXCLU: "EXCLU",
} as const;

export type ContractFamily =
  (typeof CONTRACT_FAMILY)[keyof typeof CONTRACT_FAMILY];

export type ContractOption = {
  /** Identifiant stable de l'option, utilisé comme valeur du radio. */
  id: string;
  /** Libellé affiché à l'usager. */
  label: string;
  /** Précision affichée sous l'option (infobulle DSFR). */
  hint?: string;
  family: ContractFamily;
  /** Valeur envoyée à publicodes pour `contrat salarié . type de cdd`. */
  typeCdd: string;
};

/** Types de CDD génériques et conventionnels connus de publicodes. */
export const TYPE_CDD = {
  AUTRES: "Autres",
  USAGE_CONVOYEURS: "usage convoyeurs",
  USAGE_ENQUETEURS_VACATAIRES: "usage enquêteurs vacataires",
  USAGE_INTERVENTION_EVENEMENTIEL: "usage intervention évènementiel",
  USAGE_FORMATEURS: "usage formateurs",
  USAGE_EXTRA: "usage extra",
  OPTIMISATION_LINEAIRE: "optimisation linéaire",
  ANIMATION_COMMERCIALE: "animation commerciale",
  USAGE_INTERVENTION_SPORT: "usage intervention sport",
  USAGE_MISSION_PONCTUELLE: "usage mission ponctuelle",
} as const;

/** Réponses possibles à la question « Quelle a été l'issue du contrat ? ». */
export const ISSUE_CONTRAT = {
  EMBAUCHE_CDI: "embauche cdi",
  REFUS_CDI_EQUIVALENT: "refus cdi équivalent",
  REFUS_SOUPLESSE: "refus souplesse",
  FORCE_MAJEURE: "force majeure",
  FAUTE_GRAVE: "faute grave",
  INITIATIVE_SALARIE: "initiative salarié",
  AUTRE: "autre",
} as const;

export type IssueContrat = (typeof ISSUE_CONTRAT)[keyof typeof ISSUE_CONTRAT];

export type FinALaDatePrevue = "oui" | "non";
