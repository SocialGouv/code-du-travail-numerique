import {
  PublicodesPreavisRetraiteResult,
  References,
  Notification,
} from "@socialgouv/modeles-social";
import { StepData } from "../../store";
import { NoticeUsed, WarningType } from "../utils/types";
import { AgreementInformation } from "../../../../CommonIndemniteDepart/common";

export type ResultStoreInput = {
  noticeUsed?: NoticeUsed;
  warningType?: WarningType;
  isSeniorityLessThan6Months?: boolean;
  hasAgreement?: boolean;
  hasAgreementResult?: boolean;
  isAgreementSupported?: boolean;
  legalResult?: PublicodesPreavisRetraiteResult;
  agreementResult?: PublicodesPreavisRetraiteResult;
  agreementMaximumResult?: PublicodesPreavisRetraiteResult;
  bestResult?: PublicodesPreavisRetraiteResult;
  legalNotification?: Notification[];
  legalReferences?: References[];
  agreementNotification?: Notification[];
  agreementReferences?: References[];
  hasHandicap?: boolean;
  publicodesInformations?: AgreementInformation[];
};

export type ResultStoreError = {
  errorPublicodes?: string;
};

export type ResultStoreData = StepData<ResultStoreInput, ResultStoreError>;

export type ResultStoreFn = {
  getPublicodesResult: () => void;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData;
  resultFunction: ResultStoreFn;
};
