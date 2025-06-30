import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { ContractType } from "../../../types";
import { PublicodesInformation } from "src/modules/outils/indemnite-depart/steps/Informations/store";
import {
  RuleType,
  PublicodesInstance,
  PublicodesSimulator,
} from "@socialgouv/modeles-social";

export type InformationsStoreInput = {
  contractType?: ContractType;
  criteria: Record<string, any>;
  // Questions CDD
  finContratPeriodeDessai?: boolean;
  propositionCDIFindeContrat?: boolean;
  refusCDIFindeContrat?: boolean;
  interruptionFauteGrave?: boolean;
  refusRenouvellementAuto?: boolean;
  // Questions CTT
  cttFormation?: boolean;
  ruptureContratFauteGrave?: boolean;
  propositionCDIFinContrat?: boolean;
  refusSouplesse?: boolean;
  // Questions spécifiques aux conventions collectives
  hasCdiProposal?: string; // "oui" | "non"
  hasCdiRenewal?: string; // "oui" | "non"
  hasEquivalentCdiRenewal?: string; // "oui" | "non"
};

export type InformationsStoreError = {
  contractType?: string;
  criteria?: Record<string, string>;
  // Erreurs CDD
  finContratPeriodeDessai?: string;
  propositionCDIFindeContrat?: string;
  refusCDIFindeContrat?: string;
  interruptionFauteGrave?: string;
  refusRenouvellementAuto?: string;
  // Erreurs CTT
  cttFormation?: string;
  ruptureContratFauteGrave?: string;
  propositionCDIFinContrat?: string;
  refusSouplesse?: string;
  // Erreurs spécifiques aux conventions collectives
  hasCdiProposal?: string;
  hasCdiRenewal?: string;
  hasEquivalentCdiRenewal?: string;
};

export type InformationsStoreData = {
  input: InformationsStoreInput;
  error: InformationsStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type InformationsStoreFn = {
  onContractTypeChange: (contractType: ContractType) => void;
  onCriteriaChange: (criteria: Record<string, any>) => void;
  onCDDQuestionChange: (questionKey: string, value: boolean) => void;
  onCTTQuestionChange: (questionKey: string, value: boolean) => void;
  onConventionQuestionChange: (questionKey: string, value: string) => void;
  onNextStep: () => ValidationResponse;
  resetQuestions: () => void;
};

export type InformationsStoreSlice = {
  informationsData: InformationsStoreData & {
    publicodes?: PublicodesInstance<PublicodesSimulator.INDEMNITE_PRECARITE>;
  };
  informationsFunction: InformationsStoreFn;
};
