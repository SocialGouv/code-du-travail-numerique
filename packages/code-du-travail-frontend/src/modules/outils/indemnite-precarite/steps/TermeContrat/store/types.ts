import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { FinALaDatePrevue, IssueContrat } from "../../../types";

export type TermeContratStoreInput = {
  finALaDatePrevue?: FinALaDatePrevue;
  issueContrat?: IssueContrat;
};

export type TermeContratStoreError = {
  finALaDatePrevue?: string;
  issueContrat?: string;
};

export type TermeContratStoreData = {
  input: TermeContratStoreInput;
  error: TermeContratStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
  /** Message d'inéligibilité renvoyé par le modèle publicodes, s'il y en a un. */
  ineligibility?: string;
};

export type TermeContratStoreFn = {
  onFinALaDatePrevueChange: (value: FinALaDatePrevue) => void;
  onIssueContratChange: (value: IssueContrat) => void;
  onNextStep: () => ValidationResponse;
};

export type TermeContratStoreSlice = {
  termeContratData: TermeContratStoreData;
  termeContratFunction: TermeContratStoreFn;
};
