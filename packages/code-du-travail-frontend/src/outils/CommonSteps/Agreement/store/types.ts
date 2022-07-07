import { Agreement } from "../../../../conventions/Search/api/type";
import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";

export enum Route {
  agreement = "agreement",
  enterprise = "enterprise",
  none = "none",
}

export type CommonAgreementStoreInput = {
  route?: Route;
  agreement?: Agreement;
  enterprise?: Enterprise;
};

export type CommonAgreementStoreError = {
  route?: string;
  agreement?: string;
  enterprise?: string;
};

export type CommonAgreementStoreData = {
  input: CommonAgreementStoreInput;
  error: CommonAgreementStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type CommonAgreementStoreFn = {
  onRouteChange: (value: Route) => void;
  onAgreementChange: (
    agreement: Agreement | null,
    enterprise?: Enterprise
  ) => void;
  onValidateStep: () => boolean;
};

export type CommonAgreementStoreSlice = {
  agreementData: CommonAgreementStoreData;
  agreementFunction: CommonAgreementStoreFn;
};
