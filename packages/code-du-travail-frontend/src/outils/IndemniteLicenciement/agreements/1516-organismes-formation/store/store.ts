import {
  getMotifs,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import produce from "immer";
import { GetState, SetState } from "zustand";
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
    initSalaryPeriods: () => {
      const ancienneteInput = get().ancienneteData.input;
      const periods = computeSalaryPeriods({
        motifs: getMotifs(SupportedCcIndemniteLicenciement.IDCC1516),
        dateEntree: ancienneteInput.dateNotification ?? "",
        dateNotification: ancienneteInput.dateSortie ?? "",
        absencePeriods: [],
      });
      const p: SalaryPeriods[] = periods.map((v) => ({
        month: v,
        value: undefined,
      }));
      const salaryPeriods = deepMergeArray(
        p,
        get().agreement1516Data.input.salaryPeriods,
        "month"
      );
      set(
        produce((state: Agreement1516StoreSlice) => {
          state.agreement1516Data.input.salaryPeriods = salaryPeriods;
        })
      );
    },
    onChangeHasReceivedSalaries: (value) => {
      if (value === "non") {
        applyGenericValidation(get, set, "salaryPeriods", []);
      } else {
        get().agreement1516Function.initSalaryPeriods();
      }
      applyGenericValidation(get, set, "hasReceivedSalaries", value);
    },
    onSalariesChange: (value) => {
      applyGenericValidation(get, set, "salaryPeriods", value);
    },
  },
});

const applyGenericValidation = (
  get: GetState<Agreement1516StoreSlice & SalairesStoreSlice>,
  set: SetState<Agreement1516StoreSlice & SalairesStoreSlice>,
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
    get().salairesFunction.onValidateStepSalaires();
  } else {
    set(
      produce((state: Agreement1516StoreSlice) => {
        state.agreement1516Data.input[paramName] = value;
      })
    );
  }
};
