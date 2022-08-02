import { IndemniteLicenciementPublicodes } from "@socialgouv/modeles-social";
import { Question } from "../../../DureePreavisRetraite/state";

export type PublicodesInformation = {
  info: string | undefined;
  order: number;
  question: Question;
};

export type CommonInformationsStoreInput = {
  publicodesInformations: Array<PublicodesInformation>;
  isStepHidden: boolean;
  hasNoMissingQuestions: boolean;
};

export type CommonInformationsStoreError = {
  errorInformations: Record<string, string>;
  alertError?: string;
};

export type CommonInformationsStoreData = {
  input: CommonInformationsStoreInput;
  error: CommonInformationsStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type CommonInformationsStoreFn = {
  onInformationsChange: (questionKey: string, value: string) => void;
  generatePublicodesQuestions: () => void;
  onValidateStep: () => boolean;
};

export type CommonInformationsStoreSlice = {
  informationsData: CommonInformationsStoreData & {
    publicodes?: IndemniteLicenciementPublicodes;
  };
  informationsFunction: CommonInformationsStoreFn;
};
