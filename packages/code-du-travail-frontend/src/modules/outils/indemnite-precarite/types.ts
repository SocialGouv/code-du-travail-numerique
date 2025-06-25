import { Agreement } from "../indemnite-depart/types";

export interface IndemnitePrecariteData {
  // Type de contrat
  contractType?: "CDD" | "CTT";

  // Convention collective
  conventionCollective?: Agreement;

  // Critères spécifiques selon la convention collective
  criteria?: {
    cddType?: string;
    hasCdiProposal?: "oui" | "non";
    hasCdiRenewal?: "oui" | "non";
    hasEquivalentCdiRenewal?: "oui" | "non";
    missionType?: string; // Pour les contrats d'intérim
  };

  // Informations salariales
  salaryInfo?: {
    monthlySalary?: number;
    variablePart?: number;
    benefits?: number;
    totalGrossSalary?: number;
  };

  // Durée du contrat
  contractDuration?: {
    startDate?: string;
    endDate?: string;
    durationInMonths?: number;
  };

  // Informations spécifiques CDD
  cddInfo?: {
    hasRenewal?: boolean;
    renewalCount?: number;
    totalDuration?: number;
  };

  // Informations spécifiques CTT (intérim)
  cttInfo?: {
    missionType?: string;
    hasFormation?: boolean;
    endReason?: string;
  };

  // Résultat du calcul
  result?: {
    indemnityAmount?: number;
    calculationDetails?: {
      baseAmount: number;
      rate: number;
      conventionalAmount?: number;
    };
    isEligible?: boolean;
    ineligibilityReason?: string;
  };
}

export enum IndemnitePrecariteStepName {
  Introduction = "intro",
  ConventionCollective = "ccn",
  InfosGenerales = "infos_generales",
  Remuneration = "remuneration",
  Resultat = "result",
}

export interface SalaryInfo {
  monthlySalary?: number;
  variablePart?: number;
  benefits?: number;
  totalGrossSalary?: number;
}

export interface ContractInfo {
  type: "CDD" | "CTT";
  startDate?: string;
  endDate?: string;
  duration?: number;
}

export interface CalculationResult {
  amount: number;
  isEligible: boolean;
  reason?: string;
  details?: {
    baseAmount: number;
    rate: number;
    conventionalAmount?: number;
  };
}

// Types pour les questions dynamiques
export interface Question {
  key: string;
  label: string;
  options: string[] | [string, string][];
}

// Types pour les situations (conventions collectives)
export interface Situation {
  idcc: string;
  allowBonus: boolean;
  hasConventionalProvision: boolean;
  endMessage?: string;
  criteria?: Record<string, string>;
}

// Constantes pour les types de contrat
export const CONTRACT_TYPE = {
  CDD: "CDD" as const,
  CTT: "CTT" as const,
} as const;

export type ContractType = (typeof CONTRACT_TYPE)[keyof typeof CONTRACT_TYPE];

// Questions pour les critères
export const QUESTIONS = {
  cddType: "Quel est le type de CDD ?",
  hasCdiProposal:
    "À la fin du CDD, le salarié a-t-il reçu une proposition de CDI ?",
  hasCdiRenewal:
    "À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI ?",
  hasEquivalentCdiRenewal:
    "À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent ?",
} as const;

// Ordre des critères pour les questions dynamiques
export const CRITERIA_ORDER = [
  "cddType",
  "hasCdiProposal",
  "hasCdiRenewal",
  "hasEquivalentCdiRenewal",
] as const;

// Contrats exclus de l'indemnité de précarité
export const EXCLUDED_CONTRACTS = [
  "CDD saisonnier",
  "CDD conclu avec un jeune (mineur ou majeur) pendant ses vacances scolaires ou universitaires",
  "CCD dans le cadre d'un congé de mobilité",
  "Contrat unique d'insertion (CUI) ou Parcours emploi compétences (PEC)",
  "Contrat de professionnalisation ou Contrat d'apprentissage",
  "Contrat pour lequel l'employeur s'est engagé à assurer un complément de formation professionnelle au salarié",
] as const;
