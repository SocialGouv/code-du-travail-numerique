import { GetState, SetState } from "zustand";
import produce from "immer";
import {
  SalairesStoreData,
  SalairesStoreInput,
  SalairesStoreSlice,
} from "./types";
import { StoreSlice } from "../../../store";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { validateStep } from "./validator";
import { deepMergeArray } from "../../../../../lib";
import { computeSalaryPeriods, SalaryPeriods } from "../../../common";

const initialState: SalairesStoreData = {
  input: {
    salaryPeriods: [],
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createSalairesStore: StoreSlice<
  SalairesStoreSlice,
  AncienneteStoreSlice
> = (set, get) => ({
  salairesData: { ...initialState },
  salairesFunction: {
    initFieldSalaries: () => {
      const ancienneteInput = get().ancienneteData.input;
      const periods = computeSalaryPeriods({
        dateEntree: ancienneteInput.dateEntree ?? "",
        dateNotification: ancienneteInput.dateNotification ?? "",
        absencePeriods: ancienneteInput.absencePeriods,
      });
      const p: SalaryPeriods[] = periods.map((v) => ({
        month: v,
        value: undefined,
      }));
      const salaryPeriods = deepMergeArray(
        p,
        get().salairesData.input.salaryPeriods,
        "month"
      );
      set(
        produce((state: SalairesStoreSlice) => {
          state.salairesData.input.salaryPeriods = salaryPeriods;
        })
      );
    },
    onChangeHasTempsPartiel: (value) => {
      applyGenericValidation(get, set, "hasTempsPartiel", value);
    },
    onSalariesChange: (value) => {
      applyGenericValidation(get, set, "salaryPeriods", value);
    },
    onValidateStepSalaires: () => {
      const { isValid, errorState } = validateStep(get().salairesData.input);
      set(
        produce((state: SalairesStoreSlice) => {
          state.salairesData.hasBeenSubmit = isValid ? false : true;
          state.salairesData.isStepValid = isValid;
          state.salairesData.error = errorState;
        })
      );
      return isValid;
    },
  },
});

const applyGenericValidation = (
  get: GetState<SalairesStoreSlice>,
  set: SetState<SalairesStoreSlice>,
  paramName: keyof SalairesStoreInput,
  value: any
) => {
  if (get().salairesData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.salairesData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(nextState.salairesData.input);
    set(
      produce((state: SalairesStoreSlice) => {
        state.salairesData.error = errorState;
        state.salairesData.isStepValid = isValid;
        state.salairesData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: SalairesStoreSlice) => {
        state.salairesData.input[paramName] = value;
      })
    );
  }
};

export default createSalairesStore;
