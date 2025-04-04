import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { StepData } from "../../store";

export type DepartOuMiseRetraite = "depart-retraite" | "mise-retraite";

export type OriginDepartStoreInput = {
  originDepart?: DepartOuMiseRetraite;
};

export type OriginDepartStoreError = {
  errorOriginDepart?: string;
};

export type OriginDepartStoreData = StepData<
  OriginDepartStoreInput,
  OriginDepartStoreError
>;

export type OriginDepartStoreFn = {
  onChangeOriginDepart: (value: DepartOuMiseRetraite) => void;
  onNextStep: () => ValidationResponse;
};

export type OriginDepartStoreSlice = {
  originDepartData: OriginDepartStoreData;
  originDepartFunction: OriginDepartStoreFn;
};
