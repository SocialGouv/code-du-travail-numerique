import { StepData } from "../../../store";
import { OuiNon } from "../../../common";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

export type ContratTravailStoreInput = {
  licenciementInaptitude?: OuiNon;
};

export type ContratTravailStoreError = {
  errorLicenciementInaptitude?: string;
  errorEligibility?: string;
};

export type ContratTravailStoreData = StepData<
  ContratTravailStoreInput,
  ContratTravailStoreError
>;

export type ContratTravailStoreFn = {
  onChangeLicenciementInaptitude: (value: OuiNon) => void;
  onNextStep: () => ValidationResponse;
};

export type ContratTravailStoreSlice = {
  contratTravailData: ContratTravailStoreData;
  contratTravailFunction: ContratTravailStoreFn;
};
