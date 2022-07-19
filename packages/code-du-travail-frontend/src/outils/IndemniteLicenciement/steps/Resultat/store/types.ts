import {
  IndemniteLicenciementPublicodes,
  PublicodesIndemniteLicenciementResult,
  References,
} from "@socialgouv/modeles-social";
import { StepData } from "../../../store";

export type ResultStoreInput = {
  publicodesLegalResult: PublicodesIndemniteLicenciementResult;
  publicodesAgreementResult?: PublicodesIndemniteLicenciementResult;
  agreementSeniority?: number;
  legalSeniority: number;
  legalFormula: string;
  legalReferences: References[];
  agreementReferences?: References[];
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
