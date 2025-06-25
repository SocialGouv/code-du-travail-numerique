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
  publicodesInformations: Array<PublicodesInformation>;
  hasNoMissingQuestions: boolean;
  informationError: boolean;
};

export type InformationsStoreError = {
  contractType?: string;
  criteria?: Record<string, string>;
  errorInformations: Record<string, string>;
  errorPublicodes?: string;
  errorIneligibility?: string;
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
  onInformationsChange: (
    questionKey: string,
    value: string,
    type: RuleType | undefined
  ) => void;
  generatePublicodesQuestions: () => boolean;
  onNextStep: () => ValidationResponse;
  shouldSkipStep: () => boolean;
  resetQuestions: () => void;
  checkIneligibility: () => boolean;
};

export type InformationsStoreSlice = {
  informationsData: InformationsStoreData & {
    publicodes?: PublicodesInstance<PublicodesSimulator.INDEMNITE_PRECARITE>;
  };
  informationsFunction: InformationsStoreFn;
};
