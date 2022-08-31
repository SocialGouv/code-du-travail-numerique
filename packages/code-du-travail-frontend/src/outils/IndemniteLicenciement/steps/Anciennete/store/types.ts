import { StepData } from "../../../store";
import { OuiNon } from "../../../common";
import { Absence } from "@socialgouv/modeles-social";

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
  errorAbsencePeriods?: string;
};

export type AncienneteStoreData = StepData<
  AncienneteStoreInput,
  AncienneteStoreError
>;

export type AncienneteStoreFn = {
  onChangeDateEntree: (value: string) => void;
  onChangeDateSortie: (value: string) => void;
  onChangeDateNotification: (value: string) => void;
  onChangeAbsencePeriods: (value: Absence[]) => void;
  onValidateStepAnciennete: () => boolean;
  onChangeHasAbsenceProlonge: (value: OuiNon) => void;
};

export type AncienneteStoreSlice = {
  ancienneteData: AncienneteStoreData;
  ancienneteFunction: AncienneteStoreFn;
};
