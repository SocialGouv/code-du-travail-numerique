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

export type AgreementSearchValue = {
  address: string;
  query: string;
};

export type AgreementStoreInput = {
  route?: AgreementRoute;
  agreement?: Agreement;
  enterprise?: Enterprise;
  hasNoEnterpriseSelected: boolean;
  informationError: boolean;
};

export type AgreementStoreError = {
  route?: string;
  agreement?: string;
  enterprise?: string;
  errorPublicodes?: string;
};

export type AgreementStoreData = {
  input: AgreementStoreInput;
  error: AgreementStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
  publicodes: PublicodesInstance<PublicodesSimulator.PREAVIS_RETRAITE>;
};

export type AgreementStoreFn = {
  onRouteChange: (value: AgreementRoute) => void;
  onInitAgreementPage: () => void;
  onAgreementChange: (
    agreement: Agreement | undefined,
    enterprise?: Enterprise
  ) => void;
  onNextStep: () => ValidationResponse;
  setHasNoEnterpriseSelected: (value: boolean) => void;
};

export type AgreementStoreSlice = {
  agreementData: AgreementStoreData;
  agreementFunction: AgreementStoreFn;
};
