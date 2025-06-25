import {
  PublicodesInstance,
  PublicodesSimulator,
} from "@socialgouv/modeles-social";
import { Enterprise } from "src/modules/enterprise";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

export type AgreementSearchValue = {
  address: string;
  query: string;
};

export type AgreementStoreInput = {
  agreement?: Agreement;
  enterprise?: Enterprise;
  hasNoEnterpriseSelected: boolean;
  informationError: boolean;
};

export type AgreementStoreError = {
  agreement?: string;
  enterprise?: string;
  errorPublicodes?: string;
  unsupportedAgreement?: string;
};

export type AgreementStoreData = {
  input: AgreementStoreInput;
  error: AgreementStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
  publicodes: PublicodesInstance<PublicodesSimulator.INDEMNITE_PRECARITE>;
};

export type AgreementStoreFn = {
  onInitAgreementPage: () => void;
  onAgreementChange: (
    agreement: Agreement | undefined,
    enterprise?: Enterprise
  ) => void;
  onNextStep: () => ValidationResponse;
  onEnterpriseSearch: (value: AgreementSearchValue) => void;
  onAgreementSearch: (value: AgreementSearchValue) => void;
  setHasNoEnterpriseSelected: (value: boolean) => void;
};

export type AgreementStoreSlice = {
  agreementData: AgreementStoreData;
  agreementFunction: AgreementStoreFn;
};
