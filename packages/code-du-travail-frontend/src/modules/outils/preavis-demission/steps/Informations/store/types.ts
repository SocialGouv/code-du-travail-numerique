import {
  PublicodesInstance,
  PublicodesSimulator,
  RuleType,
} from "@socialgouv/modeles-social";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { PublicodesInformation } from "src/modules/outils/indemnite-depart/steps/Informations/store";

export type InformationsStoreInput = {
  publicodesInformations: Array<PublicodesInformation>;
  hasNoMissingQuestions: boolean;
  informationError: boolean;
};

export type InformationsStoreError = {
  errorInformations: Record<string, string>;
  errorPublicodes?: string;
  errorNote?: string;
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
    publicodes?: PublicodesInstance<PublicodesSimulator.PREAVIS_DEMISSION>;
  };
  informationsFunction: InformationsStoreFn;
};
