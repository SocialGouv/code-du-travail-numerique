import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { AgreementRoute } from "src/modules/outils/indemnite-depart/types";

export type AgreementStoreInput = {
  route?: AgreementRoute;
  agreement?: any;
  enterprise?: any;
  hasNoEnterpriseSelected?: boolean;
  informationError?: boolean;
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
  onInitAgreementPage: () => void;
  onRouteChange: (value: AgreementRoute) => void;
  onAgreementChange: (agreement: any, enterprise?: any) => void;
  setHasNoEnterpriseSelected: (value: boolean) => void;
  onNextStep: () => ValidationResponse;
  onAgreementSearch: (data: any) => void;
  onEnterpriseSearch: (data: any) => void;
  resetStep: () => void;
};

export type AgreementStoreSlice = {
  agreementData: AgreementStoreData;
  agreementFunction: AgreementStoreFunction;
};
