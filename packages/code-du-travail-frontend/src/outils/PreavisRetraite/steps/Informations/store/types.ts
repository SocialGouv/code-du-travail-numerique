import {
  PublicodesInstance,
  PublicodesSimulator,
  RuleType,
} from "@socialgouv/modeles-social";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";
import { PublicodesInformation } from "../../../../CommonIndemniteDepart/steps/Informations/store";

export type InformationsStoreInput = {
  publicodesInformations: Array<PublicodesInformation>;
  hasNoMissingQuestions: boolean;
  informationError: boolean;
};

export type InformationsStoreError = {
  errorInformations: Record<string, string>;
  errorPublicodes?: string;
};

export type InformationsStoreData = {
  input: InformationsStoreInput;
  error: InformationsStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type InformationsStoreFn = {
  onInformationsChange: (
    questionKey: string,
    value: string,
    type: RuleType | undefined
  ) => void;
  generatePublicodesQuestions: () => boolean;
  onNextStep: () => ValidationResponse;
};

export type InformationsStoreSlice = {
  informationsData: InformationsStoreData & {
    publicodes?: PublicodesInstance<PublicodesSimulator.PREAVIS_RETRAITE>;
  };
  informationsFunction: InformationsStoreFn;
};
