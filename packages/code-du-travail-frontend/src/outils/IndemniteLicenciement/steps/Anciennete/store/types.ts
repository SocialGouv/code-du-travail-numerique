import { StepData } from "../../../store";
import { OuiNon } from "../../../common";
import { Absence } from "@socialgouv/modeles-social";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";

export type AncienneteStoreInput = {
  dateEntree?: string;
  dateSortie?: string;
  dateNotification?: string;
  absencePeriods: Absence[];
  hasAbsenceProlonge?: OuiNon;
};

export type AncienneteStoreError = {
  errorDateSortie?: string;
  errorDateNotification?: string;
  errorAbsenceProlonge?: string;
  errorDateEntree?: string;
  errorAbsencePeriods?: {
    global?: string;
    absences?: AncienneteAbsenceStoreError[];
  };
  errorEligibility?: string;
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
  onChangeAbsencePeriods: (value: Absence[]) => void;
  onNextStep: () => ValidationResponse;
  onPrevStep: () => void;
  onChangeHasAbsenceProlonge: (value: OuiNon) => void;
};

export type AncienneteStoreSlice = {
  ancienneteData: AncienneteStoreData;
  ancienneteFunction: AncienneteStoreFn;
};
