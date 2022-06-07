import { deepEqualObject } from "../../../lib";
import { StoreSlice } from ".";
import { Prime } from "../components/Primes";
import { SalaryPeriods } from "../components/SalaireTempsPlein";
import { GetState, SetState } from "zustand";
import { getSalaryPeriods } from "../utils";
import { ContratTravailStoreSlice } from "./contratTravailStore";
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
    primes: [],
  },
  errorSalaires: {},
  hasBeenSubmitSalaires: false,
  isStepSalairesValid: true,
};

export const createSalairesStore: StoreSlice<
  SalairesStoreSlice,
  AncienneteStoreSlice
> = (set, get, publicodesRules) => ({
  ...initialState,
  onChangeHasTempsPartiel: (value) => {
    applyGenericValidation(get, set, "hasTempsPartiel", value);
  },
  onChangeSalaireBrut: (value) => {
    applyGenericValidation(get, set, "salaireBrut", value);
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
    }
    const salaryPeriods: SalaryPeriods[] = periods.map((v) => ({
      month: v,
      value: undefined,
    }));
    set((state) => ({
      ...state,
      inputSalaires: {
        ...get().inputSalaires,
        salaryPeriods,
      },
    }));
  },
  onSalariesChange: (value) => {
    applyGenericValidation(get, set, "salaryPeriods", value);
  },
  onChangeHasPrimes: (value) => {
    applyGenericValidation(get, set, "hasPrimes", value);
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

  //   onSalariesChange: (value, currentSalaryIndex, form) =>
  //     set((state) => {
  //       console.log(">>>>>>", state.formValues.salaires);
  //       const salaries = state.formValues.salaires;
  //       if (!salaries?.length) return state;
  //       form.batch(() =>
  //         state.steps.salaries.salaryPeriods?.forEach((label, index) => {
  //           const salary = salaries[index];

  //           if (index > currentSalaryIndex && salary === null) {
  //             form.change(`salaries[${index}]`, value);
  //           }
  //         })
  //       );
  //       return state;
  //     }),
  //   onStepChange: (oldStep, newStep) =>
  //     set((state) => {
  //       // if (newStep.name === StepName.Info) {
  //       //   // Stepname.result
  //       //   const publicodes = state.publicodes;
  //       //   const {
  //       //     hasSameSalaire = false,
  //       //     salaires = [],
  //       //     primes = [],
  //       //     salaire,
  //       //     inaptitude = false,
  //       //     ccn,
  //       //     dateSortie,
  //       //     dateEntree,
  //       //     absencePeriods,
  //       //   } = state.formValues;

  //       //   if (!dateEntree || !dateSortie) {
  //       //     throw new Error(`Missing fields ${dateEntree} ${dateSortie}`);
  //       //   }

  //       //   const seniority = computeSeniority({
  //       //     dateSortie,
  //       //     dateEntree,
  //       //     absencePeriods,
  //       //   });
  //       //   const salaireRef = getSalaireRef({
  //       //     hasSameSalaire,
  //       //     primes,
  //       //     salaire,
  //       //     salaires,
  //       //   });

  //       //   const { result } = publicodes.setSituation(
  //       //     mapToPublicodesSituationForIndemniteLicenciement(
  //       //       ccn,
  //       //       seniority,
  //       //       salaireRef,
  //       //       inaptitude
  //       //     )
  //       //   );
  //       //   return { ...state, steps: { ...state.steps, result: { result } } };
  //       // }
  //       return state;
  //     }),
});

const validateStep = (state: SalairesStoreData) => {
  const newState: Partial<SalairesStoreData> = {
    errorSalaires: {
      errorHasPrimes: !state.inputSalaires.hasPrimes
        ? "Vous devez répondre à cette question"
        : undefined,
      errorHasSameSalaire: !state.inputSalaires.hasSameSalaire
        ? "Vous devez répondre à cette question"
        : undefined,
      errorHasTempsPartiel: !state.inputSalaires.hasTempsPartiel
        ? "Vous devez répondre à cette question"
        : undefined,
      errorSalaireBrut: !state.inputSalaires.salaireBrut
        ? "Vous devez répondre à cette question"
        : undefined,
    },
  };
  return {
    isValid: deepEqualObject(newState, {
      errorSalaires: {
        errorHasPrimes: undefined,
        errorHasTempsPartiel: undefined,
        errorSalaireBrut: undefined,
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
