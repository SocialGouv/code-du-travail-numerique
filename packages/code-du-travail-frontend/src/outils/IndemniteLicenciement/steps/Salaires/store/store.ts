import { GetState, SetState } from "zustand";
import produce from "immer";
import {
  SalairesStoreData,
  SalairesStoreInput,
  SalairesStoreSlice,
} from "./types";
import { StoreSlice } from "../../../store";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { computeSalaryPeriods } from "../../../common/usecase";
import { SalaryPeriods } from "../components/SalaireTempsPlein";
import { validateStep } from "./validator";

const initialState: SalairesStoreData = {
  input: {
    salaryPeriods: [],
    primes: [],
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
    onChangeHasTempsPartiel: (value) => {
      applyGenericValidation(get, set, "hasTempsPartiel", value);
    },
    onChangeHasSameSalaire: (value) => {
      applyGenericValidation(get, set, "hasSameSalaire", value);
      let periods: string[] = [];
      const ancienneteInput = get().ancienneteData.input;
      if (
        value === "non" &&
        ancienneteInput.absencePeriods &&
        ancienneteInput.dateEntree &&
        ancienneteInput.dateNotification
      ) {
        periods = computeSalaryPeriods({
          dateEntree: ancienneteInput.dateEntree ?? "",
          dateNotification: ancienneteInput.dateNotification ?? "",
          absencePeriods: ancienneteInput.absencePeriods,
        });
        const salaryPeriods: SalaryPeriods[] = periods.map((v) => ({
          month: v,
          value: undefined,
        }));
        set(
          produce((state: SalairesStoreSlice) => {
            state.salairesData.input.salaireBrut = undefined;
            state.salairesData.input.salaryPeriods = salaryPeriods;
          })
        );
      } else {
        set(
          produce((state: SalairesStoreSlice) => {
            state.salairesData.input.hasPrimes = undefined;
            state.salairesData.input.salaryPeriods = [];
          })
        );
      }
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
      set(
        produce((state: SalairesStoreSlice) => {
          state.salairesData.hasBeenSubmit = true;
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
