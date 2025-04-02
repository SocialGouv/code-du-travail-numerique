import { OuiNon } from "src/modules/outils/indemnite-depart/common";
import { StepData } from "../../store";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

export type SeniorityStoreInput = {
  moreThanXYears?: OuiNon;
  seniorityInMonths?: string;
};

export type SeniorityStoreError = {
  errorMoreThanXYears?: string;
  errorSeniorityInMonths?: string;
};

export type SeniorityStoreData = StepData<
  SeniorityStoreInput,
  SeniorityStoreError
>;

export type SeniorityStoreFn = {
  onChangeMoreThanXYears: (value: OuiNon) => void;
  onChangeSeniorityInMonths: (value: string) => void;
  onNextStep: () => ValidationResponse;
};

export type SeniorityStoreSlice = {
  seniorityData: SeniorityStoreData;
  seniorityFunction: SeniorityStoreFn;
};
