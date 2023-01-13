import { SalaryPeriods } from "@socialgouv/modeles-social";
import produce from "immer";
import { StoreApi } from "zustand";
import { deepMergeArray } from "../../../../../lib";
import { computeSalaryPeriods } from "../../../common";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement1516StoreData,
  Agreement1516StoreInput,
  Agreement1516StoreSlice,
} from "./types";
import { validateStep } from "./validator";

const initialState: Agreement1516StoreData = {
  input: {
    salaryPeriods: [],
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement1516StoreSalaires: StoreSlice<
  Agreement1516StoreSlice,
  SalairesStoreSlice & AncienneteStoreSlice
> = (set, get) => ({
  agreement1516Data: { ...initialState },
  agreement1516Function: {
    initSalaryPeriods: (withDefaultSalaryPeriod: boolean) => {
      const ancienneteInput = get().ancienneteData.input;
      const defaultSalaryPeriod = get().salairesData.input.salaryPeriods;
      const agreementSalaryPeriod =
        get().agreement1516Data.input.salaryPeriods ?? [];
      const periods = computeSalaryPeriods({
        dateEntree: ancienneteInput.dateNotification ?? "",
        dateNotification: ancienneteInput.dateSortie ?? "",
      });
      const period: SalaryPeriods[] = periods.map((v) =>
        Object.assign(
          { month: v },
          withDefaultSalaryPeriod &&
            defaultSalaryPeriod[0].value && {
              value: defaultSalaryPeriod[0].value,
            },
          withDefaultSalaryPeriod && {
            prime: 0,
          }
        )
      );
      const salaryPeriods = withDefaultSalaryPeriod
        ? deepMergeArray(period, agreementSalaryPeriod, "month", true)
        : period;
      set(
        produce((state: Agreement1516StoreSlice) => {
          state.agreement1516Data.input.salaryPeriods = salaryPeriods;
        })
      );
    },
    onChangeHasReceivedSalaries: (value) => {
      get().agreement1516Function.initSalaryPeriods(
        value === "non" ? true : false
      );
      applyGenericValidation(get, set, "hasReceivedSalaries", value);
    },
    onSalariesChange: (value) => {
      applyGenericValidation(get, set, "salaryPeriods", value);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<Agreement1516StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement1516StoreSlice & SalairesStoreSlice>["setState"],
  paramName: keyof Agreement1516StoreInput,
  value: any
) => {
  if (get().agreement1516Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement1516Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement1516Data.input
    );
    set(
      produce((state: Agreement1516StoreSlice) => {
        state.agreement1516Data.error = errorState;
        state.agreement1516Data.isStepValid = isValid;
        state.agreement1516Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onValidateStep();
  } else {
    set(
      produce((state: Agreement1516StoreSlice) => {
        state.agreement1516Data.input[paramName] = value;
      })
    );
  }
};
