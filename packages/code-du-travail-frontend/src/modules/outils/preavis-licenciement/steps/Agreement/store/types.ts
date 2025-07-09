import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

export type AgreementStoreInput = {
  route?: string;
  agreement?: any;
  enterprise?: any;
  hasNoEnterpriseSelected?: boolean;
};

export type AgreementStoreError = {
  route?: string;
  agreement?: string;
  enterprise?: string;
};

export type StepData<Input, Error> = {
  input: Input;
  error: Error;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type AgreementStoreData = StepData<
  AgreementStoreInput,
  AgreementStoreError
> & {
  publicodes: any;
};

export type AgreementStoreFunction = {
  onRouteChange: (value: string) => void;
  onAgreementChange: (agreement: any, enterprise?: any) => void;
  onNextStep: () => ValidationResponse;
  resetStep: () => void;
};

export type AgreementStoreSlice = {
  agreementData: AgreementStoreData;
  agreementFunction: AgreementStoreFunction;
};
