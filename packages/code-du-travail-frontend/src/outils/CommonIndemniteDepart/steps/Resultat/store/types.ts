import {
  Formula,
  IndemniteLicenciementPublicodes,
  Notification,
  PublicodesIndemniteLicenciementResult,
  References,
  ExplanationMainResult,
  ExplanationAgreementResult,
  SeniorityResult,
} from "@socialgouv/modeles-social";
import { AgreementInformation } from "../../../common";
import { StepData } from "../../../store";

export type ResultStoreInput = {
  result: PublicodesIndemniteLicenciementResult;
  publicodesLegalResult: PublicodesIndemniteLicenciementResult;
  publicodesAgreementResult?: PublicodesIndemniteLicenciementResult;
  resultExplanation?: ExplanationMainResult;
  agreementExplanation?: ExplanationAgreementResult;
  agreementSeniority?: SeniorityResult;
  formula: Formula;
  legalReferences: References[];
  agreementReferences?: References[];
  isAgreementBetter: boolean;
  agreementInformations?: AgreementInformation[];
  notifications?: Notification[];
  agreementHasNoLegalIndemnity?: boolean;
  agreementHasNoBetterAllowance?: boolean;
  isEligible: boolean;
  infoWarning?: { message: string; title: string };
  isParentalNoticeHidden: boolean;
};

export type ResultStoreError = {
  errorPublicodes: boolean;
};

export type ResultStoreData = StepData<ResultStoreInput, ResultStoreError>;

export type ResultStoreFn = {
  getPublicodesResult: () => void;
  init: () => { isEligible: boolean };
  getEligibilityError: () => string | undefined;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData & {
    publicodes?: IndemniteLicenciementPublicodes;
  };
  resultFunction: ResultStoreFn;
};
