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
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { setLegalReferenceSalary, setSalaryPeriods } from "../../../common/";

const initialState: SalairesStoreData = {
  input: {
    salaryPeriods: [],
    primes: [],
    refSalary: 0,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createSalairesStore: StoreSlice<
  SalairesStoreSlice,
  AncienneteStoreSlice & ContratTravailStoreSlice
> = (set, get) => ({
  salairesData: { ...initialState },
  salairesFunction: {
    onChangeHasTempsPartiel: (value) => {
      applyGenericValidation(get, set, "hasTempsPartiel", value);
    },
    onChangeHasSameSalaire: (value) => {
      applyGenericValidation(get, set, "hasSameSalaire", value);
      setSalaryPeriods(get, set);
    },
    onChangeSalaireBrut: (value) => {
      applyGenericValidation(get, set, "salaireBrut", value);
    },
    onSalariesChange: (value) => {
      applyGenericValidation(get, set, "salaryPeriods", value);
    },
    onChangeHasPrimes: (value) => {
      applyGenericValidation(get, set, "hasPrimes", value);
      if (value === "non") {
        set(
          produce((state: SalairesStoreSlice) => {
            state.salairesData.input.primes = [];
          })
        );
      }
    },
    onChangePrimes: (primes) => {
      applyGenericValidation(get, set, "primes", primes);
    },
    onValidateStepSalaires: () => {
      const { isValid, errorState } = validateStep(get().salairesData.input);

      if (isValid) {
        setLegalReferenceSalary(get, set);
      }

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
      draft.salairesData.input[paramName as string] = value;
    });
    const { isValid, errorState } = validateStep(nextState.salairesData.input);
    set(
      produce((state: SalairesStoreSlice) => {
        state.salairesData.error = errorState;
        state.salairesData.isStepValid = isValid;
        state.salairesData.input[paramName as string] = value;
      })
    );
  } else {
    set(
      produce((state: SalairesStoreSlice) => {
        state.salairesData.input[paramName as string] = value;
      })
    );
  }
};

export default createSalairesStore;
