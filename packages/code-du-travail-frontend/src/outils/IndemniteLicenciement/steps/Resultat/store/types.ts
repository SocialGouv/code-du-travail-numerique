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
  agreementInformations?: AgreementInformation[];
  agreementNotifications?: Notification[];
  agreementHasNoLegalIndemnity?: boolean;
};

export type ResultStoreError = {};

export type ResultStoreData = StepData<ResultStoreInput, ResultStoreError>;

export type ResultStoreFn = {
  getPublicodesResult: () => void;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData & {
    publicodes?: IndemniteLicenciementPublicodes;
  };
  resultFunction: ResultStoreFn;
};
