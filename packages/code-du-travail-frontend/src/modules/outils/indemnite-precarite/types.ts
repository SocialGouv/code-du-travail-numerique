export enum IndemnitePrecariteStepName {
  Introduction = "intro",
  ConventionCollective = "info_cc",
  InfosGenerales = "info_generales",
  Remuneration = "remuneration",
  Resultat = "indemnite",
}

// Constantes pour les types de contrat
export const CONTRACT_TYPE = {
  CDD: "CDD" as const,
  CTT: "CTT" as const,
} as const;

export type ContractType = (typeof CONTRACT_TYPE)[keyof typeof CONTRACT_TYPE];
