import {
  IndemniteLicenciementPublicodes,
  Rule,
  RuleType,
} from "@socialgouv/modeles-social";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";

export type Question = {
  name: string;
  rule: Rule;
};

export type PublicodesInformation = {
  info: string | undefined;
  order: number;
  id: string;
  question: Question;
};

export type CommonInformationsStoreInput = {
  publicodesInformations: Array<PublicodesInformation>;
  isStepHidden: boolean;
  isStepSalaryHidden: boolean;
  hasNoMissingQuestions: boolean;
  blockingNotification?: string;
  informationError: boolean;
};

export type CommonInformationsStoreError = {
  errorInformations: Record<string, string>;
  errorEligibility?: string;
  errorPublicodes?: string;
};

export type CommonInformationsStoreData = {
  input: CommonInformationsStoreInput;
  error: CommonInformationsStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type CommonInformationsStoreFn = {
  onInformationsChange: (
    questionKey: string,
    value: string,
    type: RuleType | undefined,
  ) => void;
  generatePublicodesQuestions: () => boolean;
  onNextStep: () => ValidationResponse;
  onSetStepHidden: () => void;
};

export type CommonInformationsStoreSlice = {
  informationsData: CommonInformationsStoreData & {
    publicodes?: IndemniteLicenciementPublicodes;
  };
  informationsFunction: CommonInformationsStoreFn;
};
