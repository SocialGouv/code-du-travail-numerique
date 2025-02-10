import {
  PublicodesInstance,
  PublicodesSimulator,
} from "@socialgouv/modeles-social";
import { Agreement, AgreementRoute, IndemniteDepartType } from "../../../types";
import { Enterprise } from "src/modules/enterprise";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

export type CommonAgreementStoreInput = {
  route?: AgreementRoute;
  agreement?: Agreement;
  enterprise?: Enterprise;
  isAgreementSupportedIndemniteLicenciement: boolean;
  informationError: boolean;
  indemniteDepartType?: IndemniteDepartType;
};

export type CommonAgreementStoreError = {
  route?: string;
  agreement?: string;
  enterprise?: string;
  errorPublicodes?: string;
};

export type CommonAgreementStoreData<T extends PublicodesSimulator> = {
  input: CommonAgreementStoreInput;
  error: CommonAgreementStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
  publicodes: PublicodesInstance<T>;
};

export type CommonAgreementStoreFn = {
  onRouteChange: (value: AgreementRoute) => void;
  onInitAgreementPage: () => void;
  onAgreementChange: (agreement?: Agreement, enterprise?: Enterprise) => void;
  onNextStep: () => ValidationResponse;
};

export type CommonAgreementStoreSlice<T extends PublicodesSimulator> = {
  agreementData: CommonAgreementStoreData<T>;
  agreementFunction: CommonAgreementStoreFn;
};
