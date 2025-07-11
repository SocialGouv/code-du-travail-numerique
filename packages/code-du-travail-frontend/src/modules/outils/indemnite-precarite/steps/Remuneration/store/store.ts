import { StoreApi } from "zustand";
import produce from "immer";

import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import {
  RemunerationStoreData,
  RemunerationStoreSlice,
  SalaryEntry,
} from "./types";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { validateStep } from "./validator";

const initialState: RemunerationStoreData = {
  input: {
    typeRemuneration: undefined,
    salaire: undefined,
    salaires: [],
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createRemunerationStore: StoreSliceWrapperIndemnitePrecarite<
  RemunerationStoreSlice
> = (set, get) => ({
  remunerationData: {
    ...initialState,
  },
  remunerationFunction: {
    onTypeRemunerationChange: (type: "total" | "mensuel") => {
      applyGenericValidation(get, set, "typeRemuneration", type);

      // Reset des autres champs selon le type sélectionné
      if (type === "mensuel") {
        // Initialiser avec 2 salaires vides pour commencer
        applyGenericValidation(get, set, "salaires", [
          { salaire: null },
          { salaire: null },
        ]);
        applyGenericValidation(get, set, "salaire", undefined);
      } else {
        // Reset des salaires mensuels
        applyGenericValidation(get, set, "salaires", []);
      }
    },
    onSalaireChange: (salaire: number) => {
      applyGenericValidation(get, set, "salaire", salaire);
    },
    onSalairesChange: (salaires: SalaryEntry[]) => {
      applyGenericValidation(get, set, "salaires", salaires);

      // Si on supprime tous les salaires, revenir au mode total
      if (salaires.length === 0) {
        applyGenericValidation(get, set, "typeRemuneration", "total");
      }
    },
    onNextStep: () => {
      const input = get().remunerationData.input;
      const { isValid, errorState } = validateStep(input);

      set(
        produce((state: RemunerationStoreSlice) => {
          state.remunerationData.hasBeenSubmit = true;
          state.remunerationData.isStepValid = isValid;
          state.remunerationData.error = errorState;
        })
      );
      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<RemunerationStoreSlice>["getState"],
  set: StoreApi<RemunerationStoreSlice>["setState"],
  paramName: any,
  value: any
) => {
  if (get().remunerationData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.remunerationData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.remunerationData.input
    );
    set(
      produce((state: RemunerationStoreSlice) => {
        state.remunerationData.error = errorState;
        state.remunerationData.isStepValid = isValid;
        state.remunerationData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: RemunerationStoreSlice) => {
        state.remunerationData.input[paramName] = value;
      })
    );
  }
};

export default createRemunerationStore;
