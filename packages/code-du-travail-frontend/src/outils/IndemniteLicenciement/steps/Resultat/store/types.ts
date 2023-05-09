import {
  Formula,
  IndemniteLicenciementPublicodes,
  Notification,
  PublicodesIndemniteLicenciementResult,
  References,
  SeniorityResult,
} from "@socialgouv/modeles-social";
import { AgreementInformation } from "../../../common";
import { StepData } from "../../../store";

export type ResultStoreInput = {
  publicodesLegalResult: PublicodesIndemniteLicenciementResult;
  publicodesAgreementResult?: PublicodesIndemniteLicenciementResult;
  agreementSeniority?: SeniorityResult;
  legalSeniority: number;
  legalFormula: Formula;
  agreementFormula?: Formula;
  legalReferences: References[];
  agreementReferences?: References[];
  isAgreementBetter: boolean;
  isAgreementEqualToLegal: boolean;
  agreementInformations?: AgreementInformation[];
  notifications?: Notification[];
  agreementHasNoLegalIndemnity?: boolean;
  isEligible: boolean;
  infoWarning?: { message: string; title: string };
};

export type ResultStoreError = {};

export type ResultStoreData = StepData<ResultStoreInput, ResultStoreError>;

export type ResultStoreFn = {
  getPublicodesResult: () => void;
  init: () => void;
  getEligibilityError: () => string | undefined;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData & {
    publicodes?: IndemniteLicenciementPublicodes;
  };
  resultFunction: ResultStoreFn;
};
