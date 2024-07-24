import { OuiNon } from "../../../../CommonIndemniteDepart/common";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";
import { StepData } from "../../store";

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
