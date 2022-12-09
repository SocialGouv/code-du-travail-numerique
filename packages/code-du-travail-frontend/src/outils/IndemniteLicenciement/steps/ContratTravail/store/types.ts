import { StepData } from "../../../store";
import { OuiNon } from "../../../common/types";

type CdiCdd = "cdi" | "cdd";

export type ContratTravailStoreInput = {
  typeContratTravail?: CdiCdd;
  licenciementFauteGrave?: OuiNon;
  licenciementInaptitude?: OuiNon;
};

export type ContratTravailStoreError = {
  errorTypeContratTravail?: string;
  errorLicenciementFauteGrave?: string;
  errorLicenciementInaptitude?: string;
  errorCdd?: boolean;
  errorFauteGrave?: boolean;
  errorEligibility?: string;
};

export type ContratTravailStoreData = StepData<
  ContratTravailStoreInput,
  ContratTravailStoreError
>;

export type ContratTravailStoreFn = {
  onChangeTypeContratTravail: (value: CdiCdd) => void;
  onChangeLicenciementFauteGrave: (value: OuiNon) => void;
  onChangeLicenciementInaptitude: (value: OuiNon) => void;
  onValidateStepInfo: () => boolean;
  onEligibilityCheckStepInfo: () => boolean;
};

export type ContratTravailStoreSlice = {
  contratTravailData: ContratTravailStoreData;
  contratTravailFunction: ContratTravailStoreFn;
};
