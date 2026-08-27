import {
  IndemniteLicenciementPublicodes,
  Rule,
  RuleType,
} from "@socialgouv/modeles-social";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { OuiNon } from "../../../common";
import { OriginRetraite } from "../../../types";

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
  showLicenciementInaptitude?: boolean;
  licenciementInaptitude?: OuiNon;
  showOriginRetraite?: boolean;
  originRetraite?: OriginRetraite;
  publicodesInformations: Array<PublicodesInformation>;
  isStepHidden: boolean;
  isStepSalaryHidden: boolean;
  hasNoMissingQuestions: boolean;
  blockingNotification?: string;
  informationError: boolean;
};

export type CommonInformationsStoreError = {
  errorLicenciementInaptitude?: string;
  errorOriginRetraite?: string;
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
  onChangeLicenciementInaptitude: (value: OuiNon) => void;
  onChangeOriginRetraite: (value: OriginRetraite) => void;
  onInformationsChange: (
    questionKey: string,
    value: string,
    type: RuleType | undefined
  ) => void;
  generatePublicodesQuestions: () => boolean;
  onNextStep: () => ValidationResponse;
  onUpdateSalaryStepVisibility: () => void;
};

export type CommonInformationsStoreSlice = {
  informationsData: CommonInformationsStoreData & {
    publicodes?: IndemniteLicenciementPublicodes;
  };
  informationsFunction: CommonInformationsStoreFn;
};
