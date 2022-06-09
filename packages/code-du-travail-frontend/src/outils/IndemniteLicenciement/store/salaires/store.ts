import { GetState, SetState } from "zustand";
import produce from "immer";
import {
  SalairesStoreData,
  SalairesStoreError,
  SalairesStoreInput,
  SalairesStoreSlice,
} from "./types";
import { StoreSlice } from "..";
import { deepEqualObject } from "../../../../lib";
import { AncienneteStoreSlice } from "../anciennete";
import { computeSalaryPeriods } from "../common/usecase";
import { SalaryPeriods } from "../../components/SalaireTempsPlein";

const initialState: SalairesStoreData = {
  input: {
    salaryPeriods: [],
    primes: [undefined],
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
            state.salairesData.input.primes = [undefined];
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

const validateStep = (state: SalairesStoreInput) => {
  const errorState: SalairesStoreError = {
    errorHasTempsPartiel: !state.hasTempsPartiel
      ? "Vous devez répondre à cette question"
      : undefined,
    errorHasSameSalaire:
      state.hasTempsPartiel === "non" && !state.hasSameSalaire
        ? "Vous devez répondre à cette question"
        : undefined,
    errorTempsPartiel: state.hasTempsPartiel === "oui",
    errorSalaireBrut:
      state.hasTempsPartiel === "non" &&
      state.hasSameSalaire === "oui" &&
      !state.salaireBrut
        ? "Vous devez répondre à cette question"
        : undefined,
    errorSalaryPeriods:
      state.hasTempsPartiel === "non" &&
      state.hasSameSalaire === "non" &&
      state.salaryPeriods.map((v) => v.value && v).length !==
        state.salaryPeriods.length
        ? true
        : false,
    errorHasPrimes:
      state.hasTempsPartiel === "non" &&
      state.hasSameSalaire === "non" &&
      !state.hasPrimes
        ? "Vous devez répondre à cette question"
        : undefined,
    errorPrimes:
      state.hasTempsPartiel === "non" &&
      state.hasSameSalaire === "non" &&
      state.hasPrimes === "oui" &&
      state.primes.length <= 1
        ? true
        : false,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorHasSameSalaire: undefined,
      errorHasPrimes: undefined,
      errorHasTempsPartiel: undefined,
      errorSalaireBrut: undefined,
      errorTempsPartiel: false,
      errorSalaryPeriods: false,
      errorPrimes: false,
    }),
    errorState,
  };
};

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
