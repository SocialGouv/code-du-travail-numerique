import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { ValidationResponse } from "../../../Components/SimulatorLayout";
import { AgreementRoute } from "../../../common/type/WizardType";
import {
  PublicodesInstance,
  PublicodesSimulator,
} from "@socialgouv/modeles-social";
import { Agreement } from "../../../types";

export type CommonAgreementStoreInput = {
  route?: AgreementRoute;
  agreement?: Agreement;
  enterprise?: Enterprise;
  isAgreementSupportedIndemniteLicenciement: boolean;
  hasNoEnterpriseSelected: boolean;
  informationError: boolean;
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

export type AgreementSearchValue = {
  address: string;
  query: string;
};

export type CommonAgreementStoreFn = {
  onRouteChange: (value: AgreementRoute) => void;
  onInitAgreementPage: () => void;
  onAgreementChange: (
    agreement: Agreement | null,
    enterprise?: Enterprise
  ) => void;
  onNextStep: () => ValidationResponse;
  onEnterpriseSearch: (value: AgreementSearchValue) => void;
  onAgreementSearch: (value: AgreementSearchValue) => void;
  setHasNoEnterpriseSelected: (value: boolean) => void;
};

export type CommonAgreementStoreSlice<T extends PublicodesSimulator> = {
  agreementData: CommonAgreementStoreData<T>;
  agreementFunction: CommonAgreementStoreFn;
};
