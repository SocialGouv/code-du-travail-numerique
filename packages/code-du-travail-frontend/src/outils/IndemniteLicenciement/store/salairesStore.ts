import { deepEqualObject } from "../../../lib";
import { StoreSlice } from ".";
import { Prime } from "../components/Primes";
import { SalaryPeriods } from "../components/SalaireTempsPlein";
import { GetState, SetState } from "zustand";
import { getSalaryPeriods } from "../utils";
import { AncienneteStoreSlice } from "./ancienneteStore";

type SalairesStoreInput = {
  hasTempsPartiel?: "oui" | "non";
  hasSameSalaire?: "oui" | "non";
  salaireBrut?: string;
  salaryPeriods: SalaryPeriods[];
  hasPrimes?: "oui" | "non";
  primes: Prime[];
};

type SalairesStoreError = {
  errorHasTempsPartiel?: string;
  errorHasSameSalaire?: string;
  errorSalaireBrut?: string;
  errorHasPrimes?: string;
  errorTempsPartiel?: boolean;
  errorSalaryPeriods?: boolean;
  errorPrimes?: boolean;
};

type SalairesStoreData = {
  inputSalaires: SalairesStoreInput;
  errorSalaires: SalairesStoreError;
  hasBeenSubmitSalaires: boolean;
  isStepSalairesValid: boolean;
};

type SalairesStoreFn = {
  onChangeHasTempsPartiel: (
    value: typeof initialState.inputSalaires.hasTempsPartiel
  ) => void;
  onChangeHasSameSalaire: (
    value: typeof initialState.inputSalaires.hasSameSalaire
  ) => void;
  onChangeSalaireBrut: (
    value: typeof initialState.inputSalaires.salaireBrut
  ) => void;
  onSalariesChange: (value: SalaryPeriods[]) => void;
  onChangeHasPrimes: (
    value: typeof initialState.inputSalaires.hasPrimes
  ) => void;
  onChangePrimes: (primes: Prime[]) => void;
  onValidateStepSalaires: () => boolean;
};

export type SalairesStoreSlice = SalairesStoreData & SalairesStoreFn;

const initialState: SalairesStoreData = {
  inputSalaires: {
    salaryPeriods: [],
    primes: [undefined],
  },
  errorSalaires: {},
  hasBeenSubmitSalaires: false,
  isStepSalairesValid: true,
};

export const createSalairesStore: StoreSlice<
  SalairesStoreSlice,
  AncienneteStoreSlice
> = (set, get) => ({
  ...initialState,
  onChangeHasTempsPartiel: (value) => {
    applyGenericValidation(get, set, "hasTempsPartiel", value);
  },
  onChangeHasSameSalaire: (value) => {
    applyGenericValidation(get, set, "hasSameSalaire", value);
    let periods: string[] = [];
    if (
      value === "non" &&
      get().absencePeriods &&
      get().dateEntree &&
      get().dateNotification
    ) {
      periods = getSalaryPeriods({
        dateEntree: get().dateEntree ?? "",
        dateNotification: get().dateNotification ?? "",
        absencePeriods: get().absencePeriods,
      });
      const salaryPeriods: SalaryPeriods[] = periods.map((v) => ({
        month: v,
        value: undefined,
      }));
      set((state) => ({
        ...state,
        inputSalaires: {
          ...get().inputSalaires,
          salaryPeriods,
          salaireBrut: undefined,
        },
      }));
    } else {
      set((state) => ({
        ...state,
        inputSalaires: {
          ...get().inputSalaires,
          salaryPeriods: [],
          hasPrimes: undefined,
        },
      }));
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
      set((state) => ({
        ...state,
        inputSalaires: {
          ...get().inputSalaires,
          primes: [undefined],
        },
      }));
    }
  },
  onChangePrimes: (primes) => {
    applyGenericValidation(get, set, "primes", primes);
  },
  onValidateStepSalaires: () => {
    const { isValid, newState } = validateStep(get());
    set((state) => ({
      ...state,
      ...newState,
      hasBeenSubmitSalaires: true,
      isStepSalairesValid: isValid,
    }));
    return isValid;
  },
});

const validateStep = (state: SalairesStoreData) => {
  const newState: Partial<SalairesStoreData> = {
    errorSalaires: {
      errorHasTempsPartiel: !state.inputSalaires.hasTempsPartiel
        ? "Vous devez répondre à cette question"
        : undefined,
      errorTempsPartiel: state.inputSalaires.hasTempsPartiel === "oui",
      errorSalaireBrut:
        state.inputSalaires.hasTempsPartiel === "non" &&
        state.inputSalaires.hasSameSalaire === "oui" &&
        !state.inputSalaires.salaireBrut
          ? "Vous devez répondre à cette question"
          : undefined,
      errorSalaryPeriods:
        state.inputSalaires.hasTempsPartiel === "non" &&
        state.inputSalaires.hasSameSalaire === "non" &&
        state.inputSalaires.salaryPeriods.map((v) => v.value && v).length !==
          state.inputSalaires.salaryPeriods.length
          ? true
          : false,
      errorHasPrimes:
        state.inputSalaires.hasTempsPartiel === "non" &&
        state.inputSalaires.hasSameSalaire === "non" &&
        !state.inputSalaires.hasPrimes
          ? "Vous devez répondre à cette question"
          : undefined,
      errorPrimes:
        state.inputSalaires.hasTempsPartiel === "non" &&
        state.inputSalaires.hasSameSalaire === "non" &&
        state.inputSalaires.hasPrimes === "oui" &&
        state.inputSalaires.primes.length <= 1
          ? true
          : false,
    },
  };

  return {
    isValid: deepEqualObject(newState, {
      errorSalaires: {
        errorHasPrimes: undefined,
        errorHasTempsPartiel: undefined,
        errorSalaireBrut: undefined,
        errorTempsPartiel: false,
        errorSalaryPeriods: false,
        errorPrimes: false,
      },
    }),
    newState,
  };
};

const applyGenericValidation = <T>(
  get: GetState<SalairesStoreSlice>,
  set: SetState<SalairesStoreSlice>,
  paramName: keyof SalairesStoreInput,
  value: T
) => {
  if (get().hasBeenSubmitSalaires) {
    const { isValid, newState } = validateStep({
      ...get(),
      inputSalaires: {
        ...get().inputSalaires,
        [paramName]: value,
      },
    });
    set((state) => ({
      ...state,
      ...newState,
      isStepSalairesValid: isValid,
      inputSalaires: {
        ...get().inputSalaires,
        [paramName]: value,
      },
    }));
  } else {
    set(() => ({
      inputSalaires: {
        ...get().inputSalaires,
        [paramName]: value,
      },
    }));
  }
};
