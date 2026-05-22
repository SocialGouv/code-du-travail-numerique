import { StoreApi } from "zustand";
import { produce } from "immer";

import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import {
  RemunerationStoreData,
  RemunerationStoreSlice,
  SalaryEntry,
} from "./types";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { validateStep } from "./validator";

const DEFAULT_DUREE_CONTRAT = 2;

const buildEmptySalaires = (duree: number): SalaryEntry[] =>
  Array.from({ length: duree }, () => ({ salaire: null }));

const initialState: RemunerationStoreData = {
  input: {
    typeRemuneration: undefined,
    salaire: undefined,
    salaires: [],
    dureeContrat: undefined,
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

      if (type === "mensuel") {
        applyGenericValidation(
          get,
          set,
          "dureeContrat",
          DEFAULT_DUREE_CONTRAT
        );
        applyGenericValidation(
          get,
          set,
          "salaires",
          buildEmptySalaires(DEFAULT_DUREE_CONTRAT)
        );
        applyGenericValidation(get, set, "salaire", undefined);
      } else {
        applyGenericValidation(get, set, "salaires", []);
        applyGenericValidation(get, set, "dureeContrat", undefined);
      }
    },
    onSalaireChange: (salaire: number) => {
      applyGenericValidation(get, set, "salaire", salaire);
    },
    onSalairesChange: (salaires: SalaryEntry[]) => {
      applyGenericValidation(get, set, "salaires", salaires);
    },
    onDureeContratChange: (duree: number) => {
      applyGenericValidation(get, set, "dureeContrat", duree);

      const currentSalaires = get().remunerationData.input.salaires;
      const nextSalaires: SalaryEntry[] = Array.from(
        { length: duree },
        (_, index) => currentSalaires[index] ?? { salaire: null }
      );
      applyGenericValidation(get, set, "salaires", nextSalaires);
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
