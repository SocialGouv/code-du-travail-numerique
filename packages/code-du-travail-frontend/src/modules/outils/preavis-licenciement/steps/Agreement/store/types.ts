import {
  PublicodesInstance,
  PublicodesSimulator,
} from "@socialgouv/modeles-social";
import { Enterprise } from "src/modules/enterprise";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import {
  Agreement,
  AgreementRoute,
} from "src/modules/outils/indemnite-depart/types";

export type AgreementStoreInput = {
  route?: AgreementRoute;
  agreement?: Agreement;
  enterprise?: Enterprise;
  hasNoEnterpriseSelected?: boolean;
  informationError?: boolean;
  isStepInformationsHidden?: boolean;
  isAgreementSupported?: boolean;
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
  publicodes: PublicodesInstance<PublicodesSimulator.PREAVIS_LICENCIEMENT>;
};

export type AgreementStoreFunction = {
  onInitAgreementPage: () => void;
  onRouteChange: (value: AgreementRoute) => void;
  onAgreementChange: (agreement: any, enterprise?: any) => void;
  onSetIsStepHidden: () => void;
  setHasNoEnterpriseSelected: (value: boolean) => void;
  onNextStep: () => ValidationResponse;
  onAgreementSearch: (data: any) => void;
  onEnterpriseSearch: (data: any) => void;
};

export type AgreementStoreSlice = {
  agreementData: AgreementStoreData;
  agreementFunction: AgreementStoreFunction;
};
