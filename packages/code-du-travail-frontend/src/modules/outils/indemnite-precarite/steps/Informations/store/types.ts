import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { ContractType } from "../../../types";

export type InformationsStoreInput = {
  contractType?: ContractType;
  criteria: Record<string, any>;
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
};

export type InformationsStoreFn = {
  onContractTypeChange: (contractType: ContractType) => void;
  onCriteriaChange: (criteria: Record<string, any>) => void;
  onNextStep: () => ValidationResponse;
  shouldSkipStep: () => boolean;
};

export type InformationsStoreSlice = {
  informationsData: InformationsStoreData;
  informationsFunction: InformationsStoreFn;
};
