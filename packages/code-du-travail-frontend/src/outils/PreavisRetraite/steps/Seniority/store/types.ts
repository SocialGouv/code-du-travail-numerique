import { OuiNon } from "../../../../CommonIndemniteDepart/common";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";
import { StepData } from "../../store";

export type SeniorityStoreInput = {
  moreThanTwoYears?: OuiNon;
  seniorityInMonths?: string;
};

export type SeniorityStoreError = {
  errorMoreThanTwoYears?: string;
  errorSeniorityInMonths?: string;
};

export type SeniorityStoreData = StepData<
  SeniorityStoreInput,
  SeniorityStoreError
>;

export type SeniorityStoreFn = {
  onChangeMoreThanTwoYears: (value: OuiNon) => void;
  onChangeSeniorityInMonths: (value: string) => void;
  onNextStep: () => ValidationResponse;
};

export type SeniorityStoreSlice = {
  seniorityData: SeniorityStoreData;
  seniorityFunction: SeniorityStoreFn;
};
