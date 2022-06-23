import produce from "immer";
import { GetState, SetState } from "zustand";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../store";
import { setReferenceSalaryAgreement1516 } from "./setReferenceSalary";
import {
  Agreement1516StoreData,
  Agreement1516StoreInput,
  Agreement1516StoreSlice,
} from "./types";
import { validateStep } from "./validator";

const initialState: Agreement1516StoreData = {
  input: {
    primes: [],
    salaryPeriods: [],
  },
  error: {},
  hasBeenSubmit: true,
  isStepValid: true,
};

export const createAgreement1516StoreSalaires: StoreSlice<
  Agreement1516StoreSlice,
  SalairesStoreSlice
> = (set, get) => ({
  agreement1516Data: { ...initialState },
  agreement1516Function: {
    onSalariesChange: (value) => {
      applyGenericValidation(get, set, "salaryPeriods", value);
    },
    onChangeHasReceivedPrimes: (value) => {
      applyGenericValidation(get, set, "hasReceivedPrimes", value);
    },
    onChangeHasReceivedSalaries: (value) => {
      applyGenericValidation(get, set, "hasReceivedSalaries", value);
    },
    onChangePrimes: (primes) => {
      applyGenericValidation(get, set, "primes", primes);
    },
    onValidate: () => {
      const { isValid, errorState } = validateStep(
        get().agreement1516Data.input
      );
      set(
        produce((state: Agreement1516StoreSlice) => {
          state.agreement1516Data.hasBeenSubmit = isValid ? false : true;
          state.agreement1516Data.isStepValid = isValid;
          state.agreement1516Data.error = errorState;
        })
      );

      setReferenceSalaryAgreement1516(get, set);

      return isValid;
    },
  },
});

const applyGenericValidation = (
  get: GetState<Agreement1516StoreSlice>,
  set: SetState<Agreement1516StoreSlice>,
  paramName: keyof Agreement1516StoreInput,
  value: any
) => {
  if (get().agreement1516Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement1516Data.input[paramName as string] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement1516Data.input
    );
    set(
      produce((state: Agreement1516StoreSlice) => {
        state.agreement1516Data.error = errorState;
        state.agreement1516Data.isStepValid = isValid;
        state.agreement1516Data.input[paramName as string] = value;
      })
    );
  } else {
    set(
      produce((state: Agreement1516StoreSlice) => {
        state.agreement1516Data.input[paramName as string] = value;
      })
    );
  }
};
