import { StepData } from "../../../store";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

export type AncienneteStoreInput = {
  dateEntree?: string;
  dateSortie?: string;
  dateNotification?: string;
};

export type AncienneteStoreError = {
  errorDateEntree?: string;
  errorDateSortie?: string;
  errorDateNotification?: string;
  errorEligibility?: string;
  errorPublicodes?: string;
};

export type AncienneteAbsenceStoreError = {
  errorDuration?: string;
  errorDate?: string;
};

export type AncienneteStoreData = StepData<
  AncienneteStoreInput,
  AncienneteStoreError
>;

export type AncienneteStoreFn = {
  init: () => void;
  onChangeDateEntree: (value: string) => void;
  onChangeDateSortie: (value: string) => void;
  onChangeDateNotification: (value: string) => void;
  onNextStep: () => ValidationResponse;
};

export type AncienneteStoreSlice = {
  ancienneteData: AncienneteStoreData;
  ancienneteFunction: AncienneteStoreFn;
};
