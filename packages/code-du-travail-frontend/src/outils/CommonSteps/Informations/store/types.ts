import { IndemniteLicenciementPublicodes } from "@socialgouv/modeles-social";
import { Question } from "../../../DureePreavisRetraite/state";

export type CommonInformationsStoreInput = {
  informations: Record<string, string>;
  publicodesQuestions: Question[];
  isStepHidden: boolean;
  hasNoMissingVariables: boolean;
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
