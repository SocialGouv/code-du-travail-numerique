import { StepData } from "../../../store";
import { OuiNon } from "../../../common";
import { ValidationResponse } from "../../../../components/Simulator/SimulatorLayout";

export type CdiCdd = "cdi" | "cdd";

export type ContratTravailStoreInput = {
  typeContratTravail?: CdiCdd;
  licenciementFauteGrave?: OuiNon;
  licenciementInaptitude?: OuiNon;
  arretTravail?: OuiNon;
  dateArretTravail?: string;
};

export type ContratTravailStoreError = {
  errorTypeContratTravail?: string;
  errorLicenciementFauteGrave?: string;
  errorLicenciementInaptitude?: string;
  errorCdd?: boolean;
  errorFauteGrave?: boolean;
  errorEligibility?: string;
  errorArretTravail?: string;
  errorDateArretTravail?: string;
};

export type ContratTravailStoreData = StepData<
  ContratTravailStoreInput,
  ContratTravailStoreError
>;

export type ContratTravailStoreFn = {
  onChangeTypeContratTravail: (value: CdiCdd) => void;
  onChangeLicenciementFauteGrave: (value: OuiNon) => void;
  onChangeLicenciementInaptitude: (value: OuiNon) => void;
  onChangeArretTravail: (value: OuiNon) => void;
  onChangeDateArretTravail: (value: string) => void;
  onNextStep: () => ValidationResponse;
};

export type ContratTravailStoreSlice = {
  contratTravailData: ContratTravailStoreData;
  contratTravailFunction: ContratTravailStoreFn;
};
