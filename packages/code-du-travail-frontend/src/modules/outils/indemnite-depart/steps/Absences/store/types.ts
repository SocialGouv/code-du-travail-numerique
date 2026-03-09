import { StepData } from "../../../store";
import { OuiNon } from "../../../common";
import { Absence, Motif } from "@socialgouv/modeles-social";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { IndemniteDepartType } from "../../../types";

export type AbsenceStoreInput = {
  arretTravail?: OuiNon;
  dateArretTravail?: string;
  absencePeriods: Absence[];
  motifs: Motif[];
  hasAbsenceProlonge?: OuiNon;
};

export type AbsenceStoreError = {
  errorAbsenceProlonge?: string;
  errorAbsencePeriods?: {
    absences?: AbsenceDetailStoreError[];
  };
  errorEligibility?: string;
  errorPublicodes?: string;
  errorArretTravail?: string;
  errorDateArretTravail?: string;
};

export type AbsenceDetailStoreError = {
  errorDuration?: string;
  errorDate?: string;
};

export type AbsenceStoreData = StepData<AbsenceStoreInput, AbsenceStoreError>;

export type AbsenceStoreFn = {
  init: () => IndemniteDepartType;
  onChangeArretTravail: (value: OuiNon) => void;
  onChangeDateArretTravail: (value: string) => void;
  onChangeAbsencePeriods: (value: Absence[]) => void;
  onNextStep: () => ValidationResponse;
  onChangeHasAbsenceProlonge: (value: OuiNon) => void;
};

export type AbsenceStoreSlice = {
  absenceData: AbsenceStoreData;
  absenceFunction: AbsenceStoreFn;
};
