import {
  PublicodesInstance,
  PublicodesSimulator,
} from "@socialgouv/modeles-social";
import { Enterprise } from "../../../../../conventions/Search/api/enterprises.service";
import { AgreementRoute } from "../../../../common/type/WizardType";
import { Agreement } from "../../../../types";
import { AgreementSearchValue } from "../../../../CommonIndemniteDepart/steps/Agreement/store";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";

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
    agreement: Agreement | null,
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
