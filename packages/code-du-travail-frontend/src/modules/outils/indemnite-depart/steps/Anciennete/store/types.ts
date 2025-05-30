import { StepData } from "../../../store";
import { OuiNon } from "../../../common";
import { Absence, Motif } from "@socialgouv/modeles-social";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

export type AncienneteStoreInput = {
  dateEntree?: string;
  dateSortie?: string;
  dateNotification?: string;
  absencePeriods: Absence[];
  motifs: Motif[];
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
  onChangeAbsencePeriods: (value: Absence[]) => void;
  onNextStep: () => ValidationResponse;
  onChangeHasAbsenceProlonge: (value: OuiNon) => void;
};

export type AncienneteStoreSlice = {
  ancienneteData: AncienneteStoreData;
  ancienneteFunction: AncienneteStoreFn;
};
