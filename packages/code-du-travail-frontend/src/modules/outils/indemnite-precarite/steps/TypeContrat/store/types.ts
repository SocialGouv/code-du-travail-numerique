import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

export type TypeContratStoreInput = {
  /** `id` de l'option retenue dans `getContractOptions`. */
  contractOptionId?: string;
};

export type TypeContratStoreError = {
  contractOptionId?: string;
};

export type TypeContratStoreData = {
  input: TypeContratStoreInput;
  error: TypeContratStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
  /** Message d'inéligibilité renvoyé par le modèle publicodes, s'il y en a un. */
  ineligibility?: string;
};

export type TypeContratStoreFn = {
  onContractOptionChange: (contractOptionId: string) => void;
  onNextStep: () => ValidationResponse;
};

export type TypeContratStoreSlice = {
  typeContratData: TypeContratStoreData;
  typeContratFunction: TypeContratStoreFn;
};
