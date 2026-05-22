import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { ContractType } from "../../../types";
import {
  PublicodesInstance,
  PublicodesSimulator,
} from "@socialgouv/modeles-social";

export type CddConditionKey =
  | "finContratPeriodeDessai"
  | "propositionCDIFindeContrat"
  | "refusCDIFindeContrat"
  | "interruptionFauteGrave"
  | "refusRenouvellementAuto";

export type CttConditionKey =
  | "cttFormation"
  | "ruptureContratFauteGrave"
  | "propositionCDIFinContrat"
  | "refusSouplesse";

export type AgreementConditionKey =
  | "hasCdiProposal"
  | "hasCdiRenewal"
  | "hasEquivalentCdiRenewal";

export type DisqualificationReason =
  | { kind: "excludedCddType"; subtype: string }
  | { kind: "cddCondition"; key: CddConditionKey }
  | { kind: "cttCondition"; key: CttConditionKey }
  | { kind: "agreementCondition"; idcc: number; key: AgreementConditionKey };

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
  hasCdiProposal?: boolean;
  hasCdiRenewal?: boolean;
  hasEquivalentCdiRenewal?: boolean;
};

export type InformationsStoreError = {
  contractType?: string;
  criteria?: Record<string, string>;
};

export type InformationsStoreData = {
  input: InformationsStoreInput;
  error: InformationsStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
  disqualificationReason?: DisqualificationReason;
};

export type InformationsStoreFn = {
  onContractTypeChange: (contractType: ContractType) => void;
  onCriteriaChange: (criteria: Record<string, any>) => void;
  onCDDQuestionChange: (
    questionKey: CddConditionKey,
    checked: boolean
  ) => void;
  onCTTQuestionChange: (
    questionKey: CttConditionKey,
    checked: boolean
  ) => void;
  onConventionQuestionChange: (
    questionKey: AgreementConditionKey,
    checked: boolean
  ) => void;
  onNextStep: () => ValidationResponse;
};

export type InformationsStoreSlice = {
  informationsData: InformationsStoreData & {
    publicodes?: PublicodesInstance<PublicodesSimulator.INDEMNITE_PRECARITE>;
  };
  informationsFunction: InformationsStoreFn;
};
